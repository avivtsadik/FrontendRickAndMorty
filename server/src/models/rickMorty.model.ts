import { Schema, model } from "mongoose";
import { StatusValues } from "../utils/constants";
import { IRickMorty } from "../utils/rickMorty.interface";

const rickMortySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  episodes: {
    type: [String],
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: StatusValues,
    default: StatusValues.ALIVE,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
});

const rickMortyModel = model<IRickMorty & Document>(
  "rickMorty",
  rickMortySchema
);

export default rickMortyModel;
