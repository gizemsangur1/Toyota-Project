import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState,useMemo } from "react";
import axios from "axios";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { DataGridPro } from "@mui/x-data-grid-pro";
import SaveAction from "./SaveAction";
import { Button } from "@mui/material";

export default function DataGridHata() {
  const [rowId,setRowId]=useState(null)
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
  
  const headers = useMemo(
    ()=>
      [
        {
          field: "depCode",
          headerName: "Bildiren",
          width: 70,
          headerAlign: "center",
        },
        { field: "bodyNo", headerName: "body", width: 70, headerAlign: "center" },
        { field: "assyNo", headerName: "Assy", width: 30, headerAlign: "center" },
        { field: "vinNo", headerName: "Vin No", width: 110, headerAlign: "center" },
        { field: "rgbCode", headerName: "Renk", width: 70, headerAlign: "center" },
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
        { field: "altsorumlu", headerName: "Alt Sorumlu", width: 90 },
        { field: "nrreason", headerName: "NR REASON", width: 110
         
         },
        { field: "kaydet",renderCell:(cellValues)=>{
          return(
            <Button>KAYDET</Button>
          )
        }},
        { field: "islem", renderCell:(cellValues)=>{
          return(
            <Button>DÜZENLE</Button>
          )
         
        },
        renderCell:(cellValues)=>{
          return(
            <Button>SİL</Button>
            
          )
         
        } },
      ]
      
  );

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
      rgbCode: row.rgbCode,
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
      <DataGridPro
        rows={rows}
        columns={headers}
        rowHeight={70}
        
      />
    </div>
  );
}
