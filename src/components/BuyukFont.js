import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Button,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Buyukfontdata from "./Buyukfontdata";
import BuyukfontHeader from "./BuyukfontHeader";

/*İKİNCİ KOD */
export default function BuyukFont(props) {
  const [background, setBackground] = useState("#c6ffc8");
  const [timer, setTimer] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    function changeBackgroundColor() {
      setBackground((prevColor) => (prevColor === "#c6ffc8" ? "red" : "red"));
    }
    const intervalId = setInterval(changeBackgroundColor, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function resetTimer() {
    setBackground("#c6ffc8");
    clearInterval(timer);
    setTimer(null);
    setPlaying(false);
  }

  function handleAudio(){
    if(playing){
      setPlaying(false);
    }else{
      setPlaying(true);
    }
  }

  useEffect(() => {
    let audioInterval;
    if (playing) {
      const audio = new Audio('Beep.mp3');
      audio.play();
      audioInterval = setInterval(() => {
        audio.currentTime = 0;
        audio.play();
      }, 10000);
    } else {
      clearInterval(audioInterval);
    }

    return () => {
      clearInterval(audioInterval);
    };
  }, [playing]);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/Buyukfont1.json")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data);

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

  function handleChange(event) {
    setMontajValue(event.target.value);
  }
  console.log(montajValue);
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
