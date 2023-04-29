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
 
/* import KeyboardReact from "react-simple-keyboard";
import 'react-simple-keyboard/build/css/index.css'; */
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
    montajno:Yup.string()
    .required("Montaj no gerekli"),
    sicilno: Yup.string()

      .min(5)

      .required("Sicilno gerekli")
      .test("match", "Sicilno yanlış", function (sicilno) {
        return parseInt(sicilno) === 26917;
      }),
    sifre: Yup.string()

      .min(3)
      .required("Sifre gerekli")
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
      values.sicilno = inputValue1;
      values.sifre = inputValue2;
      LoginSchema.validate(values)
        .then(() => {
          navigate("/HataGiris");
        })
        .catch((err) => {
         setError(err.errors[0]);
          console.log(values); 
          
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
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const [selectedInput, setSelectedInput] = useState(null);

  const handleInputChange = (message) => {
    if (selectedInput == 1) {
      setInputValue1(message);
    } else {
      setInputValue2(message);
    }
  };

  const handleDelete = () => {
    if (selectedInput === 1) {
      setInputValue1(inputValue1.slice(0, -1));
      inputRef1.current.focus();
    } else if (selectedInput === 2) {
      setInputValue2(inputValue2.slice(0, -1));
      inputRef2.current.focus();
    }
  };

  const handleKeyDown = (event) => {
    const { key } = event;

    let isBackspace = key === "Backspace";
    if (isBackspace) {
      handleDelete();
    } else {
      if (selectedInput === 1) {
        setInputValue1(inputValue1 + key);
        inputRef1.current.focus();
      } else if (selectedInput === 2) {
        setInputValue2(inputValue2 + key);
        inputRef2.current.focus();
      }
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
                      <Grid container direction="row" sx={{ marginTop: 1 }}>
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
                      <Grid container direction="row" sx={{ marginTop: 1 }}>
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
                          <TextField
                            type="text"
                            name="sicilno"
                            ref={inputRef1}
                            value={inputValue1}
                            onClick={() => setSelectedInput(1)}
                            onKeyDown={handleKeyDown}
                          />
                        </Grid>
                      </Grid>
                      <Grid container direction="row" sx={{ marginTop: 1 }}>
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
                          <TextField
                            type="password"
                            name="sifre"
                            ref={inputRef2}
                            value={inputValue2}
                            onClick={() => setSelectedInput(2)}
                            onKeyDown={handleKeyDown}
                          />
                        </Grid>
                      </Grid>
                      <Grid container direction="row" sx={{ marginTop: 1 }}>
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
                        sx={{ marginTop: 1, backgroundColor: color }}
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
                      <Grid container direction="row" sx={{ marginTop: 1}}>
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
            <Keyboard
                  handleKeyDown={handleKeyDown}
                  setInputValue={handleInputChange}
                  handleDelete={handleDelete}
                /> 
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}
