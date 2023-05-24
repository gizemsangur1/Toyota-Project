import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Keyboard from "./Keyboard";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import languageLayouts from "../language/KeyboardLayouts";
import { ToastContainer, toast } from "react-toastify";
export default function HataForm(props) {
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
  const [exitdepartment, setExitdepartment] = React.useState("");
  const [data, setData] = useState([]);
  const [Nrlist, setNrlist] = useState([]);
  const [select, setSelect] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [select3, setSelect3] = useState([]);
  const [select4, setSelect4] = useState([]);

  const [rdd, setRdd] = React.useState("");
  const [defectclass, setDefectclass] = React.useState("");
  const [defectresponsible, setDefectresponsible] = React.useState("");
  const [subresponsible, setSubresponsible] = React.useState("");
  /* const [description, setDescription] = React.useState(""); */
  const [action, setAction] = React.useState("");

  const handleChangeexit = (event) => {
    setExitdepartment(event.target.value);
  };
  const handleChangerdd = (event) => {
    setRdd(event.target.value);
  };
  const handleChangedefectclass = (event) => {
    setDefectclass(event.target.value);
  };
  const handleChangedefectresp = (event) => {
    setDefectresponsible(event.target.value);
  };
  const handleChangesubresp = (event) => {
    setSubresponsible(event.target.value);
  };

  useEffect(() => {
    axios
      .get("/JsonFiles/HataKayitForm_1.json")
      .then((res) => {
        setData(res.data.data[0].requiredFieldsByInspectionDTOList);
        setSelect(
          res.data.data[0].requiredFieldsByInspectionDTOList[0]
            .errDetailComboBoxValueDTOList
        );
        setSelect2(
          res.data.data[0].requiredFieldsByInspectionDTOList[4]
            .errDetailComboBoxValueDTOList
        );
        setSelect3(
          res.data.data[0].requiredFieldsByInspectionDTOList[5]
            .errDetailComboBoxValueDTOList
        );
        setSelect4(
          res.data.data[0].subResponsiblesByDefrespId[1].subResponsibles
        );
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("/JsonFiles/NrList.json")
      .then((res) => {
        setNrlist(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  function closeform() {
    props.onClick();
  }
  const fontdata = props.fontdata;
  const buyukfont = {
    partName: fontdata.partname,
    defectName: fontdata.termlist,
  };
  const notifyMe = () => {
    const pcoord = coord;
    const pexitdepartment = exitdepartment;
    const prdd = rdd;
    const pdefectclass = defectclass;
    const psubresponsible = subresponsible;
    const paction = document.getElementById("action").value;
    const pdescription = document.getElementById("description").value;
    const message = (
      <div>
        <p>
          Koordinat: {pcoord.x} {pcoord.y}
        </p>
        <p>Exit Department: {pexitdepartment}</p>
        <p>RDD: {prdd}</p>
        <p>Defect Class: {pdefectclass}</p>
        <p>Sub Responsible: {psubresponsible}</p>
        <p>Action: {paction}</p>
        <p>Description: {pdescription}</p>
      </div>
    );

    toast.success(message, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const dispatch = useDispatch();
  const coord = useSelector((state) => state.coord);
  const coords = useSelector((state) => state.coords);
  function handleClik() {
    notifyMe();
    props.onKaydedildi();
  }

  const arr = data.map((data, index) => {
    if (data.controlType === "CMB") {
      if (data.englishUserName === "Exit Department") {
        return (
          <Grid
            container
            direction="row"
            key={index}
            sx={{ marginBottom: 0.5, alignItems: "center" }}
          >
            <Grid item xs={3} sx={{ textAlign: "left" }}>
              <Typography>{data.userName}</Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <FormControl sx={{ minWidth: "100%", height: "6vh" }}>
                <Select
                  value={exitdepartment}
                  onChange={handleChangeexit}
                  sx={{ minWidth: "100%", height: "6vh" }}
                >
                  {select.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.dataValue}>
                        {item.dataValue}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "center" }}>
              <FormControlLabel
                control={<CheckBoxOutlineBlank />}
                label="Harigami"
              />
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "left" }}>
              <Typography>RDD</Typography>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "left" }}>
              <FormControl sx={{ minWidth: "100%", height: "6vh" }}>
                <Select
                  value={rdd}
                  onChange={handleChangerdd}
                  sx={{ minWidth: "100%", height: "6vh" }}
                >
                  {Nrlist.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.nrReasonAbb}>
                        {item.nrReasonAbb}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      } else if (data.englishUserName === "Defect Class") {
        return (
          <Grid
            container
            direction="row"
            key={index}
            sx={{ marginBottom: 0.5, alignItems: "center" }}
          >
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography sx={{ textAlign: "left" }}>
                {data.englishUserName}
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "left" }}>
              <FormControl sx={{ minWidth: "100%", height: "6vh" }}>
                <Select
                  value={defectclass}
                  onChange={handleChangedefectclass}
                  sx={{ minWidth: "100%", height: "6vh" }}
                >
                  {select2.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.dataValue}>
                        {item.dataValue}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <Grid container direction="row">
                <Grid item xs={6} sx={{ width: "100%" }}>
                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: " red",
                      color: "white",
                      borderRadius: 1,
                      margin: 0.5,
                      width: "99%",
                    }}
                    onClick={handleClik}
                  >
                    {t("Save")}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="button"
                    sx={{
                      backgroundColor: " red",
                      color: "white",
                      borderRadius: 1,
                      margin: 0.5,
                      width: "99%",
                    }}
                    onClick={closeform}
                  >
                    {t("Cancel")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      } else if (data.englishUserName === "Defect Responsibles") {
        return (
          <Grid
            container
            direction="row"
            key={index}
            sx={{ marginBottom: 0.5, alignItems: "center" }}
          >
            <Grid item xs={3} sx={{ alignContent: "center" }}>
              <Typography sx={{ textAlign: "left" }}>
                {data.englishUserName}
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "left" }}>
              <FormControl sx={{ minWidth: "100%", height: "6vh" }}>
                <Select
                  value={defectresponsible}
                  onChange={handleChangedefectresp}
                  sx={{ minWidth: "100%", height: "6vh" }}
                >
                  {select3.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.dataValue}>
                        {item.dataValue}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid
            container
            direction="row"
            key={index}
            sx={{ marginBottom: 0.5, alignItems: "center" }}
          >
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography sx={{ textAlign: "left" }}>
                {data.englishUserName}
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "left" }}>
              <FormControl sx={{ minWidth: "100%", height: "6vh" }}>
                <Select
                  value={subresponsible}
                  onChange={handleChangesubresp}
                  sx={{ minWidth: "100%", height: "6vh" }}
                >
                  {select4.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.dataValue}>
                        {item.dataValue}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      }
    } else {
      if (data.userName === "Açıklama") {
        return (
          <Grid
            container
            direction="row"
            key={index}
            sx={{ marginBottom: 0.5, alignItems: "center" }}
          >
            <Grid item xs={3} sx={{ textAlign: "left" }}>
              <Typography>{data.userName}</Typography>
            </Grid>
            <Grid item xs={9} sx={{ textAlign: "center" }}>
              <input
                type="text"
                name="description"
                id="description"
                style={{
                  minWidth: "100%",
                  height: "6vh",
                  backgroundColor: "transparent",
                  borderColor: "#98C49A",
                  borderRadius: 5,
                }}
                value={getInputValue("description")}
                onFocus={() => setInputName("description")}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid
            container
            direction="row"
            key={index}
            sx={{ marginBottom: 0.5, alignItems: "center" }}
          >
            <Grid item xs={3} sx={{ textAlign: "left" }}>
              <Typography>{data.userName}</Typography>
            </Grid>
            <Grid item xs={9} sx={{ textAlign: "center" }}>
              <input
                type="text"
                name="action"
                id="action"
                style={{
                  minWidth: "100%",
                  height: "6vh",
                  backgroundColor: "transparent",
                  borderColor: "#98C49A",
                  borderRadius: 5,
                }}
                value={getInputValue("action")}
                onFocus={() => setInputName("action")}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>
        );
      }
    }
  });
  const buttonTheme = {
    class: "my-button-class",
    style: {
      fontSize: "20px",
      width: "80px",
      height: "80px",
    },
  };
  return (
    <>
      <Grid container direction="row" sx={{ padding: 2, maxHeight: "90vw" }}>
        <Grid container sx={{ marginBottom: 0.5 }}>
          <Grid item xs={10}>
            <Typography>CVQS(TMMT)</Typography>
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={<CheckBoxOutlineBlank />}
              label="Sık gelen hata"
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          {arr}
        </Grid>
        <Grid container direction="row" sx={{ padding: 0.5 }}>
          <Grid item xs={12}>
            <KeyboardReact
              buttonTheme={buttonTheme}
              keyboardRef={(r) => (keyboard.current = r)}
              inputName={inputName}
              layoutName={layoutName}
              layout={languageLayouts}
              onChangeAll={onChangeAll}
              onKeyPress={onKeyPress}
            />
          </Grid>
          {/*   */}
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
}
