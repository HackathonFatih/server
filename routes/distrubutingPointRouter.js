import express from "express";
import {
  createDistributionPoint,
  createVolunteerAnnouncement,
} from "../controller/distrubutingPointController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import User from "../model/User.js";
import roleRestriction from "../middlewares/roleRestriction.js";

const distrubutingPointRouter = express.Router();

distrubutingPointRouter.post(
  "/create-volunteer-announcement",
  isAuthenticated(User),
  roleRestriction("responsible"),
  createVolunteerAnnouncement
);

distrubutingPointRouter.post(
  "/create-distribution-point",
  createDistributionPoint
);

export default distrubutingPointRouter;
