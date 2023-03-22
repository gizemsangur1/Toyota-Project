import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Terminals from "./pages/Terminals";
import Login from "./pages/Login";
import DataGridHata from "./components/DataGridHata";
import HataListeleme from "./pages/HataListeleme";
import Keyboard from "./components/Keyboard";

function App() {
  return (
  <Keyboard/>
   /* <BrowserRouter>
      <Routes>
        <Route index element={<Terminals />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>  */
  );
}

export default App;
