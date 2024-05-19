import AsyncHandler from "express-async-handler";
import { hashPassword, isPasswordMatched } from "../utils/helpers.js";
import User from "../model/User.js";
import Accommodation from "../model/Accommodation.js";
import InstructorOrPsychologist from "../model/InstructorOrPsychologist.js";

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

// @route POST /users/create-accommodation-announcement
export const createAccommodationAnnouncement = AsyncHandler(
  async (req, res) => {
    const user = await User.findById(req.userAuth._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const { definition, personNumber, duration, city, township } = req.body;
    const accommodation = new Accommodation({
      by: user._id,
      definition,
      personNumber,
      duration,
      city,
      township,
    });

    await accommodation.save();
    res.status(201).json({
      success: true,
      message: "Accommodation announcement created",
      data: accommodation,
    });
  }
);

// @route POST /users/create-instructor-or-psychologist-announcement
export const createInstructorOrPsychologistAnnouncement = AsyncHandler(
  async (req, res) => {
    console.log(req.user);
    const user = await User.findById(req.userAuth._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const { definition, type, phoneNumber } = req.body;
    const announcement = new InstructorOrPsychologist({
      by: user._id,
      definition,
      type,
      phoneNumber,
    });

    await announcement.save();
    res.status(201).json({
      success: true,
      message: `${type} announcement created`,
      data: announcement,
    });
  }
);
