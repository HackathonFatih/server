import mongoose from "mongoose";

const instructorOrPsychologistSchema = new mongoose.Schema({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"],
  },
  type: {
    type: String,
    enum: ["instructor", "psychologist"],
    required: [true, "Please provide a type"],
  },
  definition: {
    type: String,
    required: [true, "Please provide a definition"],
  },
  images: {
    type: [String],
    required: [true, "Please provide images"],
  },
});

const InstructorOrPsychologist = mongoose.model(
  "InstructorOrPsychologist",
  instructorOrPsychologistSchema
);
export default InstructorOrPsychologist;
