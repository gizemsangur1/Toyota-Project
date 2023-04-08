import { Button, Grid, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import SelectDate from "../components/SelectDate";
import Keyboard from "../components/Keyboard";
import TerminlList from "../components/TerminlList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, textAlign } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loginto from "../components/Loginto";
/* ikinci kod */
export default function Login() {
  const navigate = useNavigate();

  const Close = () => {
    navigate("/", { replace: true });
  };
  const navigateToHataGiris = () => {
    navigate("/HataGiris");
  };

  const [color, setColor] = React.useState("#12a6eb");

  const handleChange = (event) => {
    setColor(event.target.value);
    console.log(color);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/Shifts.json")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = data.map((data, index) => {
    return (
      <MenuItem key={data.shiftId} value={data.rgbColor}>
        {data.shiftCode}
      </MenuItem>
    );
  });

  return (
    <div>
      <Loginto/>
     
    </div>
  );
}
