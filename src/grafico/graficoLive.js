import { logMensagem } from "/src/logger/logger.js";

const dados = [];
const canvas = document.getElementById("grafico-live");
const ctx = canvas.getContext("2d");

document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    if (dados.length >= canvas.width) dados.shift();
    dados.push(gerarDado());
    desenharGrafico();
  }, 300);
});

function gerarDado() {
  const ultimo = dados.length ? dados[dados.length - 1] : 100;
  const variacao = (Math.random() - 0.5) * 5;
  return Math.max(10, ultimo + variacao);
}

function desenharGrafico() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 2;
  ctx.moveTo(0, canvas.height - dados[0]);

  for (let i = 1; i < dados.length; i++) {
    ctx.lineTo(i, canvas.height - dados[i]);
  }

  ctx.stroke();
}

export function atualizarGrafico(valor) {
  if (dados.length >= canvas.width) {
    dados.shift();
  }
  dados.push(valor);
  desenharGrafico();
}
