import React from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
export default function SelectDate() {
  const months = [
    { value: "January" },
    { value: "February" },
    { value: "March" },
    { value: "April" },
    { value: "May" },
    { value: "June" },
    { value: "July" },
    { value: "August" },
    { value: "September" },
    { value: "October" },
    { value: "November" },
    { value: "December" },
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [day, setDay] = React.useState("");

  const handleChangeD = (d) => {
    setDay(d.target.value);
  };
console.log(day)
  const [month, setMonth] = React.useState("January");

  const handleChange = (event) => {
    setMonth(event.target.value);
  };
  console.log(month);
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleChangeD}
          autoWidth
        >
          {days.map((item) => {
            return (
              <MenuItem key={item.i} value={item.i}>
                {item.i}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select
          labelId="demo-simple-select-autowidth-label"
          onChange={handleChange}
          id="demo-simple-select-autowidth"
          autoWidth
        >
          {months.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          autoWidth
        >
          <MenuItem value={10}>2023</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
