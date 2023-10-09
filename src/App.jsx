import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./firebaseuidata/Login";
import SignUp from "./firebaseuidata/SignUp";
import UploadImage from "./firebaseuidata/UploadImage";
import Protected from "./firebaseuidata/Protected";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route
          path="/upload-image"
          element={<Protected Com={UploadImage} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
