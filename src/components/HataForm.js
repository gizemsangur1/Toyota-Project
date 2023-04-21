import React, { useEffect, useState, useRef } from "react";
import axios, { Axios } from "axios";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Keyboard from "./Keyboard";
import { CheckBoxOutlineBlank } from "@mui/icons-material";

export default function HataForm(props) {
  const [data, setData] = useState([]);
  const [Nrlist, setNrlist] = useState([]);
  const [select, setSelect] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [select3, setSelect3] = useState([]);
  const [select4, setSelect4] = useState([]);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const [selectedInput, setSelectedInput] = useState(null);

  const handleInputChange = (message) => {
    if(selectedInput==1){
      setInputValue1(message);
    }else{
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

  const [exitdepartment, setExitdepartment] = React.useState("");
  const [rdd, setRdd] = React.useState("");
  const [defectclass, setDefectclass] = React.useState("");
  const [defectresponsible, setDefectresponsible] = React.useState("");
  const [subresponsible, setSubresponsible] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [action, setAction] = React.useState("");
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleAction = (event) => {
    setAction(event.target.value);
  };
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
  const fontdata=props.fontdata;
  const buyukfont={
    "partName":fontdata.partname ,
    "description": description ,
    "defectName":fontdata.termlist ,
  }
 

  function handleClik() {
    console.log(exitdepartment);
    console.log(rdd);
    console.log(defectclass);
    console.log(defectresponsible);
    console.log(subresponsible);
    console.log(action);
    console.log(description);
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
                    sx={{
                      backgroundColor: " red",
                      color: "white",
                      borderRadius: 1,
                      margin: 0.5,
                      width: "99%",
                    }}
                    onClick={handleClik}
                  >
                    KAYDET
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    sx={{
                      backgroundColor: " red",
                      color: "white",
                      borderRadius: 1,
                      margin: 0.5,
                      width: "99%",
                    }}
                    onClick={closeform}
                  >
                    İPTAL
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
                sx={{ minWidth: "75%" }}
                ref={inputRef1}
                value={inputValue1}
                onClick={() => setSelectedInput(1)}
                onKeyDown={handleKeyDown}
                onChange={handleDescription}
               
              ></TextField>
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
                sx={{ minWidth: "75%" }}
                onChange={handleAction}
                ref={inputRef2}
                value={inputValue2}
                onClick={() => setSelectedInput(2)}
                onKeyDown={handleKeyDown}
              ></TextField>
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
        <Keyboard     handleKeyDown={handleKeyDown}
          setInputValue={handleInputChange}
          handleDelete={handleDelete}/>
      </Grid>
    </div>
  );
}
