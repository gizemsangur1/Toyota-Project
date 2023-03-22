import { Button, Grid, ListItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
export default function HataListeleme() {
  return (
    <div>
      <DataGridHata />
      <Grid container direction="row">
        <Grid item xs={2}>
          <Grid container direction="row" sx={{ marginTop: 2 }}>
            <Grid item xs={4}>
              <Typography sx={{ textAlign: "center" }}>MONTAJ NO</Typography>
            </Grid>
            <Grid item xs={8} sx={{ textAlign: "center" }}>
              <TextField id="outlined-basic" variant="outlined" />
            </Grid>
          </Grid>
          <Grid container direction="row" sx={{ marginTop: 2 }}>
            <Grid item xs={4}>
              <Typography sx={{ textAlign: "center" }}>BODY NO</Typography>
            </Grid>
            <Grid item xs={8} sx={{ textAlign: "center" }}>
              <TextField id="outlined-basic" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction="row" sx={{ marginTop: 2 }}>
            <Grid item xs={12}>
              <Button sx={{ marginTop: 2,marginLeft:7,border:1,textAlign:"center",width:100,height:50  }}>YUKARI</Button>
            </Grid>
          </Grid>
          <Grid container direction="row" >
            <Grid item xs={12}>
              <Button sx={{ marginLeft:7,border:1,textAlign:"center",width:100,height:50  }}>AŞAGI</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1.2}>
        <Grid container direction="row" >
            <Grid item xs={12}>
              <Button sx={{ marginTop: 2,marginLeft:7,border:1,textAlign:"center",width:100,height:100  }}>ARAC LİSTESİ</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1.2}>
        <Grid container direction="row" >
            <Grid item xs={12} >
              <Button sx={{ marginTop: 2,marginLeft:7,border:1,textAlign:"center",width:100,height:100  }}>MANUEL HATA</Button>
            </Grid>
            
          </Grid>
        </Grid>
        <Grid item xs={1.2}>
        <Grid container direction="row">
            <Grid item xs={12}>
              <Button sx={{ marginTop: 2,marginLeft:7,border:1,textAlign:"center",width:100,height:100  }}>COKLU HATA</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1.2}>
        <Grid container direction="row" >
            <Grid item xs={12}>
              <Button sx={{ marginTop: 2,marginLeft:7,border:1,textAlign:"center",width:100,height:100  }}>HATA LİSTESİ</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1.2}>
        <Grid container direction="row" >
            <Grid item xs={12}>
              <Button sx={{ marginTop: 2,marginLeft:7,border:1,textAlign:"center",width:100,height:100  }}>HATA KOPYA</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1.2}>
        <Grid container direction="row" >
            <Grid item xs={12}>
              <Button sx={{ marginTop: 2,marginLeft:7,border:1,textAlign:"center",width:100,height:100 }}>CİKİS</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
