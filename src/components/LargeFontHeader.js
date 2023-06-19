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
  const MontajNo = JSON.parse(localStorage.getItem('MontajNo'));
    
   const Shift = localStorage.getItem('Shift'); 
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
                <Typography value={MontajNo} sx={{fontSize:"1.5vw"}}>{MontajNo}</Typography>
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
                  backgroundColor:Shift,
                  border: 1,
                  borderRadius: 1,
                  textAlign:"center"
                }}
              >
                <Typography sx={{fontSize:"1.5vw"}}>{t("BNo")}</Typography>
                <Typography sx={{fontSize:"1.5vw"}}>{data.bodyNo}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={4} sm={4} sx={{textAlign:"center"}}>
              <Typography variant="h6"  sx={{fontSize:"1.6vw"}}>{t("HGE")}</Typography>
            </Grid>
            <Grid item xs={2} sm={2} sx={{padding:1}}>
              <Grid
                sx={{
                  backgroundColor: data.bgColor,
                  border: 1,
                  borderRadius: 1,
                  textAlign:"center"
                }}
              >
                <Typography sx={{fontSize:"1.5vw"}}>{t("Color")}</Typography>
                <Typography sx={{fontSize:"1.5vw"}}>{data.extCode}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={2} sm={2}>
              <Grid
              sx={{textAlign:"center"}}
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
