import { React, useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
export default function Svg2(props) {
  const [clickedCoordinates, setClickedCoordinates] = useState([]);

  useEffect(() => {
    if (props.clickedCoordinates) {
      setClickedCoordinates(props.clickedCoordinates);
    }
  }, [props.clickedCoordinates]);
  const dispatch = useDispatch();
  const termname = useSelector((state) => state.termname);
  function handleFormChange(event, termname) {
    setSelectedName(termname);
    dispatch({
      type: "SET_TERMNAME",
      termname: termname,
    });
    setGoster(!goster);
    setGostersvg(!gostersvg);
    setGosterpointer(!gosterpointer);
    props.onMenuSelect();
  }

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

  const [selectedName, setSelectedName] = useState("");
  const [goster, setGoster] = useState(false);
  const [gostersvg, setGostersvg] = useState(true);
  const [gosterpointer, setGosterpointer] = useState(false);

  const [listdata, setListdata] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/MaviKutu.json")
      .then((res) => {
        setListdata(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = data.map((item) =>
    item.defectButtonRecords.map((subitem) => (
      <rect
        id="myrect"
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

  const arr2 = data.map((item, i) =>
    item.defectButtonRecords.map((subitem) => (
      
      <foreignObject
        key={i}
        x={subitem.boxX}
        y={subitem.boxY}
        width={subitem.boxWidth - 5}
        height={subitem.boxHeight / 2}
      >
        <div style={{ backgroundColor: "white" }}>
          <Typography style={{ fill: subitem.labelColor, fontSize: 13 }}>
            {subitem.labelText}
          </Typography>
        </div>
      </foreignObject>
    ))
  );
  const lines = clickedCoordinates.map((coord, i) => {
    if (i-1 === 0) {
      return null;
    }
    return <line key={i} x1={477} y1={112} x2={coord.x} y2={coord.y} stroke="red" />;
  });
  const arrlist = listdata.map((data, index) => {
    return (
      <Grid key={index}>
        {data.partDefects.map((subitem, i) => {
          return (
            <MenuItem
              key={i}
              value={subitem.defectName}
              onClick={(event) => handleFormChange(event, subitem.defectName)}
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
  
  const [clickedCoords, setClickedCoords] = useState([]);
  const [x1, setX1] = useState(null);
  const [y1, setY1] = useState(null);

  function handleClick(e) {
    const svg = e.currentTarget;
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());

    setClickedCoords({ x, y });
    setX1(x);
    setY1(y);

    dispatch({
      type: "SET_COORD",
      coord: { x, y },
    });
    props.onClick(clickedCoords);
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
        setScrollPosition(
          Math.min(
            scrollPosition + scrollStep,
            box.scrollHeight - box.clientHeight
          )
        );
        box.scrollTop = Math.min(
          box.scrollTop + scrollStep,
          box.scrollHeight - box.clientHeight
        );
      }
    }
  }
  return (
    <div>
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        onClick={handleClick}
      >
        <image href="car2.jpg" />

        {gostersvg && (
          <>
            {arr}
            {arr2}
            {lines}
          </>
        )}

        {gosterpointer && (
          <>
            <svg>
              <circle
                cx={clickedCoords.x}
                cy={clickedCoords.y}
                r="10"
                fill="red"
              />
              {lines}
            </svg>
          </>
        )}
      </svg>
      <Grid
        sx={{
          position: "absolute",
          top: " 23vh",
          left: " 40vw",
          zIndex: 999,
          width: "20vw",
        }}
      >
        {goster && (
          <div>
            <Grid container>
              <Grid item xs={8}>
                <Box
                  id="scrollable-box"
                  value={selectedName}
                  onChange={handleFormChange}
                  container="true"
                  sx={{
                    
                    overflowY: "scroll",
                    overflowX: "hidden",
                    maxHeight: "40vh",
                  }}
                >
                  {arrlist}
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Button  sx={{backgroundColor:"#c6ffc8",width:"100%",border:1,borderColor:"black",height:"17%"}} onClick={() => handleScroll("up")}>
                  <KeyboardArrowUpIcon sx={{color:"black"}}/>
                </Button>
                <Button sx={{backgroundColor:"#c6ffc8",width:"100%",border:1,borderColor:"black",height:"17%"}} onClick={() => handleScroll("down")}>
                  <KeyboardArrowDownIcon sx={{color:"black"}} />
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
      </Grid>
    </div>
  );
}
