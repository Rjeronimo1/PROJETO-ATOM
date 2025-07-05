// interface.js — Painel Visual Interativo do ATOM
// ------------------------------------------------
// Local: src/ui/interface.js

import { executarComando } from "../infra/comandos.js";
import { falarTexto }      from "../infra/speech.js";     // ← voz padrão browser
import { logATOM }         from "../logger/logger.js";    // ← logger central

/**
 * Conecta todos os botões com atributo data-comando ao executor de comandos.
 */
export function configurarInterface() {
  document.querySelectorAll("[data-comando]").forEach(botao => {
    botao.addEventListener("click", () => {
      const acao = botao.dataset.comando;
      executarComando(acao);
      falarTexto(`Comando ${acao} acionado`);
      logATOM(`🧩 Botão pressionado: ${acao}`, "info");
    });
  });
}

/* Inicializa automaticamente após o carregamento do DOM */
window.addEventListener("DOMContentLoaded", configurarInterface);
