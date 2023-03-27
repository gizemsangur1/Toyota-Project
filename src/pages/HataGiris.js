import { Button, Grid, Input, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "mui-image";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function HataGiris() {

    const navigate = useNavigate();

    const navigateToHataListesi = () => {
      navigate("/HataListeleme");
    };
  

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3006/data")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2}></Grid>
        <Grid
          container
          item
          xs={8}
          justifyContent="center"
          alignItems="center"
          sx={{ border: 1, borderRadius: 1 }}
        >
          <Grid item xs={8}>
            <Grid container direction="row">
              <Grid item xs={2}>
                <Typography>Montaj No</Typography>
                {data.map((item) => (
                  <Typography key={item.modelId}>{item.assyNo}</Typography>
                ))}
              </Grid>
              <Grid
                container
                item
                xs={2}
                justifyContent="center"
                alignItems="center"
                sx={{
                  border: 1,
                  borderRadius: 1,
                }}
              >
                <Grid
                  container
                  item
                  xs={12}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography>Body No</Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  justifyContent="center"
                  alignItems="center"
                >
                  {data.map((item) => (
                    <Typography key={item.modelId}>{item.bodyNo}</Typography>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Typography>HATA GİRİŞ EKRANI</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>RENK</Typography>
                {data.map((item) => (
                  <Typography key={item.modelId}>{item.extCode}</Typography>
                ))}
              </Grid>
            </Grid>
            <Grid container direction="row">
              <Box
                component="img"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
                src="car1.png"
              />
            </Grid>
            <Grid container direction="row">
              <Grid
                item
                xs={12}
                sx={{
                  border: 1,
                  borderRadius: 1,
                }}
              >
                <Button>ÇIKIŞ</Button>
                <Button>MODELİN İLK RESMİ</Button>
                <Button>GERİ</Button>
                <Button onClick={navigateToHataListesi}>HATA LİSTESİ</Button>
                <Button>TEMİZLE</Button>
                <Button>BÜYÜK FONT</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={4}  sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}>
            <Grid item xs={12}>
              <Button>HIZLI KAYDET</Button>
            </Grid>
            <Grid item  xs={12}>
              <Button>KAYDET GEÇ</Button>
            </Grid>
            <Grid item  xs={12}>
              <Button>HATA KAYIT</Button>
            </Grid>
            <Grid item  xs={12}>
             <Typography>MONTAJ NO</Typography>
             <Input></Input>
            </Grid>
            <Grid item  xs={12}>
              <Button>ARA</Button>
            </Grid>
            <Grid item  xs={12}>
              <Button>TERMİNAL İLK RESMİ</Button>
            </Grid>
            <Grid item  xs={12}>
              <Button>SIK GELEN HATA</Button>
            </Grid>
            <Grid item  xs={12}>
              <Button>MANİFEST</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}
