import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, fontSize } from "@mui/system";
import List from "../components/List";
import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TerminlList from "./TerminlList";
import MenuItem from "@mui/material/MenuItem";
import Pointer from "./Pointer";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Svg2(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/JsonFiles/MaviKutu.json")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  }, []);

  function HandleClicksvg(event, color) {
    props.onClick(event, color);
    setGoster(!goster);
  }

  const [goster, setGoster] = useState(false);
  const [gostersvg, setGostersvg] = useState(true);
  const [gosterpointer, setGosterpointer] = useState(false);
  const [listdata, setListdata] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/MaviKutu.json")
      .then((res) => {
        console.log(res.data.data);
        setListdata(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [selectedOption, setSelectedOption] = useState("");

  function handleChange(event) {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setGoster(!goster);
    setGostersvg(!gostersvg);
    setGosterpointer(!gosterpointer);
    props.onMenuSelect();
  }
  console.log(selectedOption);
  useEffect(() => {
    props.GetDataValue(selectedOption);
  });

  const arr = data.map((item) =>
    item.defectButtonRecords.map((subitem) => (
      <rect
        key={subitem.buttonId}
        x={subitem.boxX}
        y={subitem.boxY}
        fill="transparent"
        onClick={HandleClicksvg}
        width={subitem.boxWidth}
        height={subitem.boxHeight}
        stroke={subitem.boxColor}
        strokeWidth={4}
      />
    ))
  );
  const arr2 = data.map((item) =>
    item.defectButtonRecords.map((subitem) => (
      <foreignObject
        x={subitem.boxX}
        y={subitem.boxY}
        width={subitem.boxWidth - 5}
        height={subitem.boxHeight / 2}
      >
        <div style={{ backgroundColor: "white" }}>
          <text style={{ fill: subitem.labelColor, fontSize: 13 }}>
            {subitem.labelText}
          </text>
        </div>
      </foreignObject>
    ))
  );
  const arrlist = listdata.map((data, index) => {
    return (
      <Grid key={index}>
        {data.partDefects.map((subitem, i) => {
          return (
            <MenuItem
              key={i}
              value={subitem.defectName}
              onClick={handleChange}
              sx={{
                minWidth: 200,
                borderBottom: 1,
                backgroundColor: " #c6ffc8",
              }}
            >
              {subitem.defectName}
            </MenuItem>
          );
        })}
      </Grid>
    );
  });
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  function changePointer(e) {
    setX(e.clientX);
    setY(e.clientY);
  }
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll(direction) {
    const scrollStep = 50;
    const box = document.getElementById("scrollable-box");
    if (box) {
      if (direction === "up") {
        setScrollPosition(Math.max(scrollPosition - scrollStep, 0));
        box.scrollTop = Math.max(box.scrollTop - scrollStep, 0);
      } else if (direction === "down") {
        setScrollPosition(Math.min(scrollPosition + scrollStep, box.scrollHeight - box.clientHeight));
        box.scrollTop = Math.min(box.scrollTop + scrollStep, box.scrollHeight - box.clientHeight);
      }
    }
  }
  return (
    <div>
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        onClick={changePointer}
      >
        <image href="car3.jpg" />

        {gostersvg && (
          <>
            {arr}
            {arr2}
          </>
        )}

        {gosterpointer && (
          <>
            <svg>
              <circle cx={x} cy={y} r="10" fill="red" />
            </svg>
          </>
        )}
      </svg>
      <Grid sx={{ position: "absolute", top: 150, left: 600, zIndex: 999 }}>
        {goster && (
          <div>
            <Grid container>
              <Grid item xs={8}>
                <Box
                id="scrollable-box"
                value={selectedOption}
                onChange={handleChange}
                  container
                  sx={{
                    justifyContent: "space-evenly",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    maxHeight: "300px",
                  }}
                >
                  {arrlist}
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Button onClick={() => handleScroll("up")}><KeyboardArrowUpIcon/></Button>
                <Button onClick={() => handleScroll("down")}><KeyboardArrowDownIcon/></Button>
              </Grid>
            </Grid>
          </div>
        )}
      </Grid>
    </div>
  );
}
