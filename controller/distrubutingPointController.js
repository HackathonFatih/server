import AsyncHandler from "express-async-handler";
import DistributionPoint from "../model/distrubutingPoint.js";
import User from "../model/User.js";

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

// @route POST /distrubuting/create-volunteer-announcement

export const createVolunteerAnnouncement = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuth.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const { description, peopleNumber } = req.body;
  const announcement = new DistributionPoint({
    responsible: user._id,
    address,
    volunteersAnnouncement: [
      {
        description,
        peopleNumber,
      },
    ],
  });

  await announcement.save();
  res.status(201).json({
    success: true,
    message: "Volunteer announcement created",
    data: announcement,
  });
});

// @route GET /distrubuting/where-is-our-trucks
export const whereIsOurTrucks = AsyncHandler(async (req, res) => {
  const { truckId } = req.body;
  const truck = await DistributionPoint.find({});
  res.status(200).json({
    success: true,
    data: distributionPoints,
  });
});
