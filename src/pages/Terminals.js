import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppBar, Button, Grid } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useTranslation,Trans  } from "react-i18next";
function Terminals() {
  const{t,i18n}=useTranslation();
 
  const theme = createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            textAlign: "center",
            color: "red",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { minWidth: 100 },
        },
      },
    },
  });

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/Login");
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/terminals.json")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = data.map((data, index) => {
    return (
      <Grid container direction="row" sx={{ lineHeight: 1 }} key={index}>
        
        <Grid item xs={2} sx={{ borderRight: 1, borderBottom: 1 }}>
          <Typography sx={{ padding: 1 }}>{data.depName}</Typography>
        </Grid>
        <Grid item xs={10} sx={{ borderBottom: 1, textAlign: "left" }}>
          {data.filterBaseds.map((subitem, i) => {
            if (subitem.linkCount > 1) {
              return (
                <Button
                  onClick={navigateToLogin}
                  key={i}
                  sx={{
                    borderRadius: 2,
                    border: 1,
                    fontSize: 14,
                    color: "black",
                    margin: 1,
                    maxWidth: 100,
                    minwidth: 100,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "red",
                      borderTopRightRadius: 7,
                      borderBottomLeftRadius: 7,
                      width: 20,
                      height: 20,
                    }}
                  >
                    <Typography sx={{ color: "white", fontSize: 13 }}>
                      {subitem.linkCount}
                    </Typography>
                  </div>
                  {subitem.filterCode}
                </Button>
              );
            } else {
              return (
                <Button
                  key={i}
                  onClick={navigateToLogin}
                  sx={{
                    borderRadius: 2,
                    border: 1,
                    fontSize: 14,
                    color: "black",
                    margin: 1,
                    width: 50,
                  }}
                >
                  {subitem.filterCode}
                </Button>
              );
            }
          })}
        </Grid>
      </Grid>
    );
  });

  return (
    <div>
      <Grid>
        <Box sx={{ flexGrow: 1, backgroundColor: "#c6ffc8" }}>
          <AppBar
            position="static"
            sx={{ flexGrow: 1, backgroundColor: "#c6ffc8" }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "black" }}
              >
                Complete Vehicle Quality
              </Typography>
              
              <Button color="inherit" sx={{ color: "red" }}>
                {t('Help')}
              </Button>
              <Button color="inherit" sx={{ color: "red" }}>
                {t('MainPage')}
              </Button>
              <Button color="inherit" sx={{ color: "red" }}>
                {t('Support')}
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>

      <ThemeProvider theme={theme}>
        <Grid container sx={{ mt: 5, border: 1, borderRadius: 2 }}>
          <Grid container direction="row">
            <Grid item xs={12} sx={{ borderBottom: 1, textAlign: "center" }}>
              <Typography sx={{ textDecorationLine: "underline" }}>
                {t('Allterminals')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid
              item
              xs={2}
              sx={{ borderRight: 1, borderBottom: 1, textAlign: "center" }}
            >
              <Typography>{t('Dep')}</Typography>
            </Grid>
            <Grid item xs={10} sx={{ borderBottom: 1, textAlign: "center" }}>
              <Typography>{t('FBase')}</Typography>
            </Grid>
          </Grid>
          {arr}
        </Grid>
      </ThemeProvider>
    </div>
  );
}
export default Terminals;
