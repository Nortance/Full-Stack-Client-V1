import React, { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import axios from "axios";
import {
  Button,
  Container,
  TextField,
  Avatar,
  InputAdornment,
  Typography,
  IconButton,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => state.common.auth);
  const [responseId, setResponseId] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/validateToken", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setResponseId(response.data.id);
        }
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        "http://localhost:3001/auth/change-password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Password changed successfully");
          setOldPassword("");
          setNewPassword("");
          navigate(`/profile/${id}`);
        }
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        alert("An error occurred while changing the password.");
      });
  };

  return responseId === id ? (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: { xs: 5, md: 8 },
        p: { xs: 2, md: 4 },
        bgcolor: "#FDFDFD",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "blue",
        }}
      >
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type={showOldPassword ? "text" : "password"}
          label="Old Password"
          placeholder="············"
          name="password"
          onChange={(e) => setOldPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onMouseDown={() => setShowOldPassword(true)}
                  onMouseUp={() => setShowOldPassword(false)}
                  edge="end"
                >
                  {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          type={showNewPassword ? "text" : "password"}
          label="New Password"
          placeholder="············"
          name="password"
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onMouseDown={() => setShowNewPassword(true)}
                  onMouseUp={() => setShowNewPassword(false)}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            py: 1,
            mb: 4,
            mt: 2,
          }}
        >
          Change Password
        </Button>
      </form>
    </Container>
  ) : (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: { xs: 5, md: 8 },
        p: { xs: 2, md: 4 },
        bgcolor: "#FDFDFD",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "red",
        }}
      >
        Please login
      </Typography>
    </Container>
  );
};
