// menu.js — Interface de Comandos Visuais
// ----------------------------------------------------
// Local: src/ui/menu.js

import { executarComando } from "../infra/comandos.js";
import { falarTexto }      from "../infra/speech.js";     // ← voz oficial
import { logATOM }         from "../logger/logger.js";    // ← logger central

/**
 * Gera dinamicamente botões de comando no elemento #menu-comandos
 * @param {Array<{ nome:string, acao:string }>} listaComandos
 */
export function criarMenuComandos(listaComandos = []) {
  const container = document.getElementById("menu-comandos");
  if (!container) return;

  container.innerHTML = ""; // limpa menu anterior

  listaComandos.forEach(({ nome, acao }) => {
    const btn = document.createElement("button");
    btn.innerText  = nome;
    btn.className  = "botao-comando";
    btn.dataset.acao = acao;

    btn.addEventListener("click", () => {
      falarTexto(`Executando ${nome}`);
      executarComando(acao);
      logATOM(`🖱️  Click menu: ${acao}`, "info");
    });

    container.appendChild(btn);
  });
}

/* Exemplo de uso automático (opcional):
window.addEventListener("DOMContentLoaded", () => {
  criarMenuComandos([
    { nome: "Comprar", acao: "comprar" },
    { nome: "Vender",  acao: "vender"  },
    { nome: "Fechar",  acao: "fechar"  }
  ]);
});
*/
