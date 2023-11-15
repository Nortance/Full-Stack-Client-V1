import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Avatar,
  SvgIcon,
  Container,
  Grid,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppSelector } from "../store/hooks";

const Post = () => {
  let { id } = useParams();
  const { userName } = useAppSelector((state) => state.common.auth);
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const fetchComments = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/byId/${id}`)
      .then((response) => {
        setPostObject(response.data);
      });

    fetchComments();
  }, []);

  const onSubmit = (data, { resetForm }) => {
    // Create a new comment object
    axios
      .post(`${process.env.REACT_APP_API_URL}/comments`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((resonse) => {
        if (resonse.data.error) {
          alert(resonse.data.error);
        } else {
          const commentToAdd = {
            ...resonse.data,
            username: resonse.data.username,
          };
          setComments([...comments, commentToAdd]);
        }
        fetchComments();
        resetForm();
      });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const initialValues = {
    commentBody: "",
    PostId: id,
  };

  const deleteCommment = (id) => () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        fetchComments();
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const deletePost = (id) => () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/blog");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter new title: ");
      axios.put(
        `${process.env.REACT_APP_API_URL}/posts/title`,
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      setPostObject({ ...postObject, title: newTitle });
    } else {
      let newPostText = prompt("Enter new post text: ");
      axios.put(
        `${process.env.REACT_APP_API_URL}/posts/postText`,
        {
          newPostText: newPostText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      setPostObject({ ...postObject, postText: newPostText });
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={8} position="relative">
        <IconButton
          onClick={() => navigate("/blog")}
          aria-label="go back"
          sx={{
            position: "absolute",
            top: { xs: "-30px", sm: "16px" },
            right: 16,
            backgroundColor: "background.paper",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "background.default",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        {postObject.username === userName && (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={deletePost(postObject.id)}
          >
            Delete
          </Button>
        )}
        <Box textAlign="center" mb={4}>
          <Typography variant="overline">#MUI</Typography>
          <Typography
            variant="h3"
            gutterBottom
            onClick={() => {
              if (postObject.username === userName) editPost("title");
            }}
          >
            {postObject.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            by {postObject.username} on{" "}
            <time dateTime={postObject.createdAt}>
              {formatDate(postObject.createdAt)}
            </time>
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color="textSecondary"
          onClick={() => {
            if (postObject.username === userName) editPost("body");
          }}
        >
          {postObject.postText}
        </Typography>
        <Box mt={8} borderTop={1} borderColor="divider">
          <Grid container spacing={2} alignItems="center" mt={2}>
            <Grid item xs={12} md={3}>
              <Avatar
                src="https://source.unsplash.com/75x75/?abstract"
                alt={postObject.username}
                sx={{ width: 96, height: 96, mx: "auto" }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h6">{postObject.username}</Typography>
              <Typography variant="body2" color="textSecondary">
                Sed non nibh iaculis, posuere diam vitae, consectetur neque.
                Integer velit ligula, semper sed nisl in, cursus commodo elit.
                Pellentesque sit amet mi luctus ligula euismod lobortis
                ultricies et nibh.
              </Typography>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" mt={2} gap={1}>
            {/* Example for GitHub icon */}
            <a href="#" aria-label="GitHub">
              <SvgIcon>{/* Paste your SVG path here */}</SvgIcon>
            </a>
            {/* Repeat similar anchor tags for Dribble, Twitter, and Email icons */}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: { xs: "90%", sm: "70%", md: 500 },
          margin: "50px auto",
          bgcolor: "background.paper",
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 6,
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="balck" mt={2}>
          Comments:
        </Typography>

        {comments.map((comment, id) => (
          <Box
            key={id}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              borderBottom: "1px solid #ddd",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">{comment.commentBody}</Typography>
              <Typography variant="body2" color="textSecondary">
                on{" "}
                <time dateTime={comment.createdAt}>
                  {formatDate(comment.createdAt)}
                </time>{" "}
                by{" " + comment.username}
              </Typography>
            </Box>
            {userName === comment.username && (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={deleteCommment(comment.id)}
              >
                X
              </Button>
            )}
          </Box>
        ))}
      </Box>

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
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Typography variant="h6" fontWeight="bold" color="primary" mt={2}>
              Commnet on post
            </Typography>

            <Field
              as={TextField}
              fullWidth
              id="inputCreatePostUsername"
              name="commentBody"
              placeholder="Write a commnet"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 4 }}
            >
              Submit Comment
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default Post;
