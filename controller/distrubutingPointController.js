import AsyncHandler from "express-async-handler";
import DistributionPoint from "../model/distrubutingPoint.js";
import User from "../model/User.js";
import Truck from "../model/Truck.js";

//kaldırılacak
export const createDistributionPoint = AsyncHandler(async (req, res) => {
  const { address, name } = req.body;
  const distributionPoint = new DistributionPoint({
    name,
    address,
  });

  await distributionPoint.save();
  res.status(201).json({
    success: true,
    message: "Distribution point created",
    data: distributionPoint,
  });
});

// @route POST /distrubuting/:distrubutingPointId/create-volunteer-announcement

export const createVolunteerAnnouncement = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuth._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const { distrubutingPointId } = req.params;
  if (!user || !user.placeOfResponsibility) {
    res.status(404);
    throw new Error("User not found or user has no distribution point");
  }

  if (user.placeOfResponsibility.toString() !== distrubutingPointId) {
    res.status(403);
    throw new Error("You are not authorized to access this distribution point");
  }
  const { description, peopleNumber } = req.body;

  const distributionPoint = await DistributionPoint.findById(
    distrubutingPointId
  );
  if (!distributionPoint) {
    res.status(404);
    throw new Error("Distribution point not found");
  }

  distributionPoint.volunteersAnnouncements.push({
    description,
    peopleNumber,
  });

  await distributionPoint.save();

  res.status(201).json({
    success: true,
    message: "Volunteer announcement created",
    data: distributionPoint,
  });
});
// @route GET /distrubuting/get-all-volunteer-announcement

export const getAllVolunteerAnnouncement = AsyncHandler(async (req, res) => {
  const distributionPoints = await DistributionPoint.find({});

  const volunteerAnnouncements = distributionPoints.map((dp) => ({
    distributionPointId: dp._id,
    distributionPointName: dp.name,
  }));

  res.status(200).json({
    success: true,
    data: volunteerAnnouncements,
  });
});

// @route GET /distrubuting/:distrubutingPointId/where-is-our-trucks

export const whereIsOurTrucks = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuth._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { distrubutingPointId } = req.params;
  if (user.distrubutingPoint.toString() !== distrubutingPointId) {
    res.status(403);
    throw new Error("You are not authorized to access this distribution point");
  }

  const { truckId } = req.body;
  const truck = await Truck.findById({ truckId });
  res.status(200).json({
    success: true,
    data: truck,
  });
});
