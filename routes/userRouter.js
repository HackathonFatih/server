import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserProfile,
  createAccommodationAnnouncement,
  createInstructorOrPsychologistAnnouncement,
  getAllAccommodationAnnouncement,
  getAllInstructorOrPsychologistAnnouncement,
} from "../controller/userController.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import User from "../model/User.js";
import roleRestriction from "../middlewares/roleRestriction.js";
const userRouter = express.Router();

userRouter.get("/get-all-users", getAllUsers);
userRouter.get("/:id/get-user-by-id", getUserById);
userRouter.put(
  "/:id/update-user-profile",
  isAuthenticated(User),
  roleRestriction("user"),
  updateUserProfile
);
userRouter.delete(
  "/:id/delete-user",
  isAuthenticated(User),
  roleRestriction("user"),
  deleteUser
);

userRouter.post(
  "/create-accommodation-announcement",
  isAuthenticated(User),
  createAccommodationAnnouncement
);
userRouter.get(
  "/get-all-accommodation-announcement",
  getAllAccommodationAnnouncement
);
userRouter.post(
  "/create-instructor-or-psychologist-announcement",
  isAuthenticated(User),
  createInstructorOrPsychologistAnnouncement
);
userRouter.get(
  "/get-all-instructor-or-psychologist-announcement",
  getAllInstructorOrPsychologistAnnouncement
);
export default userRouter;
