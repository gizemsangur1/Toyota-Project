import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState, lazy, Suspense } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { toast, useToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const Hatalistesi = lazy(() => import("../components/Hatalistesi"));

export default function HataListeleme(props) {
  const { t, i18n } = useTranslation();
  const [filterText1, setFilterText1] = useState("");
  const [filterText2, setFilterText2] = useState("");
  const [info, setInfo] = useState("");
  const [info2, setInfo2] = useState("");
  const handleFilter = (e) => {
    e.preventDefault();
    setFilterText1(e.target.value);
    setFilterText2(e.target.value);
  };

  const handleSearchM = () => {
    setInfo2(filterText2);
  };
  const handleSearchB = () => {
    setInfo(filterText1);
  };
  const [showErrorList, setShowErrorList] = useState(false);

  const handleClick = () => {
    setShowErrorList(true);
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll(direction) {
    const scrollStep = 100;
    const box = document.getElementById("my-grid");
    if (box) {
      if (direction === "up") {
        setScrollPosition(Math.max(scrollPosition - scrollStep, 0));
        box.scrollTop = Math.max(box.scrollTop - scrollStep, 0);
      } else if (direction === "down") {
        setScrollPosition(
          Math.min(
            scrollPosition + scrollStep,
            box.scrollHeight - box.clientHeight
          )
        );
        box.scrollTop = Math.min(
          box.scrollTop + scrollStep,
          box.scrollHeight - box.clientHeight
        );
      }
    }
  }
  const theme2 = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "2",
            border: "1",
            color: "black",
            margin: 3,
            fontSize: "20px",
            width: "auto",
            height: "auto",
            minWidth: "8vw",
            minHeight: "14vh",
          },
        },
      },
    },
  });
  return (
    <div>
      <Box
        sx={{
          height: "550px",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        {showErrorList && (
          <Suspense
            fallback={
              <div
                style={{
                  width: "100%",
                  backgroundColor: "darkviolet",
                  top: 0,
                  position: "fixed",
                  height: "3px",
                }}
              ></div>
            }
          >
            <Hatalistesi
              handleScroll={handleScroll}
              filterText1={info}
              filterText2={info2}
            />
          </Suspense>
        )}
      </Box>
      <Grid
        container
        direction="row"
        sx={{ backgroundColor: "white", textAlign: "center" }}
      >
        <Grid
          container
          direction="row"
          item
          sm={12}
          md={5}
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ textAlign: "center" }}
          >
            <Grid item xs={2}>
              <Typography sx={{ textAlign: "center" }}>{t("MNo")}</Typography>
            </Grid>
            <Grid item xs={5} sx={{ textAlign: "center" }}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={filterText2}
                onChange={(e) => setFilterText2(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Button
                onClick={handleSearchM}
                sx={{
                  border: 1,
                  borderRadius: 1,
                  color: "black",
                  width: "auto",
                  height: "auto",
                  minWidth: "8vw",
                  minHeight: "7vh",
                }}
              >
                {t("Search")}
              </Button>
            </Grid>{" "}
            <Grid item xs={2} sx={{ textAlign: "center" }}>
              <Button
                variant="primary"
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: "auto",
                  height: "auto",
                  minWidth: "7vw",
                  minHeight: "7vh",
                }}
                onClick={() => handleScroll("up")}
              >
                <KeyboardArrowUpIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={2}>
              <Typography sx={{ textAlign: "center" }}>{t("BNo")}</Typography>
            </Grid>
            <Grid item xs={5} sx={{ textAlign: "center" }}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={filterText1}
                onChange={(e) => setFilterText1(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Button
                onClick={handleSearchB}
                sx={{
                  border: 1,
                  borderRadius: 1,
                  color: "black",
                  width: "auto",
                  height: "auto",
                  minWidth: "8vw",
                  minHeight: "7vh",
                }}
              >
                {t("Search")}
              </Button>
            </Grid>{" "}
            <Grid item xs={2} sx={{ textAlign: "center" }}>
              <Button
                variant="primary"
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: "auto",
                  height: "auto",
                  minWidth: "7vw",
                  minHeight: "7vh",
                }}
                onClick={() => handleScroll("down")}
              >
                <KeyboardArrowDownIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/*  <Grid
          container
          item
          xs={12}
          md={2}
          alignItems="center"
          justifyContent="center"
        ></Grid> */}
        <ThemeProvider theme={theme2}>
          <Grid
            container
            sm={12}
            md={7}
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item xs={6} sm={4} md={2}>
              <Button
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  minWidth: "8vw",
                  minHeight: "17vh",
                }}
              >
                {t("VL")}
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Button
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  minWidth: "8vw",
                  minHeight: "17vh",
                }}
              >
                {t("ME")}
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Button
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  minWidth: "8vw",
                  minHeight: "17vh",
                }}
              >
                {t("MultiE")}
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Button
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  minWidth: "8vw",
                  minHeight: "17vh",
                }}
                onClick={handleClick}
              >
                {t("EL")}
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Button
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  minWidth: "8vw",
                  minHeight: "17vh",
                }}
              >
                {t("EC")}
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Button
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  minWidth: "8vw",
                  minHeight: "17vh",
                }}
                onClick={goBack}
              >
                {t("Exit")}
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </div>
  );
}
