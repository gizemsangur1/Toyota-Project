import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Button, TextField, Typography, Alert } from "@mui/material";
import TerminlList from "./TerminlList";
import SelectDate from "./SelectDate";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";
import Keyboard from "./Keyboard";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import languageLayouts from "../language/KeyboardLayouts";
export default function Loginto() {
  const { buttonName } = useParams();
  const [inputs, setInputs] = useState({});
  const [layoutName, setLayoutName] = useState("default");
  const [inputName, setInputName] = useState("default");
  const keyboard = useRef();
 
  const onChangeAll = (inputs) => {
    setInputs({ ...inputs });
  };

  const handleShift = () => {
    
  };

  const onKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") {
     
    }
  };
  useEffect(() => {
    
    setLayoutName(navigator.language);
  });
  const onChangeInput = (event) => {
    const inputVal = event.target.value;
    setInputs({
      ...inputs,
      [inputName]: inputVal,
    });

    keyboard.current.setInput(inputVal);
  };

  const getInputValue = (inputName) => {
    return inputs[inputName] || "";
  };

  const { t, i18n } = useTranslation();
  const [termlist, setTermlist] = useState("");
  const dispatch = useDispatch();
  const GetData = (value) => {
    setTermlist(value);
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

  const formik = useFormik({
    initialValues: {
      sicilno: "",
      sifre: "",
      montajno: termlist,
    },

    onSubmit: (values) => {
      values.montajno = termlist;
      values.sicilno = document.getElementById("sicilno").value;
      values.sifre = document.getElementById("password").value;
      LoginSchema.validate(values)
        .then(() => {
          const nextPage = "/HataGiris?" + buttonName;
          navigate(nextPage);
          /*  navigate("/HataGiris"); */
        })
        .catch((err) => {
          setError(err.errors[0]);
        });
    },
  });

  const LoginSchema = Yup.object().shape({
    montajno: Yup.string().required("Montaj no gerekli"),
    sicilno: Yup.string()

      .min(5, "Sicilno minimum 5 karakter olmali")

      .required("Sicilno gerekli")
      .test("match", "Sicilno yanlış", function (sicilno) {
        return parseInt(sicilno) === 26917;
      }),
    sifre: Yup.string()

      .min(3, "Sifre mininmum 3 karakter olmali")
      .required("Sifre gerekli")
      .test("match", "Şifre yanlış", function (passw) {
        return parseInt(passw) === 233;
      }),
  });

  const handleSubmit = () => {
    dispatch({
      type: "SET_SHIFT",
      shift: color,
    });
  };
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
                          justifyContent="left"
                          alignItems="center"
                        >
                          <Typography htmlFor="terminallist">
                            {t("TList")}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          xs={8}
                          justifyContent="left"
                          alignItems="center"
                        >
                          <Grid
                            sx={{
                              border: 1,
                              borderRadius: 1,
                              height: "55px",
                              minWidth: "100%",
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
                          justifyContent="left"
                          alignItems="center"
                        >
                          <Typography htmlFor="sicilno">{t("SNo")}</Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          xs={8}
                          justifyContent="left"
                          alignItems="center"
                        >
                          <TextField
                            type="text"
                            name="sicilno"
                            id="sicilno"
                            sx={{minWidth:"100%"}}
                            value={getInputValue("sicilno")}
                            onFocus={() => setInputName("sicilno")}
                            onChange={onChangeInput}
                          />
                        </Grid>
                      </Grid>
                      <Grid container direction="row" sx={{ marginTop: 1 }}>
                        <Grid
                          item
                          container
                          xs={4}
                          justifyContent="left"
                          alignItems="center"
                        >
                          <Typography htmlFor="sifre">{t("Sifre")}</Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          xs={8}
                          justifyContent="left"
                          alignItems="center"
                        >
                          <TextField
                            type="password"
                            name="password"
                            id="password"
                            sx={{minWidth:"100%"}}
                            value={getInputValue("password")}
                            onFocus={() => setInputName("password")}
                            onChange={onChangeInput}
                          />
                        </Grid>
                      </Grid>
                      <Grid container direction="row" sx={{ marginTop: 1 }}>
                        <Grid
                          item
                          container
                          xs={4}
                          justifyContent="left"
                          alignItems="center"
                        >
                          <Typography htmlFor="montajno">{t("MNo")}</Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          xs={8}
                          justifyContent="left"
                          alignItems="center"
                          
                        >
                          <TextField
                            type="text"
                            name="montajno"
                            onChange={formik.handleChange}
                            value={termlist}
                            sx={{minWidth:"100%"}}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        sx={{ marginTop: 1, backgroundColor: color,borderRadius:2 }}
                      >
                        <Grid item container xs={8} >
                          <Grid item xs={2} >
                            <Typography htmlFor="tarih" sx={{position:"relative",top:"35%"}}>{t("Date")}</Typography>
                          </Grid>
                          <Grid item xs={10}>
                            <SelectDate />
                          </Grid>
                        </Grid>
                        <Grid item container xs={4}>
                          <Typography htmlFor="shift" sx={{position:"relative",top:"35%"}}>{t("Shift")}</Typography>
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
                      <Grid container direction="row" sx={{ marginTop: 1 }}>
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
                            onClick={handleSubmit}
                          >
                            {t("Login")}
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
                            {t("Close")}
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
              <Grid item xs={1.5} ></Grid>
              <KeyboardReact
                keyboardRef={(r) => (keyboard.current = r)}
                inputName={inputName}
                layoutName={layoutName}
                layout={languageLayouts}
                onChangeAll={onChangeAll}
                onKeyPress={onKeyPress}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}
