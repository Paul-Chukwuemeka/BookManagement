// import { useState } from 'react'
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AddBooks from "./pages/AddBooks";
import AuthWrapper from "./Components/AuthWrapper";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {


  return (
    <div className="h-screen">
      <Navbar />
      <BrowserRouter>
        <Routes>
        <Route element={<AuthWrapper />}> 
          <Route
            path="/AddBooks"
            element={<AddBooks />}
          />
          <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
