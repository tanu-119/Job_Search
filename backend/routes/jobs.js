const express = require("express");
const Job = require("../models/Job");
const router = express.Router();

// Seed some initial jobs
const seedJobs = async () => {
  const count = await Job.countDocuments();
  if (count === 0) {
    const jobs = [
      {
        title: "Frontend Developer",
        company: "Tech Corp",
        location: "San Francisco, CA",
        skills: ["React", "JavaScript", "CSS"],
        type: "remote",
        description:
          "We are looking for a skilled frontend developer with React experience.",
      },
      {
        title: "Backend Engineer",
        company: "Data Systems",
        location: "New York, NY",
        skills: ["Node.js", "MongoDB", "API Design"],
        type: "onsite",
        description: "Join our backend team to build scalable systems.",
      },
      {
        title: "Full Stack Developer",
        company: "Web Solutions",
        location: "Austin, TX",
        skills: ["React", "Node.js", "Express"],
        type: "hybrid",
        description:
          "Full stack role with both frontend and backend responsibilities.",
      },
      {
        title: "UX Designer",
        company: "Creative Minds",
        location: "Chicago, IL",
        skills: ["Figma", "UI/UX", "Prototyping"],
        type: "remote",
        description: "Design beautiful and functional user experiences.",
      },
      {
        title: "DevOps Engineer",
        company: "Cloud Systems",
        location: "Seattle, WA",
        skills: ["AWS", "Docker", "CI/CD"],
        type: "onsite",
        description: "Help us build and maintain our cloud infrastructure.",
      },
    ];
    await Job.insertMany(jobs);
    console.log("Database seeded with initial jobs");
  }
};

seedJobs();

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
