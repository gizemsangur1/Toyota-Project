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
  const years = Array.from({ length: 100 }, (_, i) => 2023 - i);

  const [day, setDay] = React.useState("1");
  const [month, setMonth] = React.useState("January");
  const [year, setYear] = React.useState("2023");
  const tarih = "day" + "month" + "year";
  const handleChangeD = (d) => {
    setDay(d.target.value);
  };

  const handleChangeM = (m) => {
    setMonth(m.target.value);
  };

  const handleChangeY = (y) => {
    setYear(y.target.value);
  };

  const days =
    month === "February"
      ? (year % 4 === 0 && year % 100 !== 0) || year % 4 === 0
        ? Array.from({ length: 29 }, (_, i) => i + 1)
        : Array.from({ length: 28 }, (_, i) => i + 1)
      : ["April", "June", "September", "November"].includes(month)
      ? Array.from({ length: 30 }, (_, i) => i + 1)
      : Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleChangeD}
          value={day} // Value prop'u eklenir
          autoWidth
        >
          {days.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select
          labelId="demo-simple-select-autowidth-label"
          onChange={handleChangeM}
          value={month}
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
          onChange={handleChangeY}
          autoWidth
          value={year}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
