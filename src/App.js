import "./App.scss";
import Blog from "./Pages/Blog";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import MinimalisticFooter from "./Components/MinimalisticFooter";
import Container from "@mui/material/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import Post from "./Pages/Post";
import "typeface-roboto";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import { useEffect } from "react";
import React from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setAuthState } from "./store/common/authSlice";
import PageNotFound from "./Pages/PageNotFound";
import Profile from "./Pages/Profile";
import { ChangePassword } from "./Pages/ChangePassword";

const App = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.common.auth);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/validateToken", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          dispatch(
            setAuthState({
              userName: response.data.username,
              id: response.data.id,
              accessToken: true,
            })
          );
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routesConfig = [
    { path: "/", name: "Home Page" },
    { path: "/blog", name: "Blog" },
    { path: "/create-post", name: "Create Post" },
    ...(accessToken
      ? []
      : [
          { path: "/login", name: "Login" },
          { path: "/registration", name: "Registration" },
        ]),
  ];

  return (
    <Router>
      <div className="App">
        <ResponsiveAppBar routes={routesConfig} />
        <div className="App-content">
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Container>
        </div>
        <MinimalisticFooter />
      </div>
    </Router>
  );
};

export default App;
