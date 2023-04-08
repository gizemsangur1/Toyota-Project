import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ScrollButton from "./ScrollButton";
import Autocomplete from "@mui/material/Autocomplete";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import List from "../components/List";
import { TabScrollButton } from "@mui/material";

/* birinci kod */
export default function TerminlList(props) {

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    
  };
  useEffect(()=>{
    props.GetDataValue(selectedOption)
  }

  )
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/LoginList.json")
      .then((res) => {
       
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
 
  const arr = data.map((data, index) => {
    return (
      <MenuItem
        key={index}
        value={data.lastAssyNo}
        sx={{  minWidth: 300, backgroundColor: " #c6ffc8" }}
      >
        {data.termName}
      </MenuItem>
    );
  });
  return (
    <div>
    
      <FormControl sx={{ minWidth: 230, backgroundColor: " #c6ffc8" }}>
        <Select
          onChange={handleChange}
          value={selectedOption}
          sx={{ backgroundColor: " #c6ffc8" }}
        >
          {arr}
        </Select>
      </FormControl>
    </div>
  );
}
