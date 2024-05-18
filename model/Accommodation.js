import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"],
  },
  definition: {
    type: String,
    required: [true, "Please provide a definition"],
  },
  images: {
    type: [String],
    required: [true, "Please provide images"],
  },
  location: {
    type: String,
    required: [true, "Please provide a location"],
  },
});

const Accommodation = mongoose.model("Accommodation", accommodationSchema);
export default Accommodation;
