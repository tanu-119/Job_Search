const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Job = require("../models/Job");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const jobs = await Job.find();

    if (!user.profile?.skills?.length) {
      return res.status(400).json({
        error: "Please complete your profile with skills first",
      });
    }

    // For Gemini 1.5 Flash (latest as of July 2024)
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 1,
        topK: 32,
        maxOutputTokens: 4096,
      },
    });

    const prompt = `
      Analyze this job seeker profile and available jobs to recommend the top 3 matches.
      
      USER PROFILE:
      - Skills: ${user.profile.skills.join(", ")}
      - Experience: ${user.profile.yearsOfExperience} years
      - Location: ${user.profile.location || "Any"}
      - Job Type Preference: ${user.profile.preferredJobType || "Any"}
      
      AVAILABLE JOBS (${jobs.length} total):
      ${jobs
        .map(
          (job) => `
      - JOB ID: ${job._id}
        Title: ${job.title}
        Company: ${job.company}
        Required Skills: ${job.skills.join(", ")}
        Location: ${job.location}
        Type: ${job.type}
      `
        )
        .join("")}
      
      RESPONSE FORMAT (JSON ONLY):
      {
        "recommendations": ["job_id_1", "job_id_2", "job_id_3"],
        "reason": "Explanation of matches focusing on skills alignment"
      }
    `;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const jsonResponse = JSON.parse(text.slice(jsonStart, jsonEnd));

    const recommendedJobs = await Job.find({
      _id: { $in: jsonResponse.recommendations },
    });

    res.json({
      jobs: recommendedJobs,
      reason: jsonResponse.reason,
    });
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({
      error: "AI recommendation service unavailable",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});
module.exports = router;
