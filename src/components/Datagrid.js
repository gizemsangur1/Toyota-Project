import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { PropTypes } from "prop-types";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: 1,
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",

        fontSize: "0.875rem",
        fontWeight: "700",
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
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function Datagrid() {
  /*  const data = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Bob", age: 35 },
  ]; */
  const [data, setData] = useState([]);
  useEffect(() => {
   
    axios.get("/JsonFiles/HataListesi.json").then((rest) => {
      console.log(rest.data.data);
      const processedData = rest.data.map((item) => ({
        name: item.depCode,
        body: item.bodyNo,
        assy: item.assyNo,
        vin: item.vinNo,
        renk: item.rgbCode,
        mdl: item.depCode,
        sicil: item.spotId,
        parca: item.bodyNo,
        spot: item.bodyNo,
        gun: item.bodyNo,
        arc: item.defectName,
        arcgun: item.bodyNo,
        hata: item.formattedDefectHour,
        rank: item.defectType,
        saat: item.defrespName,
        hataturu: item.bodyNo,
        hatasor: item.bodyNo,
        altosrumlu: item.bodyNo,
       
      }));  
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        headerName: "Bildiren",
        width: 70,
      },
      { headerName: "body", width: 40 },
      { headerName: "Assy", width: 30 },
      { headerName: "Vin No", width: 100 },
      {
        headerName: "Renk",
        width: 50,
      },
      { headerName: "Mdl", width: 50 },
      { headerName: "Sicil", width: 60 },
      { headerName: "Parça", width: 50 },
      { headerName: "Spot", width: 50 },
      { headerName: "Gun", width: 50 },
      { headerName: "Arc", width: 50 },
      { headerName: "Arc Gun", width: 50 },
      { headerName: "Hata", width: 50 },
      { headerName: "Rank", width: 50 },
      { headerName: "Saat", width: 50 },
      { headerName: "Hata Turu", width: 50 },
      { headerName: "Hata Sor", width: 50 },
      { headerName: "Alt Sorumlu", width: 70 },
      {
        headerName: "NR REASON",
        width: 70,
      },
      {
        headerName: "kaydet",
        width: 70,
      },
      {
        headerName: "islem",
        width: 90,
      },
    ],
    []
  );
  const arr = columns.map((column, index) => (
    <Item key={index} sx={{ width: data.width }}>
      {column.headerName}
    </Item>
  ));

  return (
    <Grid container direction="row" className="header-row">
      <Box
        item
        className="header-cell"
        sx={{ padding: 1, display: "inline-flex", minWidth: "100vw" }}
      >
        {arr}
      </Box>
      <Grid container className="data-rows">
        {data.map((row, rowIndex) => (
          <Grid container key={rowIndex} className="data-row">
            {columns.map((column, columnIndex) => (
              <Grid
                item
                key={columnIndex}
                className="data-cell"
                style={{ width: column.width }}
              >
                {row[column.headerName]}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
