import mongoose from "mongoose";

const petsCollection = "pets";

const petSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["Dog", "Cat"] },
  age: Number,
});

const petsModel = mongoose.model(petsCollection, petSchema);

export default petsModel;
