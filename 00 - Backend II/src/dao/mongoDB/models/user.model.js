import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // Ensures email is always stored in lowercase
    },
    age: {
      type: Number,
      min: 0, // Ensures a non-negative age
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
      required: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"], // Define roles to ensure only valid roles are assigned
    },
    isGithub: {
      type: Boolean,
      default: false,
    },
    isGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
