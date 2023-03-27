import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { DataGridPro } from "@mui/x-data-grid-pro";
import SaveAction from "./SaveAction";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@mui/material/styles";

export default function DataGridHata() {
  const [rowId, setRowId] = useState(null);
  const [nrReasonList, setNr] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3006/nrReasonList")
      .then((rest) => {
        console.log(rest.nrReasonList);
        setNr(rest.nrReasonList);
      })
      .catch((err) => console.log(err));
  }, []);

  const headers = useMemo(() => [
    {
      field: "depCode",
      headerName: "Bildiren",
      width: 70,
      headerAlign: "center",
    },
    { field: "bodyNo", headerName: "body", width: 70, headerAlign: "center" },
    { field: "assyNo", headerName: "Assy", width: 30, headerAlign: "center" },
    { field: "vinNo", headerName: "Vin No", width: 110, headerAlign: "center" },
    {
      field: "colorExtCode",
      headerName: "Renk",
      width: 70,
      headerAlign: "center",
    },
    { field: "modelCode", headerName: "Mdl", width: 70 },
    { field: "localId", headerName: "Sicil", width: 70 },
    { field: "part", headerName: "Parça", width: 70 },
    { field: "spotId", headerName: "Spot", width: 30 },
    { field: "gun", headerName: "Gun", width: 30 },
    { field: "arc", headerName: "Arc", width: 30 },
    { field: "arcgun", headerName: "Arc Gun", width: 30 },
    { field: "defectName", headerName: "Hata", width: 90 },
    { field: "rank", headerName: "Rank", width: 70 },
    { field: "formattedDefectHour", headerName: "Saat", width: 70 },
    { field: "defectType", headerName: "Hata Turu", width: 90 },
    { field: "defrespName", headerName: "Hata Sor", width: 70 },
    { field: "altsorumlu", headerName: "Alt Sorumlu", width: 90  },
    {
      field: "nrreason",
      headerName: "NR REASON",
      width: 110,
      renderCell: (cellValues) => {
        return (
          <FormControl fullWidth>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      width: 60,
      field: "kaydet",
      renderCell: (cellValues) => {
        return <Button>KAYDET</Button>;
      },
    },
    {
      field: "islem",
      renderCell: (cellValues) => {
        return <Button>DÜZENLE</Button>;
      },
      renderCell: (cellValues) => {
        return <Button>SİL</Button>;
      },
    },
    
  ]);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3002/data")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const rows = data.map((row) => {
    return {
      id: row.localId,
      depCode: row.depCode,
      bodyNo: row.bodyNo,
      assyNo: row.assyNo,
      vinNo: row.vinNo,
      colorExtCode: row.colorExtCode,
      modelCode: row.modelCode,
      localId: row.localId,
      part: row.part,
      SpotId: row.SpotId,
      gun: row.gun,
      arc: row.arc,
      defectName: row.defectName,
      rank: row.rank,
      formattedDefectHour: row.formattedDefectHour,
      defectType: row.defectType,
      defrespName: row.defrespName,
      altsorumlu: row.altsorumlu,
      nrreason: row.nrreason,
      kaydet: row.kaydet,
      islem: row.islem,
    };
  });


  return (
    <div style={{ height: 550, width: "100%" }}>
     
        <DataGridPro rows={rows} columns={headers} rowHeight={50}  
       />
      
    </div>
  );
}

/* import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
       
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
 
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function DataGridHata() {

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3002/data")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = data.map((data, index) => {
    return (
      <Box
      sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
    >
      <Item >{data.localId}</Item>
      <Item >{data.depCode}</Item>
      <Item>{data.bodyNo}</Item>
      <Item>{data.assyNo}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
      <Item>{data.localId}</Item>
    </Box>
    );
  });


  return (
    <div style={{ width: '100%' }}>
    <Box>
    <Box
        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
      >
        <Item >Item 1</Item>
        <Item >Item 2</Item>
        <Item>Item 3</Item>
        <Item>Item 4</Item>
        <Item>Item 5</Item>
        <Item>Item 6</Item>
        <Item>Item 7</Item>
        <Item>Item 8</Item>
        <Item>Item 9</Item>
        <Item>Item 10</Item>
        <Item>Item 11</Item>
        <Item>Item 12</Item>
        <Item>Item 13</Item>
        <Item>Item 14</Item>
        <Item>Item 15</Item>
        <Item>Item 16</Item>
        <Item>Item 17</Item>
        <Item>Item 18</Item>
        <Item>Item 19</Item>
        <Item>Item 20</Item>
        <Item>Item 21</Item>
        
      </Box>
      {arr}
    </Box>
    
    </div>
  );
} */
