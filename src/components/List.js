import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
export default function List(props) {

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log(selectedValue)
   
  };
  useEffect(()=>{
    props.GetDataValue(selectedOption)
  }
  )
 
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/JsonFiles/HataListesi.json")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  function HandleClick(){
    setGoster(!goster);
    
  }
  const [goster, setGoster] = useState(false);
  const arr = data.map((data, index) => {
    return (
    <Grid key={index}>
        {data.partDefects.map((subitem,i)=>{
            return(
                <MenuItem
                key={i}
                /* value={subitem.defectName} */
                onChange={handleChange}
                onClick={HandleClick}
                value={selectedOption}
                sx={{ minWidth: 200, borderBottom: 1 ,backgroundColor: " #c6ffc8"}}
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
         
      
          {arr}
        
      
    </div>
  );
}
