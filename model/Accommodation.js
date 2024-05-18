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
  personNumber: {
    type: Number,
    required: [true, "Please provide a person number"],
  },
  duration: {
    type: String,
    required: [true, "Please provide a duration"],
  },
  city: {
    type: String,
    required: [true, "Please provide a city"],
  },
  township: {
    type: String,
    required: [true, "Please provide a township"],
  },
  district: {
    type: String,
    required: [true, "Please provide a district"],
  },

  street: {
    type: String,
    required: [true, "Please provide a street"],
  },
});

const Accommodation = mongoose.model("Accommodation", accommodationSchema);
export default Accommodation;
