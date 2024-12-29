import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import LoginPage from "./loginPage";
import RegisterPage from "./RegisterPage";

function HomePage() {
  return (
    <>
      <NavBar />
                <Routes>
        
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default HomePage;
