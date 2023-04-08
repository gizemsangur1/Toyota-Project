import {
  Button,
  FormControlLabel,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "mui-image";
import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Calculate, CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Svg from "../components/Svg";
import Svg2 from "../components/Svg2";
import HataForm from "../components/HataForm";
import BuyukFont from "../components/BuyukFont";

/*Ikinci kod */
export default function HataGiris(props) {
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
  const [termlist, setTermlist] = useState("");

  const GetData = (value) => {
    setTermlist(value);
  };
  console.log(termlist);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleMenuSelect = () => {
    setIsButtonDisabled(false);
  };
   const navigate = useNavigate();

  const navigateToHataListesi = () => {
    navigate("/HataListeleme");
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/Header.json")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [showComponent2, setShowComponent2] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [showForm, setShowForm] = useState(false);
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
  }
  function handlesvgclick() {}
  function closeform() {
    setShowForm(false);
  }
  function buyukFont() {
    setShowComponent(true);
  }
  function closebuyukfont() {
    setShowComponent(false);
  }
  return (
    <div>
      {showComponent ? (
        <BuyukFont
          onClick={closebuyukfont}
          onMenuSelect={handleMenuSelect}
          GetDataValue={GetData}
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
            sx={{ border: 1, borderRadius: 1 }}
          >
            <Grid item xs={9}>
              <Grid container direction="row">
                <Grid item xs={2}>
                  <Typography>Montaj No</Typography>
                  {data.map((item) => (
                    <Typography key={item.modelId}>{item.assyNo}</Typography>
                  ))}
                </Grid>
                <Grid
                  container
                  item
                  xs={2}
                  sx={{
                    border: 1,
                    borderRadius: 1,
                  }}
                >
                  <Grid container item xs={12}>
                    <Typography>Body No</Typography>
                  </Grid>
                  <Grid container item xs={12}>
                    {data.map((item) => (
                      <Typography key={item.modelId}>{item.bodyNo}</Typography>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography>HATA GİRİŞ EKRANI</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>RENK</Typography>
                  {data.map((item) => (
                    <Typography key={item.modelId}>{item.extCode}</Typography>
                  ))}
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
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
                      GetDataValue={GetData}
                    />
                  ) : (
                    <Svg onClick={handlerectclick} />
                  )}
                </Box>
              </Grid>
              <Grid container direction="row">
                <Grid item xs={12}>
                  <ThemeProvider theme={theme2}>
                    <Button variant="outlined" onClick={handlesvg}>
                      MODELİN İLK RESMİ
                    </Button>
                    <Button variant="outlined">GERİ</Button>
                    <Button
                       onClick={navigateToHataListesi} variant="outlined"
                    >
                      HATA LİSTESİ
                    </Button>
                    <Button variant="outlined">TEMİZLE</Button>
                    <Button variant="outlined" onClick={buyukFont}>BÜYÜK FONT</Button>
                  </ThemeProvider>
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
                    HIZLI KAYDET
                  </Button>
                </Grid>
                <Grid container item xs={12}>
                  <Button disabled variant="outlined">
                    KAYDET GEÇ
                  </Button>
                </Grid>
                <Grid container item xs={12}>
                  <Button
                    disabled={isButtonDisabled}
                    onClick={openForm}
                    variant="outlined"
                  >
                    HATA KAYIT
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography>MONTAJ NO</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Input></Input>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined">ARA</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined">TERMİNAL İLK RESMİ</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined">SIK GELEN HATA</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined">MANİFEST</Button>
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
              <HataForm onClick={closeform} />
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
}
