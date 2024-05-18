import mongoose from "mongoose";

const distributionPointSchema = new mongoose.Schema({
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"],
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

distributionPointSchema.index({ location: "2dsphere" });

const DistributionPoint = mongoose.model(
  "DistributionPoint",
  distributionPointSchema
);

export default DistributionPoint;
