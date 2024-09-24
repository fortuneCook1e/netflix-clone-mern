import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    // make sure user provide all required fields
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // check for correct email expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    // check if username already exists
    const userExists = await User.findOne({ username: username });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }
    //check if email already exists
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    // password length >= 6 characters
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }
    // pick a random avatar for the user
    const DEFAULT_AVATAR = ["/avater1.png", "/avatar2.png", "/avatar3.png"];
    const randomAvatar =
      DEFAULT_AVATAR[Math.floor(Math.random() * DEFAULT_AVATAR.length)];

    // hash password using bcryptjs
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    //create new user
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      image: randomAvatar,
    });

    // generate token and set cookie
    generateTokenAndSetCookie(newUser._id, res);
    // save user to database
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User saved successfully",
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in auth.controller signup: " + error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function login(req, res) {
  res.send("login route");
}

export async function logout(req, res) {
  // the logout function simple clear the token

  try {
    // clear the token from the client side
    res.clearCookie("jwt-netflix");
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" }); // return success message to the client
  } catch (error) {
    console.log("Error in auth.controller logout: " + error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
