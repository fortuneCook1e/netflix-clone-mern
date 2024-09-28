import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  // generate a signed JWT token
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  // set the JWT as a cookie in the response
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // equivalent to 15 days in milliseconds
    httpOnly: true, // prevent XSS attacks, make it not accessible by javascript file
    sameSite: "strict", //CSRF attacks
    secure: ENV_VARS.NODE_ENV !== "development", // only return True when it is in production
  });

  return token;
};
