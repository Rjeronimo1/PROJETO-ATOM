// core.js — Núcleo Estratégico do ATOM
// ATOM – Adaptive Tactical Operating Machine
// -------------------------------------------------------------

import { falarTexto }              from "../infra/speech.js";             // ← atualizado
import { registrarEvento }         from "../ai/memory.js";
import { ExecutorMT5 }             from "../executor/executorMT5.js";
import { iniciarExecutorDeSetups } from "../executor/setupExecutor.js";

// -----------------------------------------------------------------
//  Estado global mínimo que outros módulos podem consultar
// -----------------------------------------------------------------
export const ATOM_CORE = {
  systemReady : false,
  mode        : "tático",
  lastSpoken  : "",
  executor    : new ExecutorMT5()
};

// -----------------------------------------------------------------
// 🧠 Registro interno da última ação falada
// -----------------------------------------------------------------
function comandoFalado(texto = "") {
  const msg = texto.trim();
  if (!msg) return;

  ATOM_CORE.lastSpoken = msg;
  registrarEvento("comando", msg);
  falarTexto(`Comando recebido: ${msg}`);
}

// -----------------------------------------------------------------
// 🧾 Logger central
// -----------------------------------------------------------------
function logATOM(texto, tipo = "info") {
  const icon = { info:"ℹ️", success:"✅", warning:"⚠️", error:"❌" }[tipo] || "🔷";
  const linha = `${icon} ${texto}`;
  console.log(linha);
  registrarEvento("log", linha);
}

// -----------------------------------------------------------------
// 🚀 Execução directa de ordens (buy / sell / close)
// -----------------------------------------------------------------
function executarOrdem(tipo, dados) {
  if (!tipo || !dados) {
    logATOM("Dados inválidos para executar ordem", "error");
    return;
  }
  ATOM_CORE.executor.enviarOrdem(tipo, dados);
  logATOM(`Ordem ${tipo} enviada: ${JSON.stringify(dados)}`, "success");
}

// -----------------------------------------------------------------
// 🔄 Bootstrap geral – ajustado para navegador OU Node.js
// -----------------------------------------------------------------
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    ATOM_CORE.systemReady = true;
    iniciarExecutorDeSetups();          // inicia executor em loop
    logATOM("Sistema pronto (DOM carregado).");
  });
} else {
  // Ambiente Node.js
  ATOM_CORE.systemReady = true;
  logATOM("Sistema inicializado via Node.js.");
}

// -----------------------------------------------------------------
// Exportações públicas do módulo
// -----------------------------------------------------------------
export { comandoFalado, logATOM, executarOrdem };
