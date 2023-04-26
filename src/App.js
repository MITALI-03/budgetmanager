import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
//import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Food from "./components/Food";
import Fuel from "./components/Fuel";
import Other from "./components/Other";
import Rent from "./components/Rent";

const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  //in the routes, I am passing showAlert as the prop so that I can use alert functionality easily
  return (
    <>
      
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/home" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route exact path="/food" element={<Food />} />
            <Route exact path="/fuel" element={<Fuel />} />
            <Route exact path="/rent" element={<Rent />} />
            <Route exact path="/other" element={<Other />} />
          </Routes>
          <Footer />
        </Router>
      
    </>
  );
};
export default App;
