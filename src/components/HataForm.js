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
export default function HataForm(props) {
  const [inputs, setInputs] = useState({});
  const [layoutName, setLayoutName] = useState("default");
  const [inputName, setInputName] = useState("default");
  const keyboard = useRef();
  const [language, setLanguage] = useState("english");
  const layouts = [
    "default",
    "shift",
    "turkish",
    "german",
    "french",
    "russian",
  ]; 
  const [layoutIndex, setLayoutIndex] = useState(0);
  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };
  const onChangeAll = (inputs) => {

    setInputs({ ...inputs });
  };

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
  };

  const onKeyPress = (button) => {
  
    if (button === "{shift}" || button === "{lock}") {
      setLayoutIndex((layoutIndex + 1) % layouts.length);  }
  };
  useEffect(() => {
    const newLayoutName = layouts[layoutIndex]; 
    setLayoutName(newLayoutName);
  }, [layoutIndex]);
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
  const [description, setDescription] = React.useState("");
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
    description: description,
    defectName: fontdata.termlist,
  };
  const dispatch = useDispatch();
  const coord = useSelector((state) => state.coord);
  const coords = useSelector((state) => state.coords);
  function handleClik() {
    console.log(exitdepartment);
    console.log(rdd);
    console.log(defectclass);
    console.log(defectresponsible);
    console.log(subresponsible);
    console.log(document.getElementById('action').value);
    console.log(document.getElementById('description').value);
    console.log(coord);
    props.onKaydedildi();
  }

  const arr = data.map((data, index) => {
    if (data.controlType == "CMB") {
      if (data.englishUserName == "Exit Department") {
        return (
          <Grid container direction="row" key={index} sx={{ marginTop: 1 }}>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography>{data.userName}</Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <FormControl sx={{ minWidth: "45%" }}>
                <Select value={exitdepartment} onChange={handleChangeexit}>
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
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography>RDD</Typography>
              <FormControl sx={{ minWidth: "45%" }}>
                <Select value={rdd} onChange={handleChangerdd}>
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
      } else if (data.englishUserName == "Defect Class") {
        return (
          <Grid container direction="row" key={index} sx={{ marginTop: 1 }}>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography>{data.englishUserName}</Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <FormControl sx={{ minWidth: "45%" }}>
                <Select value={defectclass} onChange={handleChangedefectclass}>
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
      } else if (data.englishUserName == "Defect Responsibles") {
        return (
          <Grid container direction="row" key={index} sx={{ marginTop: 1 }}>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography>{data.englishUserName}</Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <FormControl sx={{ minWidth: "45%" }}>
                <Select
                  value={defectresponsible}
                  onChange={handleChangedefectresp}
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
          <Grid container direction="row" key={index} sx={{ marginTop: 1 }}>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography>{data.englishUserName}</Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <FormControl sx={{ minWidth: "45%" }}>
                <Select value={subresponsible} onChange={handleChangesubresp}>
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
      if (data.userName == "Açıklama") {
        return (
          <Grid container direction="row" key={index} sx={{ marginTop: 1 }}>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography>{data.userName}</Typography>
            </Grid>
            <Grid item xs={9} sx={{ textAlign: "center" }}>
              <TextField
                type="text"
                name="description"
                id="description"
                value={getInputValue("description")}
                onFocus={() => setInputName("description")}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid container direction="row" key={index} sx={{ marginTop: 1 }}>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography>{data.userName}</Typography>
            </Grid>
            <Grid item xs={9} sx={{ textAlign: "center" }}>
            <TextField
                type="text"
                name="action"
                id="action"
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

  return (
    <div>
      <Grid container direction="row" sx={{ border: 1 }}>
        {arr}
         <KeyboardReact
                keyboardRef={(r) => (keyboard.current = r)}
                inputName={inputName}
                layoutName={layoutName}
                layout={languageLayouts}
                onChangeAll={onChangeAll}
                onKeyPress={onKeyPress}
              />
      </Grid>
    </div>
  );
}
