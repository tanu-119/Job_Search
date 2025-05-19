const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  skills: [String],
  type: { type: String, enum: ["remote", "onsite", "hybrid"], required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Job", jobSchema);
