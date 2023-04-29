import React, { useEffect, useRef } from 'react'

export default function Drawline(props) {
    const canvasRef = useRef(null); // canvas elemanı için bir referans oluşturun

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d'); // canvas 2d context'i alın

    // ilk koordinatları ayarlayın
    const x1 = props.x1;
    const y1 = props.y1;

    // ikinci koordinatları ayarlayın
    const x2 = props.x2;
    const y2 = props.y2;

    // çizgiyi çizin
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }, [props]);

  return <canvas ref={canvasRef} width={500} height={500} />;

}
