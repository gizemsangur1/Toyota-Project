import { Box, Button, Grid,Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { toast } from "react-toastify";
import { Virtuoso } from "react-virtuoso";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation  } from "react-i18next";
toast.configure();
export default function Hatalistesi(props) {
  const{t,i18n}=useTranslation();
  const filterText1=props.filterText1;
  const filterText2=props.filterText2;
  const [data, setData] = useState([]);
  const [nrlist, setNrlist] = useState([]);
  

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
      rgbcode: "rgbCode",
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
      nrId: "nrReasonId",
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

  const arr2 = headers.map((header, i) => {
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

  const sortedData = data.sort((a, b) => a.depCode.localeCompare(b.depCode));
  const filterByBodyNo = (item) => item.bodyNo.toString().includes(filterText1.toLowerCase());

const filterByLocalId = (item) => item.localId.toString().includes(filterText2.toLowerCase());

const filteredData = sortedData.filter((item) => filterByBodyNo(item) && filterByLocalId(item));
  const handleDelete = (index) => {
    console.log(index)
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };
  const notifyMe = () => {
    toast.success("Kaydedildi!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <div>
      <Box container="true" sx={{ border: 1, borderRadius: 1 }}>
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
          style={{ height: "500px", fontSize: "1vw" }}
          totalCount={data.length}
          id="my-grid"
          itemContent={(index) => {
            const dataItem = filteredData[index];
            if (!dataItem) {
              return null;
            }

            return (
              <Grid
                container
                direction="row"
                key={index}
                sx={{ textAlign: "center" }}
              >
                {headers.map((header, i) => {
                  if (header.headerName === "kaydet") {
                    return (
                      <Grid
                        item
                        key={i}
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
                          onClick={notifyMe}
                        >
                          <Save />
                        </Button>
                      </Grid>
                    );
                  } else if (header.headerName === "islem") {
                    return (
                      <Grid
                        item
                        key={i}
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
                          onClick={() => handleDelete(index)}
                        >
                          <Delete />
                        </Button>
                      </Grid>
                    );
                  } else if (header.headerName === "NR REASON") {
                    return (
                      <Grid
                        item
                        key={i}
                        sx={{
                          border: 1,
                          width: header.Width,
                          textAlign: header.alignment,
                        }}
                      >
                        <select style={{width:"6.5vw"}}>
                          <option 
                          id="selected"
                            value={
                              dataItem.nrReasonId === 0
                                ? " "
                                : nrlist.find(
                                    (nr) => nr.nrId === dataItem.nrReasonId
                                  ).nrReasonAbb
                            }
                          >
                            {dataItem.nrReasonId === 0
                              ? ""
                              : nrlist.find(
                                  (nr) => nr.nrId === dataItem.nrReasonId
                                ).nrReasonAbb}
                          </option>
                          {nrlist.map((d, i) => {
                           if (d.nrId !== dataItem.nrReasonId) { 
                            return <option key={i}>{d.nrReasonAbb}</option>;
                          }
                          })}
                        </select>
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
                          backgroundColor:
                            header.headerName === "Renk"
                              ? dataItem[header.rgbcode]
                              : "inherit",
                          color:
                            header.headerName === "Renk" &&
                            dataItem[header.rgbcode] === "#000000"
                              ? "white"
                              : "inherit",
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
}
