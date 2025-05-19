import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendLoading, setRecommendLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
       const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs`);
       setJobs(res.data);
      } catch (error) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getRecommendations = async () => {
    setRecommendLoading(true);
    try {
      const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/recommendations`,
    { headers: { "x-auth-token": localStorage.getItem("token") } }
  );
  setRecommendations(res.data);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to get recommendations");
    } finally {
      setRecommendLoading(false);
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
          Job Listings
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<RecommendIcon />}
            onClick={getRecommendations}
            disabled={recommendLoading}
          >
            {recommendLoading ? "Finding Matches..." : "Find My Matches"}
          </Button>
        </Box>

        {recommendations.length > 0 && (
          <>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Recommended For You
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {recommendations.map((job) => (
                <Grid item xs={12} key={job._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{job.title}</Typography>
                      <Typography color="text.secondary">
                        {job.company} • {job.location}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {job.description}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        {job.skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View Details</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Typography variant="h5" gutterBottom>
          All Jobs
        </Typography>
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} key={job._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography color="text.secondary">
                    {job.company} • {job.location}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {job.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {job.skills.map((skill) => (
                      <Chip key={skill} label={skill} sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small">View Details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default JobsPage;
