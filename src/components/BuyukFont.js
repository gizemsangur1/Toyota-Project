import { React, useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import Buyukfontdata from "./Buyukfontdata";
import BuyukfontHeader from "./BuyukfontHeader";

export default function BuyukFont(props) {
  const [background, setBackground] = useState("#c6ffc8");
const [lastClick, setLastClick] = useState(Date.now());

useEffect(() => {
  const intervalId = setInterval(() => {
    if (Date.now() - lastClick >= 10000) {
      const beep = new Audio('Beep.mp3');
      beep.play();
      setBackground((prevColor) => (prevColor === "#c6ffc8" ? "red" : "red"));
    }
  }, 1000);

  return () => clearInterval(intervalId);
}, [lastClick]);

function resetTimer() {
  setBackground("#c6ffc8");
  setLastClick(Date.now());
}

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/Buyukfont1.json")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = data.map((data, index) => {
    return (
      <Grid container key={index}>
        <Typography variant="h4">
          {data.partName}-{data.defectName}
        </Typography>
      </Grid>
    );
  });
  function handleClick() {
    props.onClick();
  }
  const [montajValue, setMontajValue] = useState("");

  return (
    <div
      style={{ backgroundColor: background, minHeight: "100vh" }}
      onClick={resetTimer}
    >
      <Grid container direction="row" sx={{ padding: 2 }}>
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            textAlign: "center",
          }}
        >
          <BuyukfontHeader value={data.assyNo} />
        </Grid>
        <Grid container direction="row" sx={{ padding: 2 }}>
          <Grid
            container
            item
            xs={9}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              textAlign: "center",
            }}
          >
            <Buyukfontdata montajNo={data.assyNo} />
          </Grid>
          <Grid
            container
            item
            xs={3}
            sx={{
              border: 1,
              borderRadius: 1,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              textAlign: "center",
            }}
          >
            <Button sx={{ width: "90%" }} onClick={handleClick}>
              HATA GIRISI
            </Button>
            <Typography sx={{ width: "100%" }}>MONTAJ NO</Typography>
            <Input type="text">{montajValue}</Input>

            <Button sx={{ width: "90%" }}>ARA</Button>
          </Grid>
        </Grid>
        <Grid container direction="row">
          {arr}
        </Grid>
      </Grid>
    </div>
  );
}
