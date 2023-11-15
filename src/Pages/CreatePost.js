import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Typography, TextField, Button } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
  };

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/posts`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((resonse) => {
        navigate("/blog");
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    postText: Yup.string().required("You must input a post text"),
  });

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "90%", sm: "70%", md: 500 },
        margin: "50px auto",
        bgcolor: "background.paper",
        boxShadow: 12,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: 6,
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Title
          </Typography>
          <ErrorMessage name="title" component="span" className="input-error" />
          <Field
            as={TextField}
            fullWidth
            id="inputCreatePostTitle"
            name="title"
            placeholder="Write a captivating title"
          />

          <Typography variant="h6" fontWeight="bold" color="primary" mt={2}>
            Post Text
          </Typography>
          <ErrorMessage
            name="postText"
            component="span"
            className="input-error"
          />
          <Field
            as={TextField}
            fullWidth
            id="inputCreatePostText"
            name="postText"
            placeholder="Write something interesting"
          />
          <ErrorMessage
            name="username"
            component="span"
            className="input-error"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 4 }}
          >
            Create Post
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default CreatePost;
