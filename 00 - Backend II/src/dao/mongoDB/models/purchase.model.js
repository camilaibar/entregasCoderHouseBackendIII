import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "completed", "cancelled"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const purchaseModel = mongoose.model("purchases", purchaseSchema);

export default purchaseModel;
