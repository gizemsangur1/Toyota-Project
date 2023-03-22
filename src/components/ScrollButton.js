import React from 'react'

export default function ScrollButton() {
    let mybutton = document.getElementById("myBtn");


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}
  return (
    <div>
        <button onclick="topFunction()" id="myBtn" title="Go to top">Top</button>
        <button onclick="bottomFunction()" id="myBtn" title="Go to top">Top</button>
    </div>
  )
}
