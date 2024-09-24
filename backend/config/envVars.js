import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET, // this will be used to encode and decode your JWT token
  NODE_ENV: process.env.NODE_ENV,
};
