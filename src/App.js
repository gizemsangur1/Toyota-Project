import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Terminals from "./Components/Terminals";
import Login from "./Components/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Terminals />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
