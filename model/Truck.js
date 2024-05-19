import mongoose from "mongoose";

const truckSchema = new mongoose.Schema(
  ({
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DistributingPoint",
    },
    from: {
      type: String,
    },
    plate: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    driverName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    licensePlate: {
      type: String,
    },
    liveLocation: {
      type: String,
    },
  },
  { timestamps: true })
);

const Truck = mongoose.model("Truck", truckSchema);
export default Truck;
