import { AppBar, Typography } from "@mui/material";
import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

export default function BuyukfontHeader() {
  const [data, setData] = useState([]);

  
  useEffect(() => {
    axios
      .get("/JsonFiles/Header.json")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  const arr = data.map((data, index) => {
    return (
      <Grid container direction="row" key={index}>
        <Grid item xs={1}>
          <Typography>Montaj No</Typography>
          <Typography value={data.assyNo}>{data.assyNo}</Typography>
        </Grid>
        <Grid item xs={1} sx={{border:1,borderRadius:1,backgroundColor:"blue"}}>
          <Typography>Body No</Typography>
          <Typography>{data.bodyNo}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h6">Hata Giris Ekrani</Typography>
        </Grid>
        <Grid item xs={1} >
         
        </Grid>
        <Grid item xs={1} sx={{border:1,borderRadius:1,backgroundColor:(data.bgColor)}}>
          <Typography>Renk</Typography>
          <Typography>{data.extCode}</Typography>
        </Grid>

        <Grid item xs={7}>
          <Typography>{data.firstname}</Typography>
          <Typography>{data.lastname}</Typography>
          <Typography>{data.departmentCode}</Typography>
        </Grid>
      </Grid>
    );
  });
  return (
    <div>
      <Box sx={{ flexGrow: 1, backgroundColor: "white", minWidth: "99vw" }}>
        <AppBar
          position="static"
          sx={{ flexGrow: 1, backgroundColor: "white", width: "100%",color:"black" }}
        >
          {arr}
        </AppBar>
      </Box>
    </div>
  );
}
