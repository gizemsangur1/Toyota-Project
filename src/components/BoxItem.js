import { PropTypes } from "prop-types";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState} from "react";
import axios from "axios";
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Virtuoso } from "react-virtuoso";


export default function BoxItem(props)  {
  const kaydedildi = () => {
    toast.success("Kaydedildi!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
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
        setData(res.data.data[0].defectList);
        setNrlist(res.data.data[0].nrReasonList);
      })
      .catch((err) => console.log(err));
    setData([]);
  }, []);

  const headers = [
    {
      headerName: "Bildiren",
      columnName: "depCode",
      Width: "4vw",
    },
    { headerName: "body", columnName: "bodyNo", Width: "3vw" },
    { headerName: "Assy", columnName: "assyNo", Width: "2.5vw" },
    { headerName: "Vin No", columnName: "vinNo", Width: "10vw" },
    {
      headerName: "Renk",
      columnName: "colorExtCode",
      Width: "3vw",
    },
    {
      headerName: "Mdl",
      columnName: "modelCode",
      Width: "3vw",
      alignment: "left",
    },
    {
      headerName: "Sicil",
      columnName: "localId",
      Width: "3vw",
      alignment: "left",
    },
    { headerName: "Parça", columnName: "description", Width: "12vw" },
    { headerName: "Spot", columnName: "spotId", Width: "3vw" },
    { headerName: "Gun", columnName: "spotgunId", Width: "3vw" },
    { headerName: "Arc", columnName: "arcnutboltId", Width: "2.5vw" },
    { headerName: "Arc Gun", columnName: "arcnutboltgunId", Width: "3vw" },
    {
      headerName: "Hata",
      columnName: "defectName",
      Width: "10vw",
      alignment: "left",
    },
    { headerName: "Rank", columnName: "defrankCode", Width: "3vw" },
    {
      headerName: "Saat",
      columnName: "formattedDefectHour",
      Width: "4vw",
      alignment: "left",
    },
    { headerName: "Hata Turu", columnName: "defectType", Width: "3vw" },
    {
      headerName: "Hata Sor",
      columnName: "defrespName",
      Width: "4.5vw",
      alignment: "left",
    },
    {
      headerName: "Alt Sorumlu",
      columnName: "defrespCode",
      Width: "5vw",
      alignment: "left",
    },
    {
      headerName: "NR REASON",
      Width: "7vw",
    },
    {
      headerName: "kaydet",
      Width: "4vw",
    },
    {
      headerName: "islem",
      Width: "6vw",
    },
  ];
  
  const arr2 = headers.map((header,i) => {
    return (
      <Grid
        item
        key={i}
        sx={{ padding: 1, border: 1, textAlign: "center", width: header.Width }}
      >
        {header.headerName}
      </Grid>
    );
  });
  

  return (
    <div>
      <Box container="true" sx={{border:1,borderRadius:1}}>
        <Box
          container="true"
          id="header"
          sx={{
            justifyContent: "space-evenly",

            backgroundColor: " #c6ffc8",
          }}
        >
          <Grid container direction="row" sx={{ textAlign: "center" }}>
            {arr2}
          </Grid>
        </Box>
        <Virtuoso
          style={{ height: "500px",fontSize:"1vw" }}
          totalCount={data.length}
          id="my-grid"
          itemContent={(index) => {
            
            const dataItem = data[index];
            return (
              <Grid
                container
                direction="row"
                key={index}
                sx={{ textAlign: "center" }}
              
              >
                {headers.map((header, index) => {
                  if (header.headerName === "kaydet") {
                    return (
                      <Grid
                        item
                        key={index}
                        sx={{
                          border: 1,
                          width: header.Width,
                          textAlign: header.alignment,
                        }}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            backgroundColor: "black",
                            fontSize: "0.7vw",
                            color: "white",
                            maxwidth: "2.5vw",
                            minWidth: "2.5vw",
                            textAlign: header.alignment,
                          }}
                          size="small"
                          onClick={kaydedildi}
                        >
                          <Save />
                        </Button>
                      </Grid>
                    );
                  } else if (header.headerName === "islem") {
                    return (
                      <Grid
                        item
                        key={index}
                        sx={{
                          border: 1,
                          width: header.Width,
                          textAlign: header.alignment,
                        }}
                      >
                        <Button
                          sx={{
                            border: 1,
                            backgroundColor: "red",
                            fontSize: "0.7vw",
                            color: "white",
                            maxwidth: "2.5vw",
                            minWidth: "2.5vw",
                            textAlign: header.alignment,
                          }}
                          size="small"
                        >
                          <CreateIcon />
                        </Button>
                        <Button
                          aria-label="delete"
                          sx={{
                            border: 1,
                            backgroundColor: "red",
                            fontSize: "0.7vw",
                            maxwidth: "2.5vw",
                            minWidth: "2.5vw",
                            color: "white",
                            textAlign: header.alignment,
                          }}
                          size="small"
                        >
                          <Delete/>
                        </Button>
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid
                        item
                        sx={{
                          border: 1,
                          width: header.Width,
                          textAlign: header.alignment,
                        }}
                        key={header.columnName}
                      >
                        {dataItem[header.columnName]}
                      </Grid>
                    );
                  }
                })}
              </Grid>
            );
          }}
        />
        <Box id="footer">
          <Typography>Total Rows:{data.length}</Typography>
        </Box>
      </Box>
    </div>
  );
};

