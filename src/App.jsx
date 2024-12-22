import React from "react";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import ResidentPage from "./pages/ResidentPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import PageNotFound from "./errors/PageNotFound";
import { useAuth } from "./services/AuthProvider";

function App() {
  const { role } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route element={<ProtectedRoutes />}>
          {/* Validating resident only allowed route  */}
          {role === "resident" ? (
            <Route path="/resident/*" element={<ResidentPage />} />
          ) : (
            <Route path="/resident/*" element={<Navigate to="/"/>} />
          )}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
