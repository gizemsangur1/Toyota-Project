import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


export default function SelectDate() {
  const months = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "10" },
    { value: "11" },
    { value: "12" },
  ];
  const years = Array.from({ length: 100 }, (_, i) => 2023 - i);

  const [day, setDay] = React.useState("1");
  const [month, setMonth] = React.useState("1");
  const [year, setYear] = React.useState("2023");
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
    month === "2"
      ? (year % 4 === 0 && year % 100 !== 0) || year % 4 === 0
        ? Array.from({ length: 29 }, (_, i) => i + 1)
        : Array.from({ length: 28 }, (_, i) => i + 1)
      : ["4", "6", "8", "10"].includes(month)
      ? Array.from({ length: 30 }, (_, i) => i + 1)
      : Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleChangeD}
          value={day}
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
