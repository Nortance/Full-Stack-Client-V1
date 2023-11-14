import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";

function MinimalisticFooter() {
  const currentYear = new Date().getFullYear();
  const links = ["Terms of Service", "Legal", "Contacts"];

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              textAlign: { xs: "center", sm: "left" },
              mb: { xs: 2, sm: 0 },
            }}
          >
            © {currentYear} Your Company
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
              gap: 2,
            }}
          >
            {links.map((link) => (
              <MenuItem key={link}>
                <Typography textAlign="center">{link}</Typography>
              </MenuItem>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MinimalisticFooter;
