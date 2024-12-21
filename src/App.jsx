import React from "react";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import ResidentPage from "./pages/ResidentPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        
        <Route element={<ProtectedRoutes />}>
        <Route path="/resident/*" element={<ResidentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
