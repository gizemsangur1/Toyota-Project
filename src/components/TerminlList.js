import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ScrollButton from "./ScrollButton";
import Autocomplete from "@mui/material/Autocomplete";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import List from "../components/List";
import { TabScrollButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, fontSize } from "@mui/system";

/* birinci kod */
export default function TerminlList(props) {

  const [selectedName, setSelectedName] = useState("");

  function handleChange(event,termName) {
    closelist()
    props.sendMontajNo(event.target.value);
    setSelectedName(termName);
  }
  const [goster, setGoster] = useState(false);
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
        value={data.lastAssyNo}
        onClick={(event) => handleChange(event, data.termName)}
        sx={{ minWidth: 300, backgroundColor: " #c6ffc8" }}
      >
        {data.termName}
      </MenuItem>
    );
  });
  return (
    <div>
      <Grid
        sx={{
          border: 1,
          borderRadius: 1,
          height: "55px",
          minWidth: "100%",
          alignContent: "flex-end",
        }}
        onClick={openTermlist}
      >
        <Typography>{selectedName} </Typography>
        <KeyboardArrowDownIcon />
      </Grid>
      {goster && (
        <Grid sx={{ position: "absolute", top: 65, zIndex: 999 }}>
          <Grid container>
            <Grid item xs={9}>
              <Box
                id="scrollable-box"
                container
                sx={{
                  justifyContent: "space-evenly",
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "400px",
                  background: "#c6ffc8",
                }}
              >
                {arr}
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleScroll("up")}>
                <KeyboardArrowUpIcon />
              </Button>
              <Button onClick={() => handleScroll("down")}>
                <KeyboardArrowDownIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
