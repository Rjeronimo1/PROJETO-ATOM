// hotkeys.js — Atalhos de Teclado ATOM
// -------------------------------------

import { executarComando } from "../infra/comandos.js";
import { logATOM }          from "../logger/logger.js";   // ← ajuste de caminho

export function registrarAtalhosTeclado() {
  document.addEventListener("keydown", (e) => {
    if (!e.ctrlKey) return;        // só reage a combinações Ctrl + …

    const map = {
      b: { cmd: "comprar", label: "🟢 Comprar" },
      s: { cmd: "vender",  label: "🔴 Vender"  },
      e: { cmd: "editor",  label: "🛠️ Abrir MetaEditor" },
      p: { cmd: "pausar",  label: "⏸️ Pausar sistema" },
      r: { cmd: "retomar", label: "▶️ Retomar sistema" }
    };

    const alvo = map[e.key.toLowerCase()];
    if (alvo) {
      e.preventDefault();                       // evita conflito nativo
      executarComando(alvo.cmd);
      logATOM(`Atalho: Ctrl + ${e.key.toUpperCase()} → ${alvo.label}`, "info");
    }
  });
}

