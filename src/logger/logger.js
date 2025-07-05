// src/logger/logger.js

export function logMensagem(texto) {
  const logContainer = document.getElementById("log-container");
  const linha = document.createElement("div");
  linha.textContent = `[${new Date().toLocaleTimeString()}] ${texto}`;
  logContainer.appendChild(linha);
  logContainer.scrollTop = logContainer.scrollHeight;
}
