
import { Grid, ListItem } from '@mui/material'
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
export default function HataListeleme() {
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
        
         <TableRow key={data.nrId}>
          <TableCell component="th" scope="row"></TableCell>
          <TableCell align="right">{data.defectList.map((body) => (
              <div>{body.bodyNo}</div>
            ))}</TableCell>
          <TableCell align="right">{data.defectList.map((vin) => (
              <div>{vin.vinNo}</div>
            ))}</TableCell>
          <TableCell align="right">  {data.defectList.map((renk) => (
              <div>{renk.colorExtCode}</div>
            ))}</TableCell>
          <TableCell align="right">   {data.defectList.map((mdl) => (
              <div>{mdl.modelCode}</div>
            ))}</TableCell>
            <TableCell align="right">    {data.defectList.map((sicil) => (
              <div>{sicil.vinNo}</div>
            ))}</TableCell>
            <TableCell align="right">
           
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
        </TableRow>
    );
  })
  return (
    <div>
         <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            
            <TableRow >
            
              <TableCell>Bolum</TableCell>
              <TableCell >Body</TableCell>
              <TableCell >Vin No</TableCell>
              <TableCell >Renk</TableCell>
              <TableCell >Mdl</TableCell>
              <TableCell>Sicil</TableCell>
              <TableCell >Parça</TableCell>
              <TableCell >Spot</TableCell>
              <TableCell >Gun</TableCell>
              <TableCell >Arc</TableCell>
              <TableCell>Arc Gun</TableCell>
              <TableCell >Hata</TableCell>
              <TableCell >Rank</TableCell>
              <TableCell >Saat</TableCell>
              <TableCell >Hata Türü</TableCell>
              <TableCell>Hata Sor</TableCell>
              <TableCell >Alt sorumlu</TableCell>
              <TableCell >NR REASON</TableCell>
              <TableCell >Kaydet</TableCell>
              <TableCell >İslem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {arr}
          </TableBody>
        </Table>
      </TableContainer>     
    </Paper>
    </div>
  )
}