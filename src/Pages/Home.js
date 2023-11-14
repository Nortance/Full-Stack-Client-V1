import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section sx={{ bgcolor: "grey.900", color: "white", py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" direction="column">
          <Grid item xs={12} md={8}>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                backgroundImage:
                  "linear-gradient(to right, #00ff4c, #0000ff, #9400d3)", // changed to hex values for colors
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent", // Ensuring text fill color is transparent
                color: "white", // This will be the fallback color
                fontWeight: "bold",
                mt: 10,
              }}
            >
              Understand User Flow.
              <Typography variant="h3" component="span" display="block">
                Increase Conversion.
              </Typography>
            </Typography>

            <Typography
              align="center"
              variant="subtitle1"
              maxWidth="sm"
              mx="auto"
              mt={2}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </Typography>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/blog")}
              sx={{ mr: 2 }}
            >
              Blog
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Home;
