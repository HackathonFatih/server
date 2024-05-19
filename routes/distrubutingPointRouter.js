import express from "express";
import {
  createDistributionPoint,
  createVolunteerAnnouncement,
  whereIsOurTrucks,
} from "../controller/distrubutingPointController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import User from "../model/User.js";
import roleRestriction from "../middlewares/roleRestriction.js";

const distrubutingPointRouter = express.Router();

distrubutingPointRouter.post(
  "/:distrubutingPointId/create-volunteer-announcement",
  isAuthenticated(User),
  roleRestriction("responsible"),
  createVolunteerAnnouncement
);

distrubutingPointRouter.post(
  "/create-distribution-point",
  createDistributionPoint
);
distrubutingPointRouter.post(
  "/:distrubutingPointId/where-is-our-trucks",
  isAuthenticated(User),
  roleRestriction("responsible"),
  whereIsOurTrucks
);

export default distrubutingPointRouter;
