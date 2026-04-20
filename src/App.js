import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Builder from "./Builder"; // make sure path is correct

function Home() {
  return <h2>Home Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* redirect "/" to "/builder" */}
        <Route path="/" element={<Navigate to="/builder" replace />} />
        
        {/* actual builder page */}
        <Route path="/builder" element={<Builder />} />

        {/* fallback (VERY IMPORTANT) */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;