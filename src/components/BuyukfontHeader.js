import { Typography } from "@mui/material";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

export default function BuyukfontHeader() {
  const [data, setData] = useState([]);
  const shift = useSelector(state => state.shift);
  useEffect(() => {
    axios
      .get("/JsonFiles/Header.json")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid
      container
      direction="row"
      sx={{ backgroundColor: "white", height: "12vh" }}
    >
      {data.map((data, index) => {
        return (
          <Grid container minHeight={25}>
            <Grid item xs={2} sm={2}>
              <Typography>Montaj No</Typography>
              <Typography value={data.assyNo}>{data.assyNo}</Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sm={2}
              sx={{ border: 1, borderRadius: 1, backgroundColor:shift, height: "12vh" }}
            >
              <Typography>Body No</Typography>
              <Typography>{data.bodyNo}</Typography>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Typography variant="h6">Hata Giris Ekrani</Typography>
            </Grid>
            <Grid item xs={2} sm={2}></Grid>
            <Grid
              item
              xs={2}
              sm={2}
              sx={{ border: 1, borderRadius: 1, backgroundColor: data.bgColor, height: "12vh" }}
            >
              <Typography>Renk</Typography>
              <Typography>{data.extCode}</Typography>
            </Grid>

            <Grid item xs={2} sm={2} sx={{}}>
              <Typography>{data.firstname}</Typography>
              <Typography>{data.lastname}</Typography>
              <Typography>{data.departmentCode}</Typography>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
