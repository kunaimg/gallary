import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import "../assets/scss/_signup.scss";
import { useNavigate } from "react-router-dom";
import app from "../firestore/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const auth = getAuth(app);
  const SignUpUser = async () => {
    if (email && password && name) {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (result.error) {
          toast.error(result.error, {
            position: "top-center",
            autoClose: 1000,
            closeOnClick: true,
            draggable: true,
          });
        } else {
          setTimeout(() => {
            toast.success("successfully user signup", {
              position: "top-center",
              autoClose: 1000,
              closeOnClick: true,
              draggable: true,
            });
          }, 1000);
          setTimeout(() => {
            navigate("/");
          }, 3500);
        }
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
      {" "}
      <Box className="signup">
        <Grid container>
          <Grid item lg={10} md={11} className="signup-form">
            <Grid container>
              <Grid item lg={12} xs={12} className="signup-main-image">
                <Box className="signup-image">
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
              <Grid item lg={12} xs={12} className="signup-field">
                <TextField
                  variant="outlined"
                  className="signup-left-field"
                  placeholder="Enter your name"
                  label="Enter your name"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item lg={12} xs={12} className="signup-field">
                <TextField
                  variant="outlined"
                  className="signup-right-field"
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
              <Grid item lg={12} xs={12} className="signup-field">
                <TextField
                  variant="outlined"
                  className="signup-right-field"
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
              <Grid item lg={6} md={9} xs={12} className="signup-button">
                <Button
                  variant="contained"
                  color="secondary"
                  className="signup-left-button"
                  onClick={() => navigate("/")}
                >
                  Go Back
                </Button>
              </Grid>

              <Grid item lg={6} md={9} xs={12} className="signup-button">
                <Button
                  variant="contained"
                  color="secondary"
                  className="signup-right-button"
                  onClick={SignUpUser}
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

export default SignUp;
