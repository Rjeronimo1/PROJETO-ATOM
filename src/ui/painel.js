// src/ui/painel.js
import { logMensagem }      from "/src/logger/logger.js";
import { atualizarGrafico } from "/src/grafico/graficoLive.js";
import { executarOrdem }    from "/src/executor/executorMT5.js";  // integra MT5

document.addEventListener("DOMContentLoaded", () => {
  const botaoCompra = document.getElementById("btn-buy");
  const botaoVenda  = document.getElementById("btn-sell");
  const botaoFechar = document.getElementById("btn-close");

  botaoCompra.addEventListener("click", () => {
    logMensagem("Ordem de COMPRA enviada.");
    executarOrdem("buy");
    atualizarGrafico(Math.random() * 150);
  });

  botaoVenda.addEventListener("click", () => {
    logMensagem("Ordem de VENDA enviada.");
    executarOrdem("sell");
    atualizarGrafico(Math.random() * 150);
  });

  botaoFechar.addEventListener("click", () => {
    logMensagem("Todas as ordens foram FECHADAS.");
    executarOrdem("fechar");
    atualizarGrafico(Math.random() * 150);
  });
});
