// src/grafico/graficoLive.js

const canvas = document.getElementById("grafico-live");
const ctx = canvas.getContext("2d");

let pontos = [];

function desenharGrafico() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 2;

  pontos.forEach((y, i) => {
    const x = i * 5;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}

export function atualizarGrafico(valor) {
  if (pontos.length >= canvas.width / 5) pontos.shift();
  pontos.push(valor);
  desenharGrafico();
}
