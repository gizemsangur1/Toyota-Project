import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ScrollButton from "./ScrollButton";
import Autocomplete from "@mui/material/Autocomplete";
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';

import { TabScrollButton } from '@mui/material';
export default function TerminlList() {


  function scrollUp()
  {
    document.getElementsByClassName("MuiMenu-list css-rpp6kk-MuiMenu-list").scrollTop -= 20;
  }
  
  function scrollDown()
  {
    document.getElementsByClassName("MuiMenu-list css-rpp6kk-MuiMenu-list").scrollDown += 20;
  }


  const [term, setTerm] = React.useState("CHASSIS-2");

  const handleChange = (event) => {
    setTerm(event.target.value);
    let terminalname = event.target.value;
    console.log(terminalname);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3003/data")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = data.map((data, index) => {
    return (
      <MenuItem key={data.terMId} value={data.termName} sx={{ m: 1, minWidth: 300 }}>
        {data.termName}
      </MenuItem>
    );
  });
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 230 }}>
       
          <Select 
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            autoWidth
            onChange={handleChange}
            value={term}
          >
            {arr}
            <ScrollButton/>
          </Select>
        
      </FormControl>
    </div>
  );
}
