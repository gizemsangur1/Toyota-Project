import {
  Box,
  Button,
  Grid,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import { maxHeight } from "@mui/system";
import DataGridHata from "../components/DataGridHata";
import Datagrid from "../components/Datagrid";

import { List, AutoSizer } from "react-virtualized";
const ErrorList = lazy(() => import("./BoxItem"));
/**/
export default function HataListeleme() {
  const [showErrorList, setShowErrorList] = useState(false);

 

  const handleClick =  () => {

      setShowErrorList(true);

  };

  return (
    <div>
      {showErrorList && (
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <ErrorList />
        </Suspense>
      )}

      <Grid container direction="row">
        <Grid container item xs={4} alignItems="center" justifyContent="center">
          <Grid item xs={3}>
            <Typography sx={{ textAlign: "center" }}>MONTAJ NO</Typography>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <TextField id="outlined-basic" variant="outlined" />
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Button>ARA</Button>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ textAlign: "center" }}>BODY NO</Typography>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <TextField id="outlined-basic" variant="outlined" />
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Button>ARA</Button>
          </Grid>
        </Grid>
        <Grid container item xs={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Button
              sx={{
                border: 1,
                textAlign: "center",
                width: 100,
                height: 50,
              }}
            >
              YUKARI
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              sx={{
                border: 1,
                textAlign: "center",
                width: 100,
                height: 50,
              }}
            >
              AŞAGI
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Button
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: 100,
                  height: 100,
                }}
              >
                ARAC LİSTESİ
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Button
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: 100,
                  height: 100,
                }}
              >
                MANUEL HATA
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Button
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: 100,
                  height: 100,
                }}
              >
                COKLU HATA
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Button
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: 100,
                  height: 100,
                }}
                onClick={handleClick}
              >
                HATA LİSTESİ
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Button
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: 100,
                  height: 100,
                }}
              >
                HATA KOPYA
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Button
                sx={{
                  border: 1,
                  textAlign: "center",
                  width: 100,
                  height: 100,
                }}
              >
                CİKİS
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
