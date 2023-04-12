import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Button, TextField, Typography, Alert } from "@mui/material";
import TerminlList from "./TerminlList";
import SelectDate from "./SelectDate";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Routes, Route, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Keyboard from "./Keyboard";

/* ikinci kod */

export default function Loginto() {
  const [termlist, setTermlist] = useState("");
  const [termname, setTermname] = useState("");
  const GetData = (value) => {
    setTermlist(value);
  };
  const sendTermName = (value) => {
    setTermname(value);
  };
  const navigate = useNavigate();

  const [color, setColor] = React.useState("#12a6eb");

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/Shifts.json")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [error, setError] = useState("");
  const LoginSchema = Yup.object().shape({
    sicilno: Yup.string()

      .min(5)

      .required("Sicilno is required")
      .test("match", "Sicilno yanlış", function (sicilno) {
        return parseInt(sicilno) === 26917;
      }),
    sifre: Yup.string()

      .min(3)
      .required("Password is required")
      .test("match", "Şifre yanlış", function (passw) {
        return parseInt(passw) === 233;
      }),
  });

  const formik = useFormik({
    initialValues: {
      sicilno: "",
      sifre: "",
      montajno: termlist,
    },

    onSubmit: (values) => {
      values.montajno = termlist;
      LoginSchema.validate(values)
        .then(() => {
          navigate("/HataGiris");
        })
        .catch((err) => {
          /* setError(err.errors[0]);
          console.log(values); */
          navigate("/HataGiris");
        });
    },
  });
  const closelogin = () => {
    navigate(-1);
  };
  const arr = data.map((data, index) => {
    return (
      <MenuItem key={index} value={data.rgbColor}>
        {data.shiftCode}
      </MenuItem>
    );
  });
  /*KLAVYE KODLARI */
  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [selectedInput, setSelectedInput] = useState(null);

  const handleInput1Change = (event) => {
    if (selectedInput === "input1") {
      setInput1Value(event.target.value);
    }
  };

  const handleInput2Change = (event) => {
    if (selectedInput === "input2") {
      setInput2Value(event.target.value);
    }
  };

  const handleInputFocus = (event) => {
    setSelectedInput(event.target.name);
    event.target.focus();
  };

  const handleDelete = () => {
    setSelectedInput((prev) => prev.slice(0, -1));
  };

  const handleKeyDown = (event) => {
    const { key } = event;

    let isBackspace = key === "Backspace";
    if (isBackspace) {
      handleDelete();
    } else {
      setSelectedInput((prev) => prev + key);
    }
  };
 
  
  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ border: 1, borderRadius: 1 }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ borderBottom: 1 }}
            >
              <Typography>CVQS(TMMT)</Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ borderBottom: 1 }}
            >
              <Grid item xs={1.5}></Grid>
              <Grid item xs={9}>
                <Formik>
                  {({ errors, touched }) => (
                    <Form onSubmit={formik.handleSubmit}>
                      <Grid container direction="row" sx={{ marginTop: 2 }}>
                        <Grid
                          item
                          container
                          xs={4}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Typography htmlFor="terminallist">
                            Terminal Listesi
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          xs={8}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid
                            sx={{
                              border: 1,
                              borderRadius: 1,
                              height: "55px",
                              minWidth: "44%",
                              alignContent: "flex-end",
                            }}
                          >
                            <TerminlList
                              GetDataValue={GetData}
                              onChange={formik.handleChange}
                              sendMontajNo={GetData}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" sx={{ marginTop: 2 }}>
                        <span>{errors?.sicilno?.message}</span>
                        <Grid
                          item
                          container
                          xs={4}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Typography htmlFor="sicilno">Sicil No</Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          xs={8}
                          justifyContent="center"
                          alignItems="center"
                        >
                          {/* <TextField
                            type="text"
                            name="sicilno"
                            onChange={formik.handleChange}
                            ref={this.inputRef}
                          /> */}
                          <input
                            type="text"
                            name="input1"
                            value={input1Value}
                            onChange={handleInput1Change}
                            onFocus={handleInputFocus}
                          />
                        </Grid>
                      </Grid>
                      <Grid container direction="row" sx={{ marginTop: 2 }}>
                        <Grid
                          item
                          container
                          xs={4}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Typography htmlFor="sifre">Sifre</Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          xs={8}
                          justifyContent="center"
                          alignItems="center"
                        >
                          {/* <TextField
                            type="password"
                            name="sifre"
                            onChange={formik.handleChange}
                            value={formik.values.sifre}
                          /> */}
                          <input
                            type="text"
                            name="input2"
                            value={input2Value}
                            onChange={handleInput2Change}
                            onFocus={handleInputFocus}
                          />
                        </Grid>
                      </Grid>
                      <Grid container direction="row" sx={{ marginTop: 2 }}>
                        <Grid
                          item
                          container
                          xs={4}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Typography htmlFor="montajno">Montaj No</Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          xs={8}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <TextField
                            type="text"
                            name="montajno"
                            onChange={formik.handleChange}
                            value={termlist}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        sx={{ marginTop: 2, backgroundColor: color }}
                      >
                        <Grid item container xs={8}>
                          <Grid item xs={2}>
                            <Typography htmlFor="tarih">Tarih</Typography>
                          </Grid>
                          <Grid item xs={10}>
                            <SelectDate />
                          </Grid>
                        </Grid>
                        <Grid item container xs={4}>
                          <Typography htmlFor="shift">Vardiya</Typography>
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
                      <Grid container direction="row" sx={{ marginTop: 2 }}>
                        <Grid item xs={6}>
                          <Button
                            type="submit"
                            name="submit"
                            sx={{
                              backgroundColor: " black",
                              color: "white",
                              borderRadius: 1,
                              width: "100%",
                            }}
                          >
                            Giris Yap
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            type="close"
                            sx={{
                              backgroundColor: " red",
                              color: "white",
                              borderRadius: 1,
                              width: "100%",
                            }}
                            onClick={closelogin}
                          >
                            Kapat
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
              <Grid item xs={1.5}></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
        <Keyboard
          inputValue={input2Value}
          onKeyDown={handleKeyDown}
          onChange={setSelectedInput}
        />
      </Grid>
    </div>
  );
}