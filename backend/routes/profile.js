const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

// Get user profile
router.get("/api/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ profile: user.profile });
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

// Update user profile
router.put("/api/profile", auth, async (req, res) => {
  try {
    const { location, yearsOfExperience, skills, preferredJobType } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profile: { location, yearsOfExperience, skills, preferredJobType } },
      { new: true }
    ).select("-password");
    
    res.json({ profile: user.profile });
  } catch (error) {
    res.status(400).json({ error: "Error updating profile" });
  }
});

module.exports = router;
