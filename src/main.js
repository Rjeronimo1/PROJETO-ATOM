// src/main.js — Inicializador técnico do núcleo ATOM
import { iniciarIA } from "./ai/inteligencia.js";
import { iniciarExecutorDeSetups } from "./executor/setupExecutor.js";
import { ATOM_CORE } from "./core/core.js";
import { falarTexto } from "./infra/audio.js";
import {
  verificarInstalacaoTerminal,
  iniciarTerminalMT5,
  implantarEA
} from "./bridge/executorMT5.js";

// Inicialização principal do ATOM
function iniciarATOM() {
  if (!ATOM_CORE.systemReady) {
    console.warn("⏳ Sistema ainda não pronto. Tentando novamente...");
    setTimeout(iniciarATOM, 500);
    return;
  }

  try {
    iniciarIA();
    iniciarExecutorDeSetups();

    if (verificarInstalacaoTerminal()) {
      iniciarTerminalMT5();
      const caminhoEA = "C:/Users/rober/Documents/MetaTrader 5/MQL5/Experts/ATLAS_SMC_2.7_PRO.ex5";
      implantarEA(caminhoEA);
    }

    falarTexto("ATOM inicializado com sucesso.");
    console.log("✅ ATOM pronto para operar.");
  } catch (erro) {
    console.error("❌ Falha na inicialização do ATOM:", erro);
    falarTexto("Erro na inicialização.");
  }
}

iniciarATOM();
