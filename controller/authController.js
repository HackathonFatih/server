import AsyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import { generateToken } from "../utils/generateToken.js";
import { hashPassword, isPasswordMatched } from "../utils/helpers.js";
import User from "../model/User.js";
import { sendResetPasswordEmail } from "../services/emailService.js";
import verifyToken from "../utils/verifyToken.js";

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
