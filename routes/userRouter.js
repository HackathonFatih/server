import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserProfile,
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

export default userRouter;
