import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppBar, Badge, Button, Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";


function Terminals() {

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/Login");
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/data")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = data.map((data, index) => {
    return (
      <Grid container direction="row" sx={{ lineHeight: 1.5 }}>
        <Grid item xs={2} sx={{ borderRight: 1, borderBottom: 1 }}>
          <Typography sx={{ padding: 1 }}>{data.depName}</Typography>
        </Grid>
        <Grid item xs={10} sx={{ borderBottom: 1, textAlign: "left" }}>
          {data.filterBaseds.map((subitem, i) => {
            return (
              <Badge
            
                badgeContent={subitem.linkCount}
                color="error"
                overlap="circular"
                sx={{ maxWidth: "max-content" }}
              >
                <Button
                  onClick={navigateToLogin}
                  sx={{ border: 1, fontSize: 14, color: "black", margin: 1 }}
                >
                  {subitem.filterCode}
                </Button>
              </Badge>
            );
          })}
        </Grid>
      </Grid>
    );
  });

  return (
    <div>
      <Grid>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Complete Vehicle Quality
              </Typography>
              <Box
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              ></Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Grid>

      <Grid container sx={{ mt: 5, border: 1, borderRadius: 2 }}>
        <Grid container direction="row">
          <Grid item xs={12}>
            <Typography sx={{ borderBottom: 1, textAlign: "center" }}>
              Tum Terminaller
            </Typography>
            
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={2}>
            <Typography
              sx={{ borderRight: 1, borderBottom: 1, textAlign: "center" }}
            >
              Bolum Bazinda
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography sx={{ borderBottom: 1, textAlign: "center" }}>
              Filtre Bazinda
            </Typography>
          </Grid>
        </Grid>
        {arr}
      </Grid>
    </div>
  );
}
export default Terminals;
