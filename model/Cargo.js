import mongoose from "mongoose";

const cargoSchema = new mongoose.Schema(
  {
    followNumber: {
      type: String,
    },
    from: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DistributingPoint",
    },
  },
  { timestamps: true }
);

const Cargo = mongoose.model("Cargo", cargoSchema);
export default Cargo;
