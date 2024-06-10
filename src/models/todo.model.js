import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      maxlength: [30, "Max title length is 30 !"],
    },

    content: {
      type: String,
      required: [true, "todo content is required"],
      minlength: [10, "why content is too short ?"],
      maxlength: [300, "300 characters are enough bro."],
    },
    complete: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const TodoModel = mongoose.model("Todo", todoSchema);
