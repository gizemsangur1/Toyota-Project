import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
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
import Keyboard from "../components/Keyboard";
import { CheckBoxOutlineBlank } from "@mui/icons-material";

export default function HataForm(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/HataKayitForm_1.json")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  function closeform(){
   props.onClick();
  }
  
  const arr = data.map((data, index) => {
    return (
      
       
          <Typography sx={{ padding: 1 }} key={index}>{data.userName}</Typography>
       
       /*  {data.requiredFieldsByInspectionDTOList.map((subitem,i)=>{
          return(
            <Grid key={i}>
              {subitem.errDetailComboBoxValueDTOList.map((item,i)=>{
                return(
                  <Grid key={i}>
                    {item.dataValue}
                  </Grid>
                )
              })}
            </Grid>
          )
        })} */
    
    );
  });

  return (
    <div>
      <Grid container direction="row">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object().shape({
              hatasorumlusu: Yup.string().required("Hata sorumlusu is required"),
              lastName: Yup.string().required("Last Name is required"),
              email: Yup.string()
                .email("Email is invalid")
                .required("Email is required"),
              password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
            })}
            onSubmit={(fields) => {
              alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
            }}
            render={({ errors, status, touched }) => (
              <FormControl
                sx={{
                  borderRadius: 1,
                  backgroundColor: "#c6ffc8",
                  minWidth: "100%",
                }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={3}>
                    <Typography htmlFor="hatasorumlusu">Hata Sorumlusu</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <Select
                        name="hatasorumlusu"
                        type="text"
                        className={
                          "form-control" +
                          (errors.firstName && touched.firstName
                            ? " is-invalid"
                            : "")
                        }
                      >
                        {arr}
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={<CheckBoxOutlineBlank defaultChecked />}
                      label="Harigami"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl>
                      <Select
                        name="firstName"
                        type="text"
                        className={
                          "form-control" +
                          (errors.firstName && touched.firstName
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>RDD</Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={3}>
                    <Typography htmlFor="firstName">Hata Sinifi</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <FormControl>
                      <Select
                        name="firstName"
                        type="text"
                        className={
                          "form-control" +
                          (errors.firstName && touched.firstName
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </FormControl>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button type="submit" className="btn btn-primary mr-2">
                      Kaydet
                    </Button>
                    <Button type="reset" className="btn btn-secondary" onClick={closeform}>
                      Iptal
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Typography htmlFor="firstName">Exit department</Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ widows: "100%" }}>
                    <FormControl>
                      <Select
                        name="firstName"
                        type="text"
                        className={
                          "form-control" +
                          (errors.firstName && touched.firstName
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </FormControl>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Typography htmlFor="firstName">Aciklama</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField name="firstName" type="text"></TextField>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Typography htmlFor="firstName">Yapilan Islem</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField name="firstName" type="text"></TextField>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Grid>
                </Grid>
                <div className="form-group"></div>
              </FormControl>
            )}
          />
        </Grid>
        <Grid container direction="row">
          <Keyboard />
        </Grid>
      </Grid>
    </div>
  );
}
