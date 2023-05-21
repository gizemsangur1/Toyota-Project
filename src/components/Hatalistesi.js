import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { toast } from "react-toastify";
import { Virtuoso } from "react-virtuoso";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
toast.configure();
export default function Hatalistesi(props) {
  const { t, i18n } = useTranslation();
  const filterText1 = props.filterText1;
  const filterText2 = props.filterText2;
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
    { headerName: "Body", columnName: "bodyNo", Width: "3vw" },
    { headerName: "Assy", columnName: "assyNo", Width: "2.5vw" },
    { headerName: "Vin No", columnName: "vinNo", Width: "11vw" },
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
    },
    {
      headerName: "Sicil",
      columnName: "localId",
      Width: "3vw",
    },
    { headerName: "Parça", columnName: "description", Width: "12vw" },
    { headerName: "Spot", columnName: "spotId", Width: "3vw" },
    { headerName: "Gun", columnName: "spotgunId", Width: "3vw" },
    { headerName: "Arc", columnName: "arcnutboltId", Width: "2.5vw" },
    { headerName: "ArcGun", columnName: "arcnutboltgunId", Width: "4vw" },
    {
      headerName: "Hata",
      columnName: "defectName",
      Width: "8vw",
    },
    { headerName: "Rank", columnName: "defrankCode", Width: "3vw" },
    {
      headerName: "Saat",
      columnName: "formattedDefectHour",
      Width: "4vw",
    },
    { headerName: "Hata Turu", columnName: "defectType", Width: "3vw" },
    {
      headerName: "Hata Sor",
      columnName: "defrespName",
      Width: "4.5vw",
    },
    {
      headerName: "Alt Sorumlu",
      columnName: "defrespCode",
      Width: "5vw",
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
        sx={{
          padding: 1,
          border: 1,
          textAlign: "center",
          width: header.Width,
          fontSize: "1vw",
        }}
      >
        {header.headerName}
      </Grid>
    );
  });

  const sortedData = data.sort((a, b) => a.depCode.localeCompare(b.depCode));
  const filterByBodyNo = (item) =>
    item.bodyNo.toString().includes(filterText1.toLowerCase());

  const filterByLocalId = (item) =>
    item.localId.toString().includes(filterText2.toLowerCase());

  const filteredData = sortedData.filter(
    (item) => filterByBodyNo(item) && filterByLocalId(item)
  );

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      const newData = [...filteredData];
      newData.splice(index, 1);
      setData(newData);
    }
  };

  const notifyMe = () => {
    toast.success("Kaydedildi!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSave = (index, selectedValue) => {
    const newData = [...filteredData];
    if (newData[index]) {
      newData[index].nrReasonId = selectedValue;
      setData(newData);
      notifyMe(); 
    }
  };
  const [indexv,setIndexv]=useState("")
  const [selectedValue,setSelectedValue]=useState("")
  const handleValues = (index, value) => {
    setIndexv(index);
    setSelectedValue(value);
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
          style={{ height: "450px", fontSize: "1vw" }}
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
                          textAlign: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            backgroundColor: "black",
                            color: "white",
                            width: "auto",
                            height: "auto",
                            minWidth: "0.2vw",
                            minHeight: "0.2vh",
                            textAlign: "center",
                          }}
                          size="small"
                          onClick={(e) => handleSave(indexv,selectedValue)}
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
                          textAlign: "center",
                        }}
                      >
                        <Button
                          sx={{
                            border: 1,
                            backgroundColor: "red",
                            color: "white",
                            width: "auto",
                            height: "auto",
                            minWidth: "1vw",
                            minHeight: "1vh",
                            textAlign: "center",
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
                            width: "auto",
                            height: "auto",
                            minWidth: "1vw",
                            minHeight: "1vh",
                            color: "white",
                            textAlign: "center",
                          }}
                          size="small"
                          onClick={() => handleDelete(index)}
                        >
                          <Delete />
                        </Button>
                      </Grid>
                    );
                  } else if (header.headerName === "NR REASON") {
                    const selectedValue = dataItem.nrReasonId;
                    const selectedNrReason = nrlist.find(
                      (nr) => nr.nrId === selectedValue
                    );

                    return (
                      <Grid
                        item
                        key={i}
                        sx={{
                          border: 1,
                          width: header.Width,
                          textAlign: "center",
                        }}
                      >
                        <select
                          style={{ width: "6.5vw" }}
                          value={selectedValue}
                          onChange={(e) => handleValues(index, e.target.value)}
                        >
                          <option value="">
                            {selectedNrReason
                              ? selectedNrReason.nrReasonAbb
                              : ""}
                          </option>
                          {nrlist.map((d, i) => {
                            if (d.nrId !== selectedValue) {
                              return (
                                <option key={i} value={d.nrId}>
                                  {d.nrReasonAbb}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </Grid>
                    );
                  } else if (header.headerName === "Renk") {
                    return (
                      <Grid
                        item
                        sx={{
                          border: 1,
                          width: header.Width,
                          textAlign: "center",
                        }}
                        key={header.columnName}
                      >
                        <Grid
                          item
                          sx={{
                            border: 1,
                            borderRadius: 1,
                            margin: 0.4,
                            height: "65%",
                            position: "relative",
                            top: "15%",
                            textAlign: "center",
                            justifyContent: "center",
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
                        >
                          {dataItem[header.columnName]}
                        </Grid>
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid
                        item
                        sx={{
                          border: 1,
                          width: header.Width,
                          textAlign: "center",
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
