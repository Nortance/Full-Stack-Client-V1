import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  TextField,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("You must input a username"),
    password: Yup.string().min(4).max(20).required("You must input a password"),
  });

  const createUser = (data, { setSubmitting }) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth`, data).then(() => {
      setSubmitting(false);
      navigate("/login");
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={createUser}
      validationSchema={validationSchema}
    >
      <Form>
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
            src="https://source.unsplash.com/150x150/?wellcome"
            sx={{
              width: { xs: 100, md: 150 },
              height: { xs: 100, md: 150 },
              mb: 8,
              mt: 5,
            }}
          />
          <Field name="username">
            {({ field, form }) => (
              <TextField
                {...field}
                variant="outlined"
                fullWidth
                label="Username"
                placeholder="Username@gmail.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                error={form.errors.username && form.touched.username}
                sx={{ mb: 2 }}
              />
            )}
          </Field>
          <Field name="password">
            {({ field }) => (
              <TextField
                {...field}
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="············"
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
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Field>

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
            Register
          </Button>
        </Container>
      </Form>
    </Formik>
  );
};

export default Registration;
