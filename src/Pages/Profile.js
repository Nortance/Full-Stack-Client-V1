import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import user from "../assets/images/user.svg";
import { useAppSelector } from "../store/hooks";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { userName } = useAppSelector((state) => state.common.auth);
  const { id } = useAppSelector((state) => state.common.auth);
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [id]);

  const fetchPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/byuserId/${id}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setListOfPosts(response.data);
        } else {
          console.error("Received data is not an array:", response.data);
          setListOfPosts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setListOfPosts([]);
      });
  };

  const handleClick = (id) => {
    navigate(`/post/${id}`);
  };

  const deletePost = (id) => () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    });
    fetchPosts();
  };

  return (
    <Container>
      <Box
        sx={{
          mx: "auto",
          width: { xs: "100%", sm: "75%", lg: "50%" },
          bgcolor: "common.white",
          boxShadow: "xl",
          borderRadius: "lg",
          mt: 16,
          position: "relative",
        }}
      >
        <Box sx={{ p: 6 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              alt="Profile picture"
              src={user}
              sx={{
                width: 150,
                height: 150,
                boxShadow: "xl",
                position: "absolute",
                top: -75,
                borderWidth: 4,
                borderColor: "common.white",
                borderStyle: "solid",
              }}
            />
          </Box>
          <Box sx={{ mt: 14, textAlign: "center", mb: 2 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "grey.700" }}
            >
              {userName}
            </Typography>
            {}
            <Button onClick={() => navigate("/change-password")}>
              Change Password
            </Button>
            <Typography
              sx={{
                color: "grey.500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 1,
              }}
            >
              <i
                className="fas fa-map-marker-alt"
                style={{ marginRight: 8 }}
              ></i>{" "}
              The Matrix
            </Typography>
          </Box>
          Number of posts: {}
        </Box>
        <Divider sx={{ borderColor: "grey.200" }} />
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography sx={{ color: "grey.700", mb: 4 }}>
            {userName} posts
          </Typography>
          {listOfPosts.map((value, key) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={key}
                sx={{ margin: 1 }}
              >
                {" "}
                {/* Adjust the grid sizing here */}
                <Card sx={{ width: "100%", mx: "auto", boxShadow: 3 }}>
                  {" "}
                  {/* Use 100% width for responsiveness */}
                  <div>
                    <Typography level="title-lg">{value.title}</Typography>
                    <Typography level="body-sm">
                      Written by: {value.username}
                    </Typography>
                  </div>
                  <AspectRatio minHeight="120px" maxHeight="200px">
                    <img
                      src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                      srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <CardContent orientation="horizontal">
                    <div>
                      <Typography level="body-xs">{value.postText}</Typography>
                    </div>
                    <Button
                      variant="solid"
                      size="md"
                      color="primary"
                      aria-label="Explore Bahamas Islands"
                      sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                      onClick={() => handleClick(value.id)}
                    >
                      Read more
                    </Button>
                  </CardContent>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={deletePost(value.id)}
                  >
                    Delete
                  </Button>
                </Card>
              </Grid>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
