import React, { useState, useRef, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import axios from "axios";
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        minWidth: 10,
        minHeight: 10,
        margin: 0.5,
        fontSize: "0.875vw",
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

  const [shift, setShift] = useState(false);

  /*KEYBOARD*/

  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = (value) => {
    if (value === "LNG") {
      setCounter((counter + 1) % Object.keys(language).length);
    }
    else if (value === "BACKSPACE") {
      props.setInputValue(inputValue.slice(0, inputValue.length-1));
    }else if(value==="SPACE"){
      props.setInputValue((inputValue) => inputValue + value);
    }
     else {
      props.setInputValue((inputValue) => inputValue + value);
    }
    
  }; 


  return (
    <div>
   
      <Grid container sx={{ border: 1 }}>
        {language.map((row) => (
          <Grid
            container
            flexDirection="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {row.map((key) => (
              <Item key={key.value} flexDirection="row">
                <Button
                  sx={{ border: 1, borderRadius: 1 }}
                  key={key.value}
                  onClick={() => handleButtonClick(key.value)}
                >
                  {key.value}
                </Button>
              </Item>
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
          }}
        >
          <Item flexDirection="row">
            <Button
              sx={{ border: 1, borderRadius: 1 }}
              onClick={() => handleButtonClick(" ")} 
            >
              SPACE
            </Button>
          </Item>
        </Grid>
      </Grid>
      
    </div>
  );
}






