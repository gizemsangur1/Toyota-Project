import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Terminals from "./pages/Terminals";
import Login from "./pages/Login";
import DataGridHata from "./components/DataGridHata";
import HataListeleme from "./pages/HataListeleme";
import Keyboard from "./components/Keyboard";
import ScrollButton from "./components/ScrollButton";
import ReactDOM from 'react-dom';
import HataGiris from "./pages/HataGiris";
function App() {
 
  return (
    
      <BrowserRouter>
      <Routes>
        <Route index element={<Terminals />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/HataListeleme" element={<HataListeleme />} />
        <Route path="/HataGiris" element={<HataGiris />} />
      </Routes>
    </BrowserRouter> 
   
    
    )
    
}

export default App;
