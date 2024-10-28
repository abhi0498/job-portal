// models/Job.js
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job title is required"],
  },
  company: {
    type: String,
    required: [true, "Company name is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  description: {
    type: String,
    required: [true, "Job description is required"],
  },
  salary: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
