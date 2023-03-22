import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
export default function Keyboard() {
  const keyboardfirst = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "0" },
    { value: "BACK" },
  ];
  const keyboardsecond = [
    { value: "TAB" },
    { value: "Q" },
    { value: "W" },
    { value: "E" },
    { value: "R" },
    { value: "T" },
    { value: "Y" },
    { value: "U" },
    { value: "I" },
    { value: "O" },
    { value: "P" },
    { value: "Ğ" },
    { value: "Ü" },
  ];
  return (
    <div>
      <Box
        sx={{
          display: "inline-flex",
          textAlign: "center",
          border: 1,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            textAlign: "center",
            border: 1,
            borderRadius: 1,
          }}
        >
          <Grid container direction="row">
            {keyboardfirst.map(function (d, idx) {
              return (
                <Grid
                  item
                  sx={{
                    margin: 1,
                    textAlign: "center",
                    border: 1,
                    borderRadius: 1,
                    height: 60,
                    width: 60,
                  }}
                  key={idx}
                >
                  {d.value}
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "inline-flex",
            textAlign: "center",
            border: 1,
            borderRadius: 1,
          }}
        >
          <Grid container direction="row">
            {keyboardsecond.map(function (d, idx) {
              return (
                <Grid
                  item
                  sx={{
                    margin: 1,
                    textAlign: "center",
                    border: 1,
                    borderRadius: 1,
                    height: 60,
                    width: 60,
                  }}
                  key={idx}
                >
                  {d.value}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
      {/* <Grid container sx={{width:1100,border:1}}>
        <Grid container direction="row" >
          {keyboardfirst.map(function (d, idx) {
            return <Grid item  sx={{margin:1,textAlign:"center",border:1}} key={idx}>{d.value}</Grid>
          })}
        </Grid>
        <Grid container direction="row"></Grid>
        <Grid container direction="row"></Grid>
        <Grid container direction="row"></Grid>
        <Grid container direction="row"></Grid>
      </Grid> */}
    </div>
  );
}
