import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, fontSize } from "@mui/system";
import { Typography } from "@mui/material";

/* Birinci kod */
export default function Svg(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3007/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  }, []);

  function handleClick(event, color){
    props.onClick(event, color);
  }

  const arr = data.map((item) =>
    item.defectButtonRecords.map((subitem) => (
      <rect
        key={subitem.buttonId}
        x={subitem.boxX}
        y={subitem.boxY}
        fill="transparent"
        onClick={(event)=>props.onClick(event, subitem.boxColor)}
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

  return (
    <div>
      <svg viewBox="0 0 1000 600" preserveAspectRatio="none">
        <image href="car1.jpg" />
        {arr}
        {arr2}
      </svg>
    </div>
  );
} 

/* const arr2 = data.map((item) =>
item.defectButtonRecords.map((subitem) => (
  <foreignObject
    x={subitem.boxX}
    y={subitem.boxY}
    width={subitem.boxWidth - 5}
    height={subitem.boxHeight}
  >
    <div style={{ backgroundColor: "white" }}>
     
    </div>
  </foreignObject>
))
); */