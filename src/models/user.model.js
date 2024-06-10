import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Fullname is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "why password less than 6 characters ?"],
    },

    refreshAccessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// pre hook to hash password before save;
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

// method to check password 
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcryptjs.compare(password, this.password)
}

// methods to generate access and refreshAccess token

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
userSchema.methods.generateRefreshAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15d",
    }
  );
};

export const UserModel = mongoose.model("User", userSchema);
