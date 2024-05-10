import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "../components/signup/Signup";
import Login from "../components/login/Login";
import Dashboard from "../components/Dashboard";
function RouteProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteProvider;
