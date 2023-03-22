import { Button, Grid, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import SelectDate from "./SelectDate";
import Keyboard from "./Keyboard";
import TerminlList from "./TerminlList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
export default function Loginto() {
  const [color, setColor] = React.useState("#12a6eb");

  const handleChange = (event) => {
    setColor(event.target.value);
    console.log(color);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3004/data")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = data.map((data, index) => {
    return (
      <MenuItem key={data.shiftId} value={data.rgbColor}>
        {data.shiftCode}
      </MenuItem>
    );
  });

  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Grid
            container
            direction="row"
            id="hepsi"
            sx={{ textAlign: "center", border: 1, borderRadius: 5 }}
          >
            <Grid container direction="row" id="baslik">
              <Grid item xs={12} sx={{ textAlign: "center", borderBottom: 1 }}>
                <Typography>CVQS(TMMT)</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row">
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Grid
                  container
                  direction="row"
                  id="giris"
                  sx={{ alignContent: "center" }}
                >
                  <Grid container direction="row" sx={{ marginTop: 2 }}>
                    <Grid item xs={4}>
                      <Typography sx={{ textAlign: "center" }}>
                        Terminal Listesi
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ textAlign: "center" }}>
                      <TerminlList />
                    </Grid>
                  </Grid>
                  <Grid container direction="row" sx={{ marginTop: 2 }}>
                    <Grid item xs={4}>
                      <Typography sx={{ textAlign: "center" }}>
                        Sicil No
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ textAlign: "center" }}>
                      <TextField id="outlined-basic" variant="outlined" />
                    </Grid>
                  </Grid>
                  <Grid container direction="row" sx={{ marginTop: 2 }}>
                    <Grid item xs={4}>
                      <Typography sx={{ textAlign: "center" }}>
                        Sifre
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ textAlign: "center" }}>
                      <TextField id="outlined-basic" variant="outlined" />
                    </Grid>
                  </Grid>
                  <Grid container direction="row" sx={{ marginTop: 2 }}>
                    <Grid item xs={4}>
                     
                       <Typography
                        sx={{ textAlign: "center" }}
                        value={data.termId}
                      >
                        Montaj No
                      </Typography> 
                    </Grid>
                    <Grid item xs={8} sx={{ textAlign: "center" }}>
                      <TextField id="outlined-basic" variant="outlined" />
                    </Grid>
                  </Grid>
                  <Grid
                    id="shftdate"
                    container
                    direction="row"
                    sx={{
                      textAlign: "center",
                      backgroundColor: color,
                      mt: 2,
                      borderRadius: 2,
                      alignContent: "center",
                    }}
                  >
                    <Grid item xs={3}>
                      <Typography>Tarih</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <SelectDate />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>Vardiya</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          autoWidth
                          onChange={handleChange}
                          value={color}
                        >
                          {arr}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" id="buton" sx={{ mt: 2 }}>
                    <Grid
                      item
                      xs={6}
                      sx={{ backgroundColor: "red", borderRadius: 1 }}
                    >
                      <Button sx={{ color: "white", borderRadius: 1 }}>
                        Giris
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ backgroundColor: "black", borderRadius: 1 }}
                    >
                      <Button sx={{ color: "white", borderRadius: 1 }}>
                        Kapat
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
            <Grid container direction="row">
              <Keyboard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}
