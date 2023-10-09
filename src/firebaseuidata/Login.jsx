import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import "../assets/scss/_login.scss";
import { useNavigate } from "react-router-dom";
import app from "../firestore/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = getAuth(app);
  const SignInUser = async () => {
    if (email && password) {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setTimeout(() => {
          toast.success("successfully user login", {
            position: "top-center",
            autoClose: 1000,
            closeOnClick: true,
            draggable: true,
          });
        }, 1000);

        setTimeout(() => {
          localStorage.setItem("valid", "user");
          navigate("/upload-image");
        }, 3500);
      } catch (error) {
        toast.error(error.code, {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: true,
          draggable: true,
        });
      }
    } else {
      toast.info("somthing went wrong", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
  return (
    <Box>
      <Box className="login">
        <Grid container>
          <Grid item lg={10} md={11} className="login-form">
            <Grid container>
              <Grid item lg={12} xs={12} className="login-main-image">
                <Box className="login-image">
                  <img src="https://picsum.photos/200/300" alt="" />
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "white", mb: 1, mt: 1 }}
                  >
                    Image upload ui
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item lg={12} xs={12} className="login-field">
                <TextField
                  variant="outlined"
                  className="login-left-field"
                  placeholder="Enter your email"
                  label="Enter your email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item lg={12} xs={12} className="login-field">
                <TextField
                  variant="outlined"
                  className="login-right-field"
                  placeholder="Enter your password"
                  label="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item lg={6} md={9} xs={12} className="login-button">
                <Button
                  variant="contained"
                  color="secondary"
                  className="login-left-button"
                  onClick={SignInUser}
                >
                  Login
                </Button>
              </Grid>

              <Grid item lg={6} md={9} xs={12} className="login-button">
                <Button
                  variant="contained"
                  color="secondary"
                  className="login-right-button"
                  onClick={() => navigate("/signup")}
                >
                  SignUp
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default Login;
