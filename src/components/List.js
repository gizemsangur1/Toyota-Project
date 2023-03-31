import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
export default function List(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3008/data")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = data.map((data, index) => {
    return (
    <Grid>
        {data.partDefects.map((subitem,i)=>{
            return(
                <MenuItem
                key={subitem.defectId}
                value={subitem.defectName}
                sx={{ minWidth: 200, borderBottom: 1 }}
              >
                {subitem.defectName}
              </MenuItem>
            )
        })}
    </Grid>
    );
  });
  return (
    <div>
      <Grid container direction="row" >
        <Grid item>
          <Grid
            sx={{
              overflowY: "scroll",
              overflowX: "hidden",
              maxHeight: "300px",
              width: 220,
              border: 1,
              backgroundColor:"green"
            }}
            container
          >
            {arr}
          </Grid>
        </Grid>
        <Grid item>
          <Button sx={{backgroundColor:"green"}}>YUKARI</Button>
          <Button sx={{backgroundColor:"green"}}>ASAGI</Button>
        </Grid>
        
      </Grid>
    </div>
  );
}
