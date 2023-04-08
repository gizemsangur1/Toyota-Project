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
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        minWidth: 10,
        minHeight: 10,
        border: 1,
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

export default function BoxItem() {
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
    { headerName: "Vin No", columnName: "vinNo", Width: "8vw" },
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
    { headerName: "Parça", columnName: "description", Width: "14vw" },
    { headerName: "Spot", columnName: "spotId", Width: "3vw" },
    { headerName: "Gun", columnName: "spotgunId", Width: "2.5vw" },
    { headerName: "Arc", columnName: "arcnutboltId", Width: "2.5vw" },
    { headerName: "Arc Gun", columnName: "arcnutboltgunId", Width: "3vw" },
    {
      headerName: "Hata",
      columnName: "defectName",
      Width: "9vw",
      alignment: "left",
    },
    { headerName: "Rank", columnName: "depCode", Width: "3vw" },
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
      Width: "5vw",
      alignment: "left",
    },
    { headerName: "Alt Sorumlu", columnName: "depCode", Width: "5vw" },
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
      Width: "7vw",
    },
  ];
  const arr2 = headers.map((header) => {
    return (
      <Grid
        item
        sx={{ padding: 1, border: 1, textAlign: "center", width: header.Width }}
      >
        {header.headerName}
      </Grid>
    );
  });
  const arr3 = {};
  const arr = data.map((dataItem, dataIndex) => {
    return (
      <Grid
        container
        direction="row"
        key={dataIndex}
        sx={{ height: 40, textAlign: "center" }}
      >
        {headers.map((header, index) => {
          if (header.headerName == "kaydet") {
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
                    maxwidth: "3vw",
                    minWidth: "3vw",
                    textAlign: header.alignment,
                  }}
                  size="small"
                >
                  <Save />
                </Button>
              </Grid>
            );
          } else if (header.headerName == "islem") {
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
                    maxwidth: "3vw",
                    minWidth: "3vw",

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
                    maxwidth: "3vw",
                    minWidth: "3vw",

                    color: "white",
                    textAlign: header.alignment,
                  }}
                  size="small"
                >
                  <Delete />
                </Button>
              </Grid>
            );
          } else if (header.headerName == "Renk") {
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
                <Grid
                  sx={{
                    borderRadius: 2,
                    backgroundColor: dataItem.rgbCode,
                    fontSize: "0.7vw",
                  }}
                >
                  {dataItem[header.columnName]}
                </Grid>
              </Grid>
            );
          } else if (header.headerName == "NR REASON") {
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
                <Grid
                  sx={{
                    fontSize: "0.7vw",
                  }}
                >
                  <FormControl>
                    <Select
                      sx={{
                        minWidth: "6vw",
                        maxWidth: "6vw",
                        minHeight: "2vw",
                        maxHeight: "2vw",
                      }}
                      value={option}
                      label={data.nrReasonId}
                      onChange={handleChange}
                    >
                      {nrlist.map((option, i) => {
                        return (
                          <MenuItem key={i} value={data.nrReasonId}>
                            {option.nrReasonAbb}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            );
          } else {
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
                <Typography sx={{ fontSize: "0.7vw" }}>
                  {dataItem[header.columnName]}
                </Typography>
              </Grid>
            );
          }
        })}
      </Grid>
    );
  });

  return (
    <div>
      <Box container>
        <Box
          container
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
        <Box
          container
          sx={{
            justifyContent: "space-evenly",
            overflowY: "scroll",
            overflowX: "hidden",
            maxHeight: "600px",
          }}
        >
          {arr}
        </Box>
        <Box id="footer"></Box>
      </Box>
    </div>
  );
}
