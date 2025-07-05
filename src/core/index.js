// src/core/index.js — Inicializador Central do Núcleo ATOM
// --------------------------------------------------------
// Estrutura fixada no documento ATOM_MASTER_STRUCTURE
// --------------------------------------------------------

import { iniciarIA }               from "../ai/inteligencia.js";
import { iniciarExecutorDeSetups } from "../executor/setupExecutor.js";
import { ATOM_CORE }               from "./core.js";
import { falarTexto }              from "../infra/audio.js";

// 🔗 Ponte MT5 — funções de inicialização e implantação do EA
import {
  verificarInstalacaoTerminal,   // (checa terminal)
  iniciarTerminalMT5,            // (abre MT5)
  implantarEA                     // (instala EA e reinicia)
} from "../bridge/executorMT5.js";

/* -------------------------------------------------
 * 1. Arranque completo do ATOM
 * ------------------------------------------------*/
function iniciarATOM() {
  // Aguarda núcleo pronto
  if (!ATOM_CORE.systemReady) {
    console.warn("⚠️  Sistema ainda não está pronto; tentando novamente em 500 ms.");
    setTimeout(iniciarATOM, 500);
    return;
  }

  try {
    // --- IA + Executor tático ---
    iniciarIA();
    iniciarExecutorDeSetups();

    // --- Ponte MT5 ---
    if (verificarInstalacaoTerminal()) {
      iniciarTerminalMT5();

      const caminhoEA = "C:/Users/rober/Documents/MetaTrader 5/MQL5/Experts/ATLAS_SMC_2.7_PRO.ex5";
      implantarEA(caminhoEA);
    }

    falarTexto("ATOM inicializado com sucesso.");
    console.log("✅ ATOM pronto para operar.");
  } catch (err) {
    console.error("❌ Falha durante a inicialização do ATOM:", err);
    falarTexto("Erro na inicialização do sistema.");
  }
}

/* -------------------------------------------------
 * 2. Bootstrap: dispara após DOM carregado
 * ------------------------------------------------*/
window.addEventListener("DOMContentLoaded", () => {
  console.log("📦 DOM carregado, disparando bootstrap ATOM…");
  iniciarATOM();
});
