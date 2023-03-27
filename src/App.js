import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Navbar from "./components/Navbar";
import ImageDisplay from "./components/ImageDisplay";
import React, { useState } from "react";

//dog and cat header images
import catImage from "./images/cats-header.jpg";
import dogImage from "./images/dogs-header.jpg";

// pages and components
import Home from "./pages/Home";
import People from "./pages/People";
import Services from "./pages/Services";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pets from "./pages/Pets";
import Playdates from "./pages/Playdates";

function App() {
  const [currentImage, setCurrentImage] = useState(catImage);

  const handleButtonClick = (image) => {
    setCurrentImage(image);
  };

  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar onButtonClick={handleButtonClick} currentImage={currentImage} />
        <div className="mainImage">
          <ImageDisplay image={currentImage} />
        </div>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people" element={<People />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/pets"
              // if we have a user then go to Home if not go to login
              element={user ? <Pets /> : <Navigate to="/login" />}
            />
            <Route
              path="/playdates"
              // if we have a user then go to Home if not go to login
              element={user ? <Playdates /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
