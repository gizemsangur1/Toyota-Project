import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, fontSize } from "@mui/system";
import List from "../components/List"
import { Typography } from "@mui/material";
import {Grid} from "@mui/material"
/* Birinci kod */
export default function Svg2(props) {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      axios
        .get("http://localhost:3008/data")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Bir hata oluştu:", error);
        });
    }, []);
  
    function HandleClicksvg(event, color){
        props.onClick(event, color);
        setGoster(!goster);
        
      }
    
      const [goster, setGoster] = useState(false);

  
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
          height={(subitem.boxHeight)/2}
          
        >
          <div style={{ backgroundColor: "white" }}>
            <text  style={{ fill: subitem.labelColor,fontSize:13 }}>{subitem.labelText}</text>
          </div>
          
        </foreignObject>
      ))
    );
  
    return (
      <div>
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none">
          <image href="car3.jpg" />
          {arr}
          {arr2}
          
        </svg>
        <Grid sx={{ position: 'absolute',
        top: 150,
        left: 600,
        zIndex: 999,}}>
        {goster && <div><List /></div>}
        </Grid>
      </div>
    );
  }
