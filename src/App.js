import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Builder from "./Builder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/builder" />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  );
}
