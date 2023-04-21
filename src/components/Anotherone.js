import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { toast } from "react-toastify";
import { Virtuoso } from "react-virtuoso";
import "react-toastify/dist/ReactToastify.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import 'ag-grid-community/styles/ag-theme-alpine.css';
export default function Anotherone() {
  const [data, setData] = useState([]);
  const [nrlist, setNrlist] = useState([]);
  const [option, setOption] = React.useState("");

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  useEffect(() => {
    axios
      .get("/JsonFiles/HataListesi2.json")
      .then((res) => {
        const filteredData = res.data.data[0].defectList.map((item) => ({
          Bildiren: item.depCode,
          body: item.bodyNo,
          Assy: item.assyNo,
          VinNo:item.vinNo,
          Renk:item.colorExtCode,
          Mdl:item.modelCode,
          Sicil:item.localId,
          Parça:item.description,
          Spot:item.spotId,
          Gun:item.spotgunId,
          Arc:item.arcnutboltId,
          ArcGun:item.arcnutboltgunId,
          Hata:item.defectName,
          Rank:item.defrankCode,
          Saat:item.formattedDefectHour,
          HataTuru:item.defectType,
          HataSor:item.defrespName,
          AltSorumlu:item.defrespCode,
          

        }));
        setData(filteredData);
        setNrlist(res.data.data[0].nrReasonList);
      })
      .catch((err) => console.log(err));
    setData([]);
  }, []);

  const [headers] =useState( [
    {
      field: "Bildiren",width:70
    },
    { field: "body",width:75},
    { field: "Assy",width:60 },
    { field: "VinNo",width:200 },
    {
      field: "Renk",width:75
    },
    {
      field: "Mdl",width:75
    },
    {
      field: "Sicil",width:75
    },
    { field: "Parça",width:300 },
    { field: "Spot" ,width:75},
    { field: "Gun" ,width:75},
    { field: "Arc",width:60 },
    { field: "ArcGun",width:75,resizeable:false },
    {
      field: "Hata",width:100
    },
    { field: "Rank" ,width:100},
    {
      field: "Saat",width:100
    },
    { field: "HataTuru" ,width:100},
    {
      field: "HataSor",width:100
    },
    {
      field: "AltSorumlu",width:100
    },
    {
      field: "NRREASON",width:100
    },
    {
      field: "kaydet",width:100
    },
    {
      field: "islem",width:100
    },
  ]);
  const [rowData] = useState([
    {make: "Toyota", model: "Celica", price: 35000},
    {make: "Ford", model: "Mondeo", price: 32000},
    {make: "Porsche", model: "Boxster", price: 72000}
]);
  return (
    <div className="ag-theme-alpine" style={{height: 500, width: "100vw"}}>
      <AgGridReact rowData={data} columnDefs={headers}></AgGridReact>
    </div>
  );
}
