// setupExecutor.js — Executor Cíclico de Setups
// ATOM - Adaptive Tactical Operating Machine

import { executarComando } from "../infra/comandos.js";
import { criarEntradaLog } from "../log.js"; // ✅ Correção feita aqui

let ativo = true;

// Lista de setups simulados
const setups = [
  {
    nome: "Setup Ouro",
    ativo: "XAUUSD",
    condicao: () => new Date().getSeconds() % 15 === 0,
    acao: () => executarComando("comprar", { ativo: "XAUUSD", volume: 0.20 })
  },
  {
    nome: "Setup EUR",
    ativo: "EURUSD",
    condicao: () => new Date().getSeconds() % 30 === 0,
    acao: () => executarComando("vender", { ativo: "EURUSD", volume: 0.10 })
  }
];

// Iniciar executor cíclico
export function iniciarExecutorDeSetups() {
  criarEntradaLog("sistema", "🎯 Executor de setups iniciado");

  setInterval(() => {
    if (!ativo) return;

    const agora = new Date();
    setups.forEach(setup => {
      if (setup.condicao()) {
        criarEntradaLog("execucao", `✅ Setup ativado: ${setup.nome}`);
        setup.acao();
      }
    });
  }, 1000);
}

// Pausar ou retomar executor
export function definirAtivoExecutor(valor) {
  ativo = valor;
  const status = ativo ? "ativado" : "pausado";
  criarEntradaLog("sistema", `⏹️ Executor ${status}`);
}
