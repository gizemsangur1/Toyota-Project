import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Button, TextField, Typography, Alert } from "@mui/material";
import TerminlList from "./TerminlList";
import { ToastContainer, toast } from "react-toastify";
import SelectDate from "./SelectDate";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";
import Keyboard from "./Keyboard";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import keyboardv from "react-virtual-keyboard"
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import languageLayouts from "../language/KeyboardLayouts";
import { useSelector } from "react-redux";
export default function Loginto() {
  const { buttonName } = useParams();
  const [inputs, setInputs] = useState({});
  const [layoutName, setLayoutName] = useState("default");
  const [inputName, setInputName] = useState("default");
  const keyboard = useRef();

  const onChangeAll = (inputs) => {
    setInputs({ ...inputs });
  };

  const handleShift = () => {};

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
  const [termlistm, setTermlistm] = useState("");
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
  const buttonname = useSelector((state) => state.buttonName);
  const formik = useFormik({
    initialValues: {
      sicilno: "",
      sifre: "",
      montajno: "",
    },

    onSubmit: (values) => {
      values.montajno = document.getElementById("montajno").value;
      values.sicilno = document.getElementById("sicilno").value;
      values.sifre = document.getElementById("password").value;
      dispatch({
        type: "SET_MONTAJNO",
        montajno: document.getElementById("montajno").value,
      });
      LoginSchema.validate(values)
        .then(() => {
          const nextPage = `/HataGiris?${buttonname}&${document.getElementById("montajno").value}`;
          navigate(nextPage);
        })
        .catch((err) => {
          setError(err.errors[0]);
        });
    },
  });
  const notifyMe = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const LoginSchema = Yup.object().shape({
    montajno: Yup.string()
      .min(5, ({ min }) => {
        notifyMe(`Montaj No en az ${min} karakter olmalı!`);
        return "";
      })
      .required("Montaj No gerekli")
      .test("match", "", function (montajno) {
        return parseInt(montajno) === parseInt(termlist);
      }),
    sicilno: Yup.string()
      .min(5, ({ min }) => {
        notifyMe(`sicil No en az ${min} karakter olmalı!`);
        return "";
      })
      .required(" ")
      .test("match", "", function (sicilno) {
        return parseInt(sicilno) === 26917;
      })
      .test("notify", "", function (sicilno) {
        if (this.createError) {
          notifyMe("Kullanıcı bulunamadı");
          this.createError({ message: "" });
        }
        return true;
      }),
    sifre: Yup.string()
      .min(3, ({ min }) => {
        notifyMe(`Şifre en az ${min} karakter olmalı!`);
        return "";
      })
      .required("Şifre gerekli")
      .test("match", "", function (passw) {
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
                              borderColor: "#98C49A",
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
                            sx={{ minWidth: "100%" }}
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
                            sx={{ minWidth: "100%" }}
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
                            id="montajno"
                            onFocus={() => setInputName("montajno")}
                            onChange={onChangeInput}
                            value={getInputValue("montajno")}
                            sx={{ minWidth: "100%" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        sx={{
                          marginTop: 1,
                          backgroundColor: color,
                          borderRadius: 2,
                        }}
                      >
                        <Grid item container xs={8}>
                          <Grid item xs={2}>
                            <Typography
                              htmlFor="tarih"
                              sx={{ position: "relative", top: "35%" }}
                            >
                              {t("Date")}
                            </Typography>
                          </Grid>
                          <Grid item xs={10}>
                            <SelectDate />
                          </Grid>
                        </Grid>
                        <Grid item container xs={4}>
                          <Typography
                            htmlFor="shift"
                            sx={{ position: "relative", top: "35%" }}
                          >
                            {t("Shift")}
                          </Typography>
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
                        <Grid item xs={6} sx={{ paddingRight: 0.5 }}>
                          <Button
                            type="submit"
                            name="submit"
                            sx={{
                              backgroundColor: " black",
                              marginRight: 0.5,
                              color: "white",
                              borderRadius: 1,
                              height: "7vh",
                              width: "100%",
                            }}
                            onClick={handleSubmit}
                          >
                            {t("Login")}
                          </Button>
                        </Grid>
                        <Grid item xs={6} sx={{ paddingLeft: 0.5 }}>
                          <Button
                            type="close"
                            sx={{
                              backgroundColor: " red",
                              color: "white",
                              borderRadius: 1,
                              height: "7vh",
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
              <Grid item xs={1.5}></Grid>
              <Grid
                item
                sx={{ width: "100%", height: "100%", minHeight: "45vh" }}
              >
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
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
}
