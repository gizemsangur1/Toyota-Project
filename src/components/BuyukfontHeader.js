import { Typography } from "@mui/material";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

export default function BuyukfontHeader() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const shift = useSelector((state) => state.shift);
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
      sx={{ backgroundColor: "white", minWidth: "100%" }}
    >
      {data.map((data, index) => {
        return (
          <Grid container key={index}>
            <Grid
              item
              xs={2}
              sm={2}
              sx={{ textAlign: "center", alignContent: "center",padding:1 }}
            >
              <Box>
                <Typography sx={{fontSize:"1.5vw"}}>{t("MNo")}</Typography>
                <Typography value={data.assyNo} sx={{fontSize:"1.5vw"}}>{data.assyNo}</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              sm={2}
              sx={{
                textAlign: "center",
                alignContent: "center",
                padding:1
              }}
            >
              <Grid
                sx={{
                  backgroundColor: shift,
                  border: 1,
                  borderRadius: 1,
                }}
              >
                <Typography sx={{fontSize:"1.5vw"}}>{t("BNo")}</Typography>
                <Typography sx={{fontSize:"1.5vw"}}>{data.bodyNo}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Typography variant="h6"  sx={{fontSize:"1.9vw"}}>{t("HGE")}</Typography>
            </Grid>
            <Grid item xs={2} sm={2}></Grid>
            <Grid item xs={2} sm={2} sx={{padding:1}}>
              <Grid
                sx={{
                  backgroundColor: data.bgColor,
                  border: 1,
                  borderRadius: 1,
                  
                }}
              >
                <Typography sx={{fontSize:"1.5vw"}}>{t("Color")}</Typography>
                <Typography sx={{fontSize:"1.5vw"}}>{data.extCode}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={2} sm={2}>
              <Grid
              
              >
                <Typography sx={{fontSize:"1.3vw"}}>{data.firstname}</Typography>
                <Typography sx={{fontSize:"1.3vw"}}>{data.lastname}</Typography>
                <Typography sx={{fontSize:"1.3vw"}}>{data.departmentCode}</Typography>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
