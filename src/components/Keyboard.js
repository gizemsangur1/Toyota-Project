import React, { useState, useEffect } from "react";
import {  Grid } from "@mui/material";
import axios from "axios";
import LanguageIcon from "@mui/icons-material/Language";

export default function Keyboard(props) {
  const [language, setLanguage] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    axios
      .get("/JsonFiles/Languages.json")
      .then((res) => {
        setLanguage(res.data[Object.keys(res.data)[counter]]);
      })
      .catch((err) => console.log(err));
  }, [counter]);

  const [inputValue, setInputValue] = useState("");
  const [shifted, setShifted] = useState("");
  const handleButtonClick = (value) => {
    if (value === "LNG") {
      setCounter((counter + 1) % Object.keys(language).length);
    } else if (value === "BACKSPACE") {
      props.setInputValue(inputValue.slice(0, inputValue.length - 1));
    } else if (value === "SPACE") {
      props.setInputValue((inputValue) => inputValue + value);
    } else if (value === "Capslock") {
      setShifted(!shifted); // toggle shifted state
    } else {
      const newValue = shifted ? value.toUpperCase() : value.toLowerCase();
      props.setInputValue((inputValue) => inputValue + newValue);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setButtonWidth(window.innerWidth < 600 ? "20px" : "50px");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [buttonWidth, setButtonWidth] = useState("50px");
  return (
    <div>
      <Grid container sx={{ border: 1, backgroundColor: "#d9dedc",height:"45vh"}}>
        {language.map((row,index) => (
          <Grid
          key={index}
            container
            flexDirection="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              
            }}
          >
            {row.map((key) => (
              <button 
                style={{ border: 1, borderRadius:5, marginTop:0.5,height:"7vh", width: key.value==="BACKSPACE"?"7vw" :"5vw",textAlign:"center",justifyContent: "center",backgroundColor:"whitesmoke" }}
                key={key.value}
                onClick={() => handleButtonClick(key.value)}
              >
                {key.value === "LNG" && <LanguageIcon />}
                <span
                  style={{ display: key.value === "LNG" ? "none" : "inline" }}
                >
                  {key.value}
                </span>
              </button>
            ))}
          </Grid>
        ))}
        <Grid
          container
          flexDirection="row"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "${100 / language[0].length}%",
          }}
        >
          <button
            style={{ border: 1, borderRadius: 5,width:"90%",height:"5vh" ,textAlign:"center",justifyContent: "center",backgroundColor:"whitesmoke"}}
            onClick={() => handleButtonClick(" ")}
          >
            SPACE
          </button>
        </Grid>
      </Grid>
    </div>
  );
}
