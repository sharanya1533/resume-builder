import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Builder from "./builder";

function Home() {
  return <h2>Home Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;