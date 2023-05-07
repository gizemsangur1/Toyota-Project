import { React, useState, useEffect } from "react";
import axios from "axios";
import {  Grid, Typography } from "@mui/material";
export default function Buyukfontdata() {

    const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/Buyukfont2.json")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data)
  
  const arr = data.map((data, index) => {
    return (
      <Grid container key={index}
      item
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
      }}>
        <Typography variant="h1" sx={{width:"100%"}}>
          {data.modelCode}
        </Typography>
        <Typography variant="h1"> 
          {data.modelId}
        </Typography>
      </Grid>
    );
  });

  return (
    <div>
        {arr}
    </div>
  )
}
