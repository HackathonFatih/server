import mongoose from "mongoose";

const distributionPointSchema = new mongoose.Schema({
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  volunteersAnnouncements: [
    {
      description: {
        type: String,
        required: true,
      },
      peopleNumber: {
        type: Number,
        required: true,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const DistributionPoint = mongoose.model(
  "DistributionPoint",
  distributionPointSchema
);

export default DistributionPoint;
