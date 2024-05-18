import AsyncHandler from "express-async-handler";
import { hashPassword, isPasswordMatched } from "../utils/helpers.js";
import User from "../model/User.js";

// @route POST /users/get-all-users

export const getAllUsers = AsyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    length: users.length,
    success: true,
    message: "All users",
    data: users,
  });
});

// @route POST /users/:id/get-user-by-id

export const getUserById = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({
    success: true,
    message: "User found",
    data: user,
  });
});

// @route PUT /users/:id/update-user-profile

export const updateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.city = req.body.email || user.email;

  if (req.body.password) {
    user.password = await hashPassword(req.body.password);
  }
  const updatedUser = await user.save();
  res.status(200).json({
    success: true,
    message: "User updated",
    data: updatedUser,
  });
});

// @route DELETE /users/:id/delete-user

export const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User deleted",
  });
});
