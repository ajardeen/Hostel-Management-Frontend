import React, { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import LoginPage from "./loginPage";
import RegisterPage from "./RegisterPage";

// Create the context
export const LoginStatusContext = createContext();

function HomePage() {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <LoginStatusContext.Provider value={{ loginStatus, setLoginStatus }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </LoginStatusContext.Provider>
  );
}

export default HomePage;
