// schema for user data that will be stored in the database
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  searchHistory: {
    type: Array,
    default: [],
  },
});

export const User = mongoose.model("User", kittySchema);
// the mongoDB will automatically convert the 'User' -> 'users'
