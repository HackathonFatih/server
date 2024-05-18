import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    city: {
      type: String,
      required: [true, "Please provide a city"],
    },
    role: {
      type: String,
      enum: ["user", "responsible"],
      default: "user",
    },
    isEarthquakeSurvivor: {
      type: Boolean,
      default: false,
    },
    passwordToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
