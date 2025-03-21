// import { useState } from 'react'
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthWrapper from "./Components/AuthWrapper";
import LibraryProvider from "./contexts/libraryContext";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="h-screen">
      <LibraryProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthWrapper />}>
              <Route
                path="/"
                element={<Home />}
              />
            </Route>
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
          </Routes>
        </BrowserRouter>
      </LibraryProvider>
    </div>
  );
}

export default App;
