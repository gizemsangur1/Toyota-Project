import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

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
  const keyboardthird = [
    { value: "CAPSLOCK" },
    { value: "A" },
    { value: "S" },
    { value: "D" },
    { value: "F" },
    { value: "G" },
    { value: "H" },
    { value: "J" },
    { value: "K" },
    { value: "L" },
    { value: "Ş" },
    { value: "İ" },
  ];
  const keyboardfourth = [
    { value: "_" },
    { value: "Z" },
    { value: "X" },
    { value: "C" },
    { value: "V" },
    { value: "B" },
    { value: "N" },
    { value: "M" },
    { value: "Ö" },
    { value: "Ç" },
    { value: "." },
    { value: "," },
    { value: "*" },
  ];
  const keyboardfifth = [{ value: "SPACE" }];
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
         
          bgcolor: "background.paper",
          borderRadius: 1,
          justifyContent: "space-between",
        }}
      >
        <Item>
          <Grid container direction="row" sx={{display: "flex",
    justifyContent: "space-between",
    width: "100%"}}>
            <Item sx={{ width: 50, height: 40 }}>1</Item>
            <Item sx={{ width: 50, height: 40 }}>2</Item>
            <Item sx={{ width: 50, height: 40 }}>3</Item>
            <Item sx={{ width: 50, height: 40 }}>4</Item>
            <Item sx={{ width: 50, height: 40 }}>5</Item>
            <Item sx={{ width: 50, height: 40 }}>6</Item>
            <Item sx={{ width: 50, height: 40 }}>7</Item>
            <Item sx={{ width: 50, height: 40 }}>8</Item>
            <Item sx={{ width: 50, height: 40 }}>9</Item>
            <Item sx={{ width: 50, height: 40 }}>0</Item>
            <Item sx={{ width: 115, height: 40 }}>BACK</Item>
            {/*   {keyboardfirst.map(function (d, idx) {
              return (
                <Item
                sx={{width:40,height:40}}
                  key={idx}
                >
                  {d.value}
                </Item>
              );
            })} */}
          </Grid>
          <Grid container direction="row">
            <Item sx={{ width: 70, height: 40 }}>TAB</Item>
            <Item sx={{ width: 40, height: 40 }}>Q</Item>
            <Item sx={{ width: 40, height: 40 }}>W</Item>
            <Item sx={{ width: 40, height: 40 }}>E</Item>
            <Item sx={{ width: 40, height: 40 }}>R</Item>
            <Item sx={{ width: 40, height: 40 }}>T</Item>
            <Item sx={{ width: 40, height: 40 }}>Y</Item>
            <Item sx={{ width: 40, height: 40 }}>U</Item>
            <Item sx={{ width: 40, height: 40 }}>I</Item>
            <Item sx={{ width: 40, height: 40 }}>O</Item>
            <Item sx={{ width: 40, height: 40 }}>P</Item>
            <Item sx={{ width: 40, height: 40 }}>Ğ</Item>
            <Item sx={{ width: 40, height: 40 }}>Ü</Item>

            {/*  {keyboardsecond.map(function (d, idx) {
              return (
                <Item sx={{ width: 40, height: 40 }} key={idx}>
                  {d.value}
                </Item>
              );
            })} */}
          </Grid>
          <Grid container direction="row" sx={{display: "flex",
    justifyContent: "space-between",
    width: "100%"}}>
            <Item sx={{ width: 90, height: 40 }}>CAPSLOCK</Item>
            <Item sx={{ width: 45, height: 40 }}>A</Item>
            <Item sx={{ width: 45, height: 40 }}>S</Item>
            <Item sx={{ width: 45, height: 40 }}>D</Item>
            <Item sx={{ width: 45, height: 40 }}>F</Item>
            <Item sx={{ width: 45, height: 40 }}>G</Item>
            <Item sx={{ width: 45, height: 40 }}>H</Item>
            <Item sx={{ width: 45, height: 40 }}>J</Item>
            <Item sx={{ width: 45, height: 40 }}>K</Item>
            <Item sx={{ width: 45, height: 40 }}>L</Item>
            <Item sx={{ width: 45, height: 40 }}>Ş</Item>
            <Item sx={{ width: 45, height: 40 }}>İ</Item>
            {/*  {keyboardthird.map(function (d, idx) {
              return (
                <Item sx={{ width: 40, height: 40 }} key={idx}>
                  {d.value}
                </Item>
              );
            })} */}
          </Grid>
          <Grid container direction="row">
            <Item sx={{ width: 42, height: 40 }}>_</Item>
            <Item sx={{ width: 42, height: 40 }}>Z</Item>
            <Item sx={{ width: 42, height: 40 }}>X</Item>
            <Item sx={{ width: 42, height: 40 }}>C</Item>
            <Item sx={{ width: 42, height: 40 }}>V</Item>
            <Item sx={{ width: 42, height: 40 }}>B</Item>
            <Item sx={{ width: 42, height: 40 }}>N</Item>
            <Item sx={{ width: 42, height: 40 }}>M</Item>
            <Item sx={{ width: 42, height: 40 }}>Ö</Item>
            <Item sx={{ width: 42, height: 40 }}>Ç</Item>
            <Item sx={{ width: 42, height: 40 }}>.</Item>
            <Item sx={{ width: 42, height: 40 }}>,</Item>
            <Item sx={{ width: 42, height: 40 }}>*</Item>
            {/*  {keyboardfourth.map(function (d, idx) {
              return (
                <Item key={idx} sx={{ width: 40, height: 40 }}>
                  {d.value}
                </Item>
              );
            })}  */}
          </Grid>
          <Grid container direction="row">
            {keyboardfifth.map(function (d, idx) {
              return (
                <Item key={idx} value={d.value} sx={{ width: 950, height: 40 }}>
                  {d.value}
                </Item>
              );
            })}
          </Grid>
        </Item>
      </Box>
    </div>
  );
}
