import React, { useEffect, useState } from "react";
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const Blog = () => {
  const [responseData, setResponseData] = useState([]);
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => state.common.auth);

  useEffect(() => {
    axios.get(`posts`).then((response) => {
      setResponseData(response.data);
    });
  }, []);

  const handleClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <Container maxWidth="xl">
      {" "}
      {/* Add padding to the container */}
      <Grid container spacing={4} sx={{ mt: 3, mb: 3 }}>
        {responseData.map((value, key) => {
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
                    Written by:{" "}
                    <Typography
                      level="body-sm"
                      fontWeight={600}
                      sx={{
                        cursor: value.UserId === id ? "pointer" : "default",
                        opacity: value.UserId === id ? 1 : 0.5,
                      }}
                      onClick={() => {
                        if (value.UserId === id) {
                          navigate(`/profile/${value.UserId}`);
                        }
                      }}
                    >
                      {value.username}
                    </Typography>
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
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Blog;
