
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Box } from "@mui/material";

import {  Grid } from "@mui/material";

import { PropTypes } from "prop-types";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
       border:1,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function DataGridHata() {


  const headers = [
    {
      headerName: "Bildiren",
    },
    { headerName: "body" },
    { headerName: "Assy" },
    { headerName: "Vin No" },
    {
      headerName: "Renk",
    },
    { headerName: "Mdl" },
    { headerName: "Sicil" },
    { headerName: "Parça" },
    { headerName: "Spot" },
    { headerName: "Gun" },
    { headerName: "Arc" },
    { headerName: "Arc Gun" },
    { headerName: "Hata" },
    { headerName: "Rank" },
    { headerName: "Saat" },
    { headerName: "Hata Turu" },
    { headerName: "Hata Sor" },
    { headerName: "Alt Sorumlu" },
    {
      headerName: "NR REASON",
    },
    {
      headerName: "kaydet",
    },
    {
      headerName: "islem",
    },
  ];
  const rows = [
    {
      headerName: "depCode",
    },
    { headerName: "bodyNo" },
    { headerName: "assyNo" },
    { headerName: "vinNo" },
    {
      headerName: "rgbCode",
    },
    { headerName: "modelCode" },
    { headerName: "localId" },
    { headerName: "depCode" },
    { headerName: "depCode" },
    { headerName: "depCode" },
    { headerName: "depCode" },
    { headerName: "depCode" },
    { headerName: "defectName" },
    { headerName: "depCode" },
    { headerName: "formattedDefectHour" },
    { headerName: "defectType" },
    { headerName: "defrespName" },
    { headerName: "defrespName" },
    {
      headerName: "defrespName",
    },
    {
      headerName: "defrespName",
    },
    {
      headerName: "defrespName",
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/HataListesi.json")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = headers.map((header) => {
    return (
      <Grid item xs sx={{ padding: 1, border: 1, textAlign: "center" }}>
        {header.headerName}
      </Grid>
    );
  });
  const arr2 = data.map((data) => {
    return (
      <Grid>
       {rows.map((row,index)=>{
        return(
          <Item
         
        >
          {data[row.headerName]}
          </Item>
        )
       })}
      
      </Grid>
    );
  });
  return (
    <div>
      
      <Grid container>
        <Grid container id="header" sx={{
            overflowY: "scroll",
            overflowX: "hidden",
            maxHeight: "600px",

            border: 1,
            backgroundColor: " #c6ffc8",
          }}>
          {" "}
          {arr}{" "}
        </Grid>
        <Box
          container
          id="defectpage"
          sx={{
            flexDirection: 'column',
            display: 'flex',
            border: '1px solid',
            padding:1,
            fontSize: '0.875rem',
            fontWeight: '700',
            justifyContent: 'flex-end',
            overflowY: "scroll",
            overflowX: "hidden",
            maxHeight: "600px",
          }}
        >
          {arr2}
        </Box>
        <Grid id="footer"></Grid>
      </Grid>
    </div>
  );
}
