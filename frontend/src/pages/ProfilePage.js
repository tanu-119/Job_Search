import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";

const skillsOptions = [
  "React",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "CSS",
  "HTML",
  "MongoDB",
  "SQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "CI/CD",
  "REST API",
  "GraphQL",
  "TypeScript",
  "Redux",
  "Express",
  "Flask",
];

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    location: "",
    yearsOfExperience: 0,
    skills: [],
    preferredJobType: "any",
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        if (res.data.profile) {
          setProfile(res.data.profile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (event) => {
    const { value } = event.target;
    setProfile((prev) => ({ ...prev, skills: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/profile`, profile, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          {user?.name}'s Profile
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Profile updated successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            name="location"
            value={profile.location}
            onChange={handleChange}
          />

          <TextField
            label="Years of Experience"
            type="number"
            fullWidth
            margin="normal"
            name="yearsOfExperience"
            value={profile.yearsOfExperience}
            onChange={handleChange}
            inputProps={{ min: 0 }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Skills</InputLabel>
            <Select
              multiple
              name="skills"
              value={profile.skills}
              onChange={handleSkillsChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {skillsOptions.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Preferred Job Type</InputLabel>
            <Select
              name="preferredJobType"
              value={profile.preferredJobType}
              onChange={handleChange}
              label="Preferred Job Type"
            >
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="onsite">Onsite</MenuItem>
              <MenuItem value="any">Any</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }}>
            Save Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
