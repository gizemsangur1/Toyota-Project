import React from "react";
import Loginto from "../components/Loginto";
import {  useParams } from "react-router-dom";
export default function Login() {
  const { buttonName } = useParams();
  return (
    <div>
      <Loginto />
    </div>
  );
}
