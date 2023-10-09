import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Card,
  Stack,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import "../assets/scss/_upload-image.scss";
import app from "../firestore/Firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

function UploadImage() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [upload, setUpload] = useState();
  const [imageList, setImageList] = useState([]);
  const [user, setuser] = useState();
  const chatContainerRef = useRef(null);
  const getstorage = getStorage(app);
  useEffect(() => {
    try {
      async function gain() {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setuser(user.email);
          } else {
            toast.error("please login or signup", {
              position: "top-center",
              autoClose: 1000,
              closeOnClick: true,
              draggable: true,
            });
            navigate("/");
          }
        });
        const response = await listAll(ref(getstorage, "images/"));
        response.items.forEach((data) => {
          getDownloadURL(data)?.then((url) => {
            setImageList((item) => [...item, url]);
          });
        });
      }
      gain();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function UploadImage() {
    if (upload == null) {
      toast.error("not upload", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
      return;
    } else {
      const imageRef = ref(getstorage, `images/${upload.name + v4()}`);
      const snap = await uploadBytes(imageRef, upload);
      toast.success("image upload", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
      getDownloadURL(snap.ref)?.then((url) => {
        setImageList((item) => [...item, url]);
      });
    }
    if (chatContainerRef.current) {
      chatContainerRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }
  function LogOutUser() {
    signOut(auth);
    navigate("/");
  }
  return (
    <Box classsName="main-upload">
      <Box className="upload-image" sx={{ pl: 3, pr: 3 }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
        >
          {" "}
          <Typography
            variant="subtitle2"
            className="user-info"
            sx={{ color: "gray", ml: 3, mt: 2 }}
          >
            user:{user}
          </Typography>
          <Box className="input-box">
            <input
              onChange={(event) => setUpload(event.target.files[0])}
              id="file-upload"
              type="file"
              accept="image/*"
              className="upload-input"
            />
            <Button
              variant="contained"
              onClick={UploadImage}
              sx={{ backgroundColor: "#57606f", fontSize: "0.7rem", ml: 1 }}
            >
              Upload
            </Button>
          </Box>
          <Button
            variant="contained"
            className="logout-button"
            onClick={LogOutUser}
            sx={{ backgroundColor: "gray" }}
          >
            Logout
          </Button>
        </Stack>
        <Container className="user-card">
          <Typography
            variant="h5"
            className="gallary"
            sx={{ color: "gray", mt: 5 }}
          >
            Gallary Images
          </Typography>
          <Grid container>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
              className="card-image"
            >
              {imageList?.map((url) => {
                return (
                  <Grid item lg={4} sx={{ mt: "4rem" }}>
                    <Box>
                      {" "}
                      <Card
                        sx={{
                          width: { xs: 400, lg: 345 },
                          ml: 3,
                          cursor: "pointer",
                        }}
                        className
                      >
                        <CardMedia
                          sx={{ height: 200, position: "center" }}
                          image={url}
                          title="green iguana"
                        />
                        <CardContent>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            upload by:{user}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                );
              })}
              <Box ref={chatContainerRef}></Box>
            </Stack>
          </Grid>
        </Container>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default UploadImage;
