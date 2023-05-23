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
  const [top, setTop] = useState("");
  const [left, setLeft] = useState("");
  useEffect(() => {
    axios
      .get("/JsonFiles/MaviKutu.json")
      .then((response) => {
        setData(response.data.data);
        setTop(
          response.data.data[0].defectButtonRecords[0].boxY +
            response.data.data[0].defectButtonRecords[0].boxWidth
        );
        setLeft(
          response.data.data[0].defectButtonRecords[0].boxX +
            response.data.data[0].defectButtonRecords[0].boxWidth
        );
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
  const arr3 = data.map((item) =>
    item.defectButtonRecords.map((subitem, index) =>
      subitem.lineX !== -100 ? (
        <line
          key={index}
          x1={subitem.boxX + subitem.boxWidth / 2}
          y1={subitem.boxY + subitem.boxHeight / 2}
          x2={subitem.lineX}
          y2={subitem.lineY}
          stroke="red"
        />
      ) : null
    )
  );
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
  const arr4 = (
   
        <div>
          
            <Grid
              id="selectbox"
              sx={{
                position: "absolute",
                top: "8vw",
                left: "30vw",
                zIndex: 999,
                width: "20vw",
              }}
            >
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
                    <Button
                      sx={{
                        backgroundColor: "#c6ffc8",
                        width: "100%",
                        border: 1,
                        borderColor: "black",
                        height: "17%",
                      }}
                      onClick={() => handleScroll("up")}
                    >
                      <KeyboardArrowUpIcon sx={{ color: "black" }} />
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#c6ffc8",
                        width: "100%",
                        border: 1,
                        borderColor: "black",
                        height: "17%",
                      }}
                      onClick={() => handleScroll("down")}
                    >
                      <KeyboardArrowDownIcon sx={{ color: "black" }} />
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
        </div>
  );
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
  const calculateNewPath = () => {
    const newPath = `M${clickedCoords.x} ${clickedCoords.y} L${
      clickedCoords.x + 25
    } ${60 + clickedCoords.y} L${-2 + clickedCoords.x} ${
      clickedCoords.y + 70
    } Z`;
    return newPath;
  };
  return (
    <div>
      <Grid>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          onClick={handleClick}
        >
          <image href="car2.jpg" />
          
          {gostersvg && (
            <>
              {arr}
              {arr2}
              {arr3}
            </>
          )}

          {gosterpointer && (
            <svg>
              <path
                d={calculateNewPath()}
                fill="#9cff9f"
                stroke="#7aff7f"
                strokeWidth="2"
              />
            </svg>
          )}
        </svg>
        {goster && (
            <>
            {arr4}
            </>
            

          )}
      </Grid>
    </div>
  );
}
