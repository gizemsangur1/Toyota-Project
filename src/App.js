import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Terminals from "./pages/Terminals";
import Login from "./pages/Login";
import HataListeleme from "./pages/HataListeleme";
import HataGiris from "./pages/HataGiris";

function App() {
  return (

   <BrowserRouter>
      <Routes>
        <Route index element={<Terminals />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/HataGiris" element={<HataGiris />} />
        <Route path="/HataListeleme" element={<HataListeleme />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
