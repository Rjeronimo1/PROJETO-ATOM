// src/ui/painel.js

import { logMensagem } from "../logger/logger.js";
import { atualizarGrafico } from "../grafico/graficoLive.js";

document.getElementById("btn-buy").addEventListener("click", () => {
  logMensagem("Ordem de COMPRA enviada.");
  atualizarGrafico(Math.random() * 150);
});

document.getElementById("btn-sell").addEventListener("click", () => {
  logMensagem("Ordem de VENDA enviada.");
  atualizarGrafico(Math.random() * 150);
});

document.getElementById("btn-close").addEventListener("click", () => {
  logMensagem("Todas as ordens foram FECHADAS.");
  atualizarGrafico(Math.random() * 150);
});
