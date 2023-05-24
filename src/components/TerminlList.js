import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";

export default function TerminlList(props) {
  const [selectedName, setSelectedName] = useState("");

  function handleChange(event, termName) {
    closelist();
    props.sendMontajNo(event.target.value);
    setSelectedName(termName);
  }
  const [goster, setGoster] = useState(true);
  function closelist() {
    setGoster(false);
  }
  const openTermlist = (event) => {
    setGoster(true);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/LoginList.json")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
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
  const arr = data.map((data, index) => {
    return (
      <MenuItem
        key={index}
        value={data.termId}
        onClick={(event) => handleChange(event, data.termName)}
        sx={{ minWidth: 300, backgroundColor: " #c6ffc8" }}
      >
        {data.termName}
      </MenuItem>
    );
  });
  return (
    <>
      <Grid
        container
        sx={{
          borderColor:"grey",
          height: "55px",
          minWidth: "100%",
          alignContent:"center",
          alignItems:"center",
          
        }}
        onClick={openTermlist}
      >
        <Grid item xs={11} sx={{position:"relative",
          left:"1vw",}}>
          <Typography>{selectedName} </Typography>
        </Grid>
        <Grid item xs={1}>
          <KeyboardArrowDownIcon sx={{color:"#98C49A"}} />
        </Grid>
      </Grid>
      {goster && (
        <Grid sx={{ position: "absolute", top: 65, zIndex: 999 }}>
          <Grid container>
            <Grid item>
              <Box
                id="scrollable-box"
                container="true"
                sx={{
                  minWidth: "100%",
                  justifyContent: "space-evenly",
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "400px",
                  background: "#c6ffc8",
                  width: "32.8vw",
                }}
              >
                {arr}
              </Box>
            </Grid>
            <Grid item>
              <Grid sx={{width:"6vw",height:"7vh",border:1,borderRadius:1,borderColor:"#98C49A"}}>
                <Button onClick={() => handleScroll("up")} sx={{width:"6vw",height:"7vh"}}>
                  <KeyboardArrowUpIcon sx={{color:"black"}}  />
                </Button>
              </Grid>
              <Grid sx={{width:"6vw",height:"7vh",border:1,borderRadius:1,borderColor:"#98C49A",justifyContent:"center"}}>
                <Button onClick={() => handleScroll("down")}sx={{width:"6vw",height:"7vh"}} >
                  <KeyboardArrowDownIcon sx={{color:"black"}} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
