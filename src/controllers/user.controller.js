import { UserModel } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { registerUserSchema } from "../schemas/registerUserSchema.js";
import { loginUserSchema } from "../schemas/loginUserSchema.js";

// method to generate tokens
const generateAccessAndRefreshAccessToken = async (userId) => {
  const user = await UserModel.findById(userId);
  const accessToken = await user.generateAccessToken();
  const refreshAccessToken = await user.generateRefreshAccessToken();

  // save refreshAccessToken to DB
  user.refreshAccessToken = refreshAccessToken;
  await user.save({ validateBeforeSave: false });

  return {
    accessToken,
    refreshAccessToken,
  };
};

// cookie options utils
const cookieOptions = {
  secure: true,
  httpOnly: true,
};

const registerUser = asyncHandler(async (req, res) => {
  // get data from request body
  const { fullName, email, password } = req.body;

  // validation with zod
  const { error } = registerUserSchema.safeParse({ fullName, email, password });
  if (error) {
    throw new ApiError(400, error.issues[0].message);
  }

  // check if the use already exists
  const user = await UserModel.findOne({ email });
  if (user) {
    throw new ApiError(400, "User is already exists with this email.");
  }

  // create user
  const newUser = await UserModel.create({
    fullName,
    email,
    password,
  });

  await newUser.save({ validateBeforeSave: false });

  const createdUser = await UserModel.findById(newUser._id).select(
    "-password -refreshAccessToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Failed to register the user.");
  }

  return res.status(201).json(
    new ApiResponse(201, "user created successfully.", {
      user: createdUser,
    })
  );
});

const loginUser = asyncHandler(async (req, res) => {
  // get data from the body
  const { email, password } = req.body;

  // validation with zod
  const { error } = loginUserSchema.safeParse({ email, password });
  if (error) {
    throw new ApiError(400, error.issues[0].message);
  }

  // check if the user doesn't exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User doesn't exists with this email.");
  }

  // check password
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Password");
  }

  // generate tokens
  const { accessToken, refreshAccessToken } =
    await generateAccessAndRefreshAccessToken(user._id);
  if (!accessToken || !refreshAccessToken) {
    throw new ApiError(500, "Failed to generate tokens");
  }

  // return res and set cookies
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshAccessToken", refreshAccessToken, cookieOptions)
    .json(
      new ApiResponse(200, "Logged in Successfully.", {
        accessToken: accessToken,
        refreshAccessToken: refreshAccessToken,
      })
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // get user from req and remove cookie from db and browser

  const user = await UserModel.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshAccessToken: 1,
      },
    },
    {
      new: true,
    }
  );

  if (!user) {
    throw new ApiError(500, "Failed to logout");
  }

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshAccessToken", cookieOptions)
    .json(new ApiResponse(200, "Logout successfully"));
});

// export controllers
export { registerUser, loginUser, logoutUser };
