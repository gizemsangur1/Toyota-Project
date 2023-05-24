import {
  Button,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { React, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Svg from "../components/Svg";
import Svg2 from "../components/Svg2";
import HataForm from "../components/HataForm";
import BuyukFont from "../components/BuyukFont";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BuyukfontHeader from "../components/BuyukfontHeader";
import { useDispatch, useSelector } from "react-redux";
import { resetAll } from "../components/Store";
import { useTranslation } from "react-i18next";
export default function HataGiris(props) {
  const { t, i18n } = useTranslation();
  const coord = useSelector((state) => state.coord);
  const [clickedCoordinates, setClickedCoords] = useState([]);
  const notifyMe = () => {
   
    closeform();
    setShowComponent2(false);
    setIsButtonDisabled(true);
    dispatch(resetAll());
    setClickedCoords([...clickedCoordinates, coord]);
  };

  const theme = createTheme({
    components: {
      MuiGrid: {
        styleOverrides: {
          root: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "2",
            border: "1",
            color: "black",
            margin: 5,
            width: "auto",
            height: "auto",
            minWidth: "15vw",
            minHeight: "8vh",
          },
        },
      },
    },
  });
  const theme2 = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "2",
            border: "1",
            margin: 3,
            fontSize: "1.2vw",
            color: "black",
            width: "auto",
            height: "auto",
            minWidth: "8vw",
            minHeight: "8vh",
          },
        },
      },
    },
  });
  const dispatch = useDispatch();

  const termname = useSelector((state) => state.termname);
  const partname = useSelector((state) => state.partname);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [data, setData] = useState([]);
  const [showComponent2, setShowComponent2] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [showselected, setShowselected] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [lastClick, setLastClick] = useState(Date.now());
  const [x1, setX1] = useState(null);
  const [y1, setY1] = useState(null);
  function handlesvgclick(x1, y1) {
    setX1(x1);
    setY1(y1);
  }
  const fontdata = {
    partname: partname,
    clickedCoords: clickedCoordinates,
  };

  const handleMenuSelect = () => {
    setIsButtonDisabled(false);
  };
  const navigate = useNavigate();
  const buttonname = useSelector((state) => state.buttonName);
  const montajno = useSelector((state) => state.montajno);
  const navigateToHataListesi = () => {
    const nextPage = `/HataListeleme?${buttonname}&${montajno}`;
          navigate(nextPage);
  };
  const navigateBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    axios
      .get("/JsonFiles/Header.json")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function openForm() {
    setShowForm(true);
  }
  function handlerectclick(event, color) {
    switch (color) {
      case "red":
        console.log("Kırmızı renkli recte tıklandı.");
        break;
      case "blue":
        setShowComponent2(true);
        break;
      case "green":
        console.log("Yesil renkli recte tıklandı.");
    }
  }

  function handlesvg() {
    setShowComponent2(false);
    setIsButtonDisabled(true);
    dispatch(resetAll());
  }

  function closeform() {
    setShowForm(false);
  }
  function buyukFont() {
    setShowComponent(true);
  }
  function closebuyukfont() {
    setShowComponent(false);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Date.now() - lastClick >= 30000) {
        const beep = new Audio("Beep.mp3");
        beep.play();
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [lastClick]);
  function resetTimer() {
    setLastClick(Date.now());
  }

  return (
    <div onClick={resetTimer}>
      {showComponent ? (
        <BuyukFont onClick={closebuyukfont} onMenuSelect={handleMenuSelect} />
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            container
            item
            xs={10}
            justifyContent="center"
            alignItems="center"
            sx={{ border: 1, borderRadius: 1, textAlign: "center" }}
          >
            <Grid container direction="row">
              <BuyukfontHeader />
            </Grid>
            <Grid item xs={12} md={12} lg={9}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    margin: 0,
                    position: "relative",
                  }}
                >
                  {showComponent2 ? (
                    <Svg2
                      onClick={handlesvgclick}
                      onMenuSelect={handleMenuSelect}
                      clickedCoordinates={clickedCoordinates}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <Svg
                      onClick={handlerectclick}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  )}
                </Box>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={10} md={10} lg={12}>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                      <Button
                        variant="outlined"
                        onClick={handlesvg}
                        sx={{
                          border: 1,
                          textAlign: "center",
                          width: "100%",
                          height: "100%",
                          minWidth: "8vw",
                          minHeight: "8vh",
                          color: "black",
                        }}
                      >
                        {t("Mfp")}
                      </Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                      <Button
                        variant="outlined"
                        onClick={navigateBack}
                        sx={{
                          border: 1,
                          textAlign: "center",
                          width: "100%",
                          height: "100%",
                          minWidth: "8vw",
                          minHeight: "8vh",
                          color: "black",
                        }}
                      >
                        {t("Back")}
                      </Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                      <Button
                        onClick={navigateToHataListesi}
                        variant="outlined"
                        sx={{
                          border: 1,
                          textAlign: "center",
                          width: "100%",
                          height: "100%",
                          minWidth: "8vw",
                          minHeight: "8vh",
                          color: "black",
                        }}
                      >
                        {t("EL")}
                      </Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                      <Button
                        variant="outlined"
                        sx={{
                          border: 1,
                          textAlign: "center",
                          width: "100%",
                          height: "100%",
                          minWidth: "8vw",
                          minHeight: "8vh",
                          color: "black",
                        }}
                      >
                        {t("Cl")}
                      </Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                      <Button
                        variant="outlined"
                        onClick={buyukFont}
                        sx={{
                          border: 1,
                          textAlign: "center",
                          color: "black",
                          width: "100%",
                          height: "100%",
                          minWidth: "8vw",
                          minHeight: "8vh",
                        }}
                      >
                        {t("BF")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2} md={2} lg={12}>
                  {showselected && <Typography>{partname}</Typography>}
                </Grid>
              </Grid>
            </Grid>
            <ThemeProvider theme={theme}>
              <Grid item container xs={12} md={12} lg={3}>
                <Grid
                  container
                  item
                  lg={12}
                  md={2}
                  xs={2}
                  sx={{display:"flex" ,justifyContent:"center"}}
                >
                  <Grid 
                  container
                  sx={{display:"flex" ,justifyContent:"left",marginLeft:5}}>
                    <FormControlLabel
                      control={<CheckBoxOutlineBlank defaultChecked />}
                      label="Harigami"
                    />
                    
                    <FormControlLabel
                      control={<CheckBoxOutlineBlank defaultChecked />}
                      label="RDD"
                    />
                  </Grid>
                </Grid>
                <Grid container item lg={12} md={2} xs={2}>
                  <Button
                    disabled
                    variant="outlined"
                    sx={{
                      border: 1,
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                      minWidth: "12vw",
                      minHeight: "8.2vh",
                    }}
                  >
                    {t("FR")}
                  </Button>
                </Grid>
                <Grid container item lg={12} md={2} xs={2}>
                  <Button
                    disabled
                    variant="outlined"
                    sx={{
                      border: 1,
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                      minWidth: "12vw",
                      minHeight: "8.2vh",
                    }}
                  >
                    {t("RP")}
                  </Button>
                </Grid>
                <Grid container item lg={12} md={3} xs={3}>
                  <Button
                    disabled={isButtonDisabled}
                    onClick={openForm}
                    variant="outlined"
                    sx={{
                      border: 1,
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                      minWidth: "12vw",
                      minHeight: "8.2vh",
                    }}
                  >
                    {t("ER")}
                  </Button>
                </Grid>
                <Grid item lg={12} md={1} xs={1}>
                  <Typography>{t("MNo")}</Typography>
                </Grid>
                <Grid item lg={12} md={2} xs={2}>
                  {data.map((item, i) => (
                    <TextField value={item.assyNo} key={i}>
                      {item.assyNo}
                    </TextField>
                  ))}
                </Grid>

                <Grid item lg={12} md={3} xs={3}>
                  <Button
                    variant="outlined"
                    sx={{
                      border: 1,
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                      minWidth: "12vw",
                      minHeight: "8.2vh",
                    }}
                  >
                    {t("Search")}
                  </Button>
                </Grid>
                <Grid item lg={12} md={3} xs={3}>
                  <Button
                    variant="outlined"
                    sx={{
                      border: 1,
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                      minWidth: "12vw",
                      minHeight: "8.2vh",
                    }}
                  >
                    {t("TFP")}
                  </Button>
                </Grid>
                <Grid item lg={12} md={3} xs={3}>
                  <Button
                    variant="outlined"
                    sx={{
                      border: 1,
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                      minWidth: "12vw",
                      minHeight: "8.2vh",
                    }}
                  >
                    {t("FE")}
                  </Button>
                </Grid>
                <Grid item lg={12} md={3} xs={3}>
                  <Button
                    variant="outlined"
                    sx={{
                      border: 1,
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                      minWidth: "12vw",
                      minHeight: "8.2vh",
                    }}
                  >
                    MANİFEST
                  </Button>
                </Grid>
                <Grid item md={12} lg={12}>
                  {showselected && <Typography> {termname}</Typography>}
                </Grid>
              </Grid>
            </ThemeProvider>
          </Grid>
        
          {showForm && (
            <Grid
              sx={{
                borderRadius: 1,
                border: 1,
                backgroundColor: "#c6ffc8",
                position: "absolute",
                top: 40,
                left: 50,
                width: "90%",
                height: "90vh",
              }}
            >
              <HataForm
                onClick={closeform}
                onKaydedildi={notifyMe}
                fontdata={fontdata}
              />
            </Grid>
          )}
        </Grid>
      )}
      <ToastContainer />
    </div>
  );
}
