import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Welcome to JobMatch
        </Typography>
        <Typography variant="h5" gutterBottom>
          AI-powered job recommendations tailored to your skills
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/signup"
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button variant="outlined" size="large" component={Link} to="/login">
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
