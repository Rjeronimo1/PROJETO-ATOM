// historico.js — Painel Visual de Histórico
// ATOM - Adaptive Tactical Operating Machine

import { listarMemoria } from "../ai/memory.js";

/**
 * Monta o histórico em #painel-historico
 */
export function montarHistorico() {
  const container = document.getElementById("painel-historico");
  if (!container) return;

  container.innerHTML = "";

  const memoria = listarMemoria();

  const blocos = [
    { titulo: "🟢 Comandos",  itens: memoria.comandos },
    { titulo: "🟡 Eventos",   itens: memoria.eventos },
    { titulo: "🔵 Modos",     itens: memoria.modos   }
  ];

  blocos.forEach(({ titulo, itens }) => {
    const div = document.createElement("div");
    div.className = "bloco-historico";

    const h3 = document.createElement("h3");
    h3.textContent = titulo;
    div.appendChild(h3);

    const ul = document.createElement("ul");
    itens.slice().reverse().forEach(it => {
      const ts   = new Date(it.ts).toLocaleTimeString();
      const info = it.comando ?? it.valor ?? it.modo ?? it.tipo;
      const li   = document.createElement("li");
      li.textContent = `[${ts}] ${info}`;
      ul.appendChild(li);
    });

    div.appendChild(ul);
    container.appendChild(div);
  });
}
