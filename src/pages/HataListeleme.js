import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState, lazy, Suspense } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { toast, useToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Hatalistesi = lazy(() => import("../components/Hatalistesi"));
export default function HataListeleme(props) {
  const [filterText1, setFilterText1] = useState("");
  const [filterText2, setFilterText2] = useState("");
  const [info, setInfo] = useState("");
  const [info2, setInfo2] = useState("");
  const handleFilter = (e) => {
    e.preventDefault();
    setFilterText1(e.target.value);
    setFilterText2(e.target.value);
  };

const handleSearchM=()=>{
 setInfo2(filterText2);
}
const handleSearchB=()=>{
  setInfo(filterText1);
 }
  const [showErrorList, setShowErrorList] = useState(false);

  const handleClick = () => {
    setShowErrorList(true);
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll(direction) {
    const scrollStep = 100;
    const box = document.getElementById("my-grid");
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
      <Box
        sx={{
          height: "600px",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        {showErrorList && (
          <Suspense
            fallback={
              <div
                style={{
                  width: "100%",
                  backgroundColor: "darkviolet",
                  top: 0,
                  position: "fixed",
                  height: "3px",
                }}
              ></div>
            }
          >
            <Hatalistesi handleScroll={handleScroll} filterText1={info} filterText2={info2}   />
          </Suspense>
        )}
      </Box>
      <Grid container direction="row">
        <Grid container item xs={4} alignItems="center" justifyContent="center">
          <Grid item xs={3}>
            <Typography sx={{ textAlign: "center" }}>MONTAJ NO</Typography>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={filterText2}
              onChange={(e) => setFilterText2(e.target.value)}
            />
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Button onClick={handleSearchM}>ARA</Button>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ textAlign: "center" }}>BODY NO</Typography>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={filterText1}
              onChange={(e) => setFilterText1(e.target.value)}
            />
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Button onClick={handleSearchB}>ARA</Button>
          </Grid>
        </Grid>
        <Grid container item xs={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Button
              variant="primary"
              sx={{
                border: 1,
                textAlign: "center",
                width: 100,
                height: 50,
              }}
              onClick={() => handleScroll("up")}
            >
              <KeyboardArrowUpIcon />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="primary"
              sx={{
                border: 1,
                textAlign: "center",
                width: 100,
                height: 50,
              }}
              onClick={() => handleScroll("down")}
            >
              <KeyboardArrowDownIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row">
            <Button
              sx={{
                border: 1,
                textAlign: "center",
                width: 100,
                height: 100,
              }}
            >
              ARAC LİSTESİ
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row">
            <Button
              sx={{
                border: 1,
                textAlign: "center",
                width: 100,
                height: 100,
              }}
            >
              MANUEL HATA
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row">
            <Button
              sx={{
                border: 1,
                textAlign: "center",
                width: 100,
                height: 100,
              }}
            >
              COKLU HATA
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row">
            <Button
              sx={{
                border: 1,
                textAlign: "center",
                width: 100,
                height: 100,
              }}
              onClick={handleClick}
            >
              HATA LİSTESİ
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row">
            <Button
              sx={{
                border: 1,
                textAlign: "center",
                width: 100,
                height: 100,
              }}
            >
              HATA KOPYA
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row">
            <Button
              sx={{
                border: 1,
                textAlign: "center",
                width: 100,
                height: 100,
              }}
            >
              CİKİS
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
