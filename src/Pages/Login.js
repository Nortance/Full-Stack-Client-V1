import React, { useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setAuthState } from "../store/common/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, formData)
      .then((response) => {
        if (response.data.error) {
        } else {
          localStorage.setItem("accessToken", response.data.accessToken);
          dispatch(
            setAuthState({
              userName: response.data.username,
              id: response.data.id,
              accessToken: true,
            })
          );
          navigate("/");
        }
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
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
      <Avatar
        src="https://source.unsplash.com/150x150/?hello"
        sx={{
          width: { xs: 100, md: 150 },
          height: { xs: 100, md: 150 },
          mb: 2,
          mt: 5,
        }}
      />
      <Typography
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "green",
        }}
      >
        "Wellcome Back!"
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          label="Username"
          placeholder="Username@gmail.com"
          name="username"
          value={formData.username}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="············"
          name="password"
          value={formData.password}
          onChange={handleChange}
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
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
