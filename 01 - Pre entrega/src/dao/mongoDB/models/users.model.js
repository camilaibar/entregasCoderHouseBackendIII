import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
});

const userModel = mongoose.model(usersCollection, userSchema);

export default userModel;
