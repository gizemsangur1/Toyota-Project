import { useState } from "react";
import React from 'react'

/* ikinci kod  */
export default function Pointer() {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
  
    function handleClick(e) {
      setX(e.clientX);
      setY(e.clientY);
    }
  
    return (
      <>
        <svg  onClick={handleClick}>
          <circle cx={x} cy={y} r="10" fill="red" />
        </svg>
      </>
    );
  }
