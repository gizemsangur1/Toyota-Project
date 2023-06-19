import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Terminals from "./pages/Terminals";
import Login from "./pages/Login";
import DefectListing from "./pages/DefectListing";
 import DefectRegistry from "./pages/DefectRegistry"; 
/* import HGornek from "./pages/HGornek"; */
function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route index element={<Terminals />} />
        <Route path="/Login" element={<Login />} />
         <Route path="/HataGiris" element={<DefectRegistry />} /> 
        <Route path="/HataListeleme" element={<DefectListing />} />
      </Routes>
    </BrowserRouter>   
  );
}

export default App;
