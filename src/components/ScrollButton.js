/* import React from 'react'

export default function ScrollButton() {
    let mybutton = document.getElementById("myBtn");


window.onscroll = function() {scrollFunction()};

const  scrollFunction=()=> {
  if ( document.getElementsByTagName('FormControl').scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


const  topFunction=()=> { 
  document.getElementsByTagName('FormControl').scrollTop = 0; 
}
  return (
    <div>
        <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>
        <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>
    </div>
  )
}
 */
import React from 'react';
import ReactDOM from 'react-dom';

function ScrollButton(props) {
    const handleClick = (direction, event) => {
        event.preventDefault(); // butonun varsayılan davranışını engelle
        const selectElement = document.getElementById('my-select');
        if (selectElement) {
          const scrollAmount = 100; // sabit bir değer
          selectElement.scrollTop += direction === 'up' ? -scrollAmount : scrollAmount;
        }
      };

  return (
    <div>
      <button onClick={(event) => handleClick('up',event)}>Yukarı</button>
      <button onClick={(event) => handleClick('down',event)}>Aşağı</button>
    </div>
  );
}


export default ScrollButton;