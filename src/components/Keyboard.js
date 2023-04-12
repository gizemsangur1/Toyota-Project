import React, { useState, useRef, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        minWidth: 10,
        minHeight: 10,
        margin:0.5,
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
   
  
 
   const handleDelete = () => {
    
   props.onChange(props.input2Value.slice(0, -1));
  }; 

  const handleButtonClick = (value) => {
    if (value === "Backspace") {
       handleDelete(); 
      
    } else {
      props.onChange(props.input2Value + value);
     
    }
  };

  
 
  const turkishkeys = [
    [
      { value: "q" },
      { value: "w" },
      { value: "e" },
      { value: "r" },
      { value: "t" },
      { value: "y" },
      { value: "u" },
      { value: "ı" },
      { value: "o" },
      { value: "p" },
      { value: "ğ" },
      { value: "ü" },
    ],
    [
      { value: "a" },
      { value: "s" },
      { value: "d" },
      { value: "f" },
      { value: "g" },
      { value: "h" },
      { value: "j" },
      { value: "k" },
      { value: "l" },
      { value: "ş" },
      { value: "i" },
    ],
    [
      { value: "z" },
      { value: "x" },
      { value: "c" },
      { value: "v" },
      { value: "b" },
      { value: "n" },
      { value: "m" },
      { value: "ö" },
      { value: "ç" },
    ],
    { value: " ", label: "SPACE" },
    { value: "Backspace", label: "BACKSPACE" },
  ];

  return (
    <div>
 {/* <input type="text" ref={inputRef} value={inputValue} onKeyDown={handleKeyDown} /> */}
     
       <Grid container sx={{border:1}}>
       <Grid
          container
          flexDirection="row"
          sx={{
            
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {turkishkeys[0].map((key) => (
            
              <Item  key={key.value} flexDirection="row">
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
        <Grid
          container
          flexDirection="row"
          sx={{
           
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {turkishkeys[1].map((key) => (
            
              <Item  key={key.value} flexDirection="row">
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
        <Grid
          container
          flexDirection="row"
          sx={{
           
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {turkishkeys[2].map((key) => (
            
              <Item  key={key.value} flexDirection="row">
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
        <Grid
          container
          flexDirection="row"
          sx={{
            
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
         
            
         <Item>
          <Button
            sx={{ border: 1, borderRadius: 1 }}
            onClick={() => handleButtonClick(" ")}
          >
            SPACE
          </Button>
        </Item>
        <Item>
          <Button
            sx={{ border: 1, borderRadius: 1 }}
            onClick={() => handleButtonClick("Backspace")}
          >
            BACKSPACE
          </Button>
        </Item>
           
          
        </Grid>
       </Grid>
      
      
    </div>
  );
}
