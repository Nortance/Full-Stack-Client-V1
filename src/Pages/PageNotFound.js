import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        px: 4,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography
          variant="h1"
          component="h2"
          sx={{
            fontWeight: "fontWeightBold",
            fontSize: "9rem",
            color: "grey.600",
          }}
        >
          404
        </Typography>
        <Typography variant="h2" sx={{ mt: 3, mb: 1 }}>
          Sorry, we couldn't find this page.
        </Typography>
        <Typography sx={{ mt: 2, mb: 3 }}>
          But don't worry, you can find plenty of other things on our homepage.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ py: 1.5, px: 3 }}
        >
          Back to homepage
        </Button>
      </Container>
    </Box>
  );
};

export default PageNotFound;
