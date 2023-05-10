import {
  Button,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import {resetAll} from '../components/Store';
import { useTranslation } from "react-i18next";
export default function HataGiris(props) {
  const{t,i18n}=useTranslation();
   const coord = useSelector((state) => state.coord);
  const [clickedCoordinates, setClickedCoords] = useState([]);
  const notifyMe = () => {
    toast.success("Kaydedildi!", {
      position: toast.POSITION.TOP_CENTER,
    });
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
            margin: 5,
            fontSize: 15,
            height: 50,
            width: 200,
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
            fontSize: 15,
            height: 60,
            width: 120,
          },
        },
      },
    },
  });
  const dispatch = useDispatch();

  const termname = useSelector(state => state.termname);
  const partname = useSelector(state => state.partname);
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
    clickedCoords:clickedCoordinates,
  };


  const handleMenuSelect = () => {
    setIsButtonDisabled(false);
  };
  const navigate = useNavigate();

  const navigateToHataListesi = () => {
    navigate("/HataListeleme");
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
        <BuyukFont
          onClick={closebuyukfont}
          onMenuSelect={handleMenuSelect}
        />
      ) : (
        <Grid container direction="row">
          <Grid item xs={2}></Grid>
          <Grid
            container
            item
            xs={8}
            justifyContent="center"
            alignItems="center"
            sx={{ border: 1, borderRadius: 1, textAlign: "center" }}
          >
            <Grid item xs={9}>
              <Grid container direction="row"  >
              <BuyukfontHeader/>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{width:"50vw"}}
              >
                <Box
                  sx={{
                    width: "100%",
                    margin: 0,
                  }}
                >
                  {showComponent2 ? (
                    <Svg2
                      onClick={handlesvgclick}
                      onMenuSelect={handleMenuSelect}
                      clickedCoordinates={clickedCoordinates}
                     
                    />
                  ) : (
                    <Svg onClick={handlerectclick} />
                  )}
                </Box>
              </Grid>
              <Grid container direction="row">
                <Grid item xs={12}>
                  <ThemeProvider theme={theme2}>
                    <Button variant="outlined" onClick={handlesvg} sx={{fontSize:"10px"}}>
                    {t('Mfp')}
                    </Button>
                    <Button variant="outlined" onClick={navigateBack}>{t('Back')}</Button>
                    <Button onClick={navigateToHataListesi} variant="outlined">
                      {t('EL')}
                    </Button>
                    <Button variant="outlined">{t('Cl')}</Button>
                    <Button variant="outlined" onClick={buyukFont}>
                      {t('BF')}
                    </Button>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12}>
                  {showselected && <Typography> {partname}</Typography>}
                </Grid>
              </Grid>
            </Grid>
            <ThemeProvider theme={theme}>
              <Grid container item xs={3}>
                <Grid container item xs={12}>
                  <FormControlLabel
                    control={<CheckBoxOutlineBlank defaultChecked />}
                    label="Harigami"
                  />
                  <FormControlLabel
                    control={<CheckBoxOutlineBlank defaultChecked />}
                    label="RDD"
                  />
                </Grid>
                <Grid container item xs={12}>
                  <Button disabled variant="outlined">
                    {t('FR')}
                  </Button>
                </Grid>
                <Grid container item xs={12}>
                  <Button disabled variant="outlined">
                    {t('RP')}
                  </Button>
                </Grid>
                <Grid container item xs={12}>
                  <Button
                    disabled={isButtonDisabled}
                    onClick={openForm}
                    variant="outlined"
                  >
                    {t('ER')}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{t('MNo')}</Typography>
                </Grid>
                <Grid item xs={12}>
                  {data.map((item, i) => (
                    <TextField value={item.assyNo} key={i}>
                      {item.assyNo}
                    </TextField>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined">{t('Search')}</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined">{t('TFP')}</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined">{t('FE')}</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined">MANİFEST</Button>
                </Grid>
                <Grid item xs={12}>
                  {showselected && <Typography> {termname}</Typography>}
                </Grid>
              </Grid>
            </ThemeProvider>
          </Grid>
          <Grid item xs={2}></Grid>
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
                height: "90%",
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
