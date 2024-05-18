import AsyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import { generateToken } from "../utils/generateToken.js";
import { hashPassword, isPasswordMatched } from "../utils/helpers.js";
import User from "../model/User.js";

//@route POST /auth/register
export const register = AsyncHandler(async (req, res) => {
  const { name, email, password, city, isEarthquakeSurvivor } = req.body;

  const existingUserEmail = await User.findOne({ email });

  if (existingUserEmail) {
    res.status(400);
    throw new Error("User with this mail already exists");
  }

  //register
  const newUser = await User.create({
    name,
    email,
    password: await hashPassword(password),
    city,
    isEarthquakeSurvivor,
  });
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
});

export const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "User not found!" });
  }

  //verify password
  const isMatch = await isPasswordMatched(password, user.password);

  if (!isMatch) {
    return res.json({ success: false, message: "Passwords don't match!" });
  } else {
    const accessToken = generateToken(
      user._id,
      process.env.JWT_ACCESS_EXPIRATION_HOURS
    ); // Access token expires in 1 hour
    const refreshToken = generateToken(
      user._id,
      process.env.JWT_REFRESH_EXPIRATION_DAYS
    ); // Refresh token expires in 7 days
    return res.json({
      success: true,
      message: "Passwords match!",
      accessToken,
      refreshToken,
      user,
    });
  }
});
