import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SVG from 'react-inlinesvg';
export default function Svg(props) {
  const dispatch = useDispatch();
  function handleFormChange(event, color, name) {
    dispatch({
      type: "SET_PARTNAME",
      partname: name,
    });
    props.onClick(event, color);
  }
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/JsonFiles/AracResmi.json")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  }, []);

  const arr = data.map((item) =>
    item.defectButtonRecords.map((subitem, index) => (
      <rect
        key={index}
        x={subitem.boxX}
        y={subitem.boxY}
        fill="transparent"
        onClick={(event) =>
          handleFormChange(event, subitem.boxColor, subitem.labelText)
        }
        width={subitem.boxWidth}
        height={subitem.boxHeight}
        stroke={subitem.boxColor}
        strokeWidth={4}
      />
    ))
  );
  const arr2 = data.map((item) =>
    item.defectButtonRecords.map((subitem, index) => (
      <foreignObject
        key={index}
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

  
  return (
    <div>
       <svg
        width="100%"
        height="100%"
       viewBox="0 0 1000 600"
       preserveAspectRatio="none"
      >
        <image href="car1.jpg"  />
        {arr}
        {arr2}
        {arr3}
      </svg> 
     
    </div>
  );
}
