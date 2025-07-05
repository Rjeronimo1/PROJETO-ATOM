// =============================================
// INTELIGÊNCIA ADAPTATIVA — ATOM AI CORE
// inteligencia.js  •  Versão Alpha-1.2
// =============================================

import { ATOM_CORE, logATOM }                 from "../core/core.js";
import { falarTexto }                         from "../infra/speech.js";   // ← atualizado
import { registrarEvento, carregarMemoria }   from "./memory.js";

// -----------------------------------------------------------------------------
// 1. ANÁLISE DE CONTEXTO TÁTICO
// -----------------------------------------------------------------------------
export function analisarContexto() {
  const hora = new Date().getHours();
  const modo = ATOM_CORE.mode;

  // Agressivo fora do horário principal
  if (modo === "agressivo" && (hora < 8 || hora > 18)) {
    logATOM("⚠️ Agressivo fora do horário principal.", "warning");
    falarTexto("Modo agressivo fora do horário. Recomendo ajuste.");
    registrarEvento("sugestao", "modo fora do horário ideal");
  }

  // Conservador em horário de alta liquidez
  if (modo === "conservador" && hora >= 9 && hora <= 12) {
    logATOM("📈 Conservador em horário de oportunidade.", "info");
    registrarEvento("info", "modo conservador em alta liquidez");
  }

  // Baixa liquidez (madrugada)
  if (hora >= 3 && hora <= 6) {
    registrarEvento("contexto", "Horário de baixa liquidez detectado");
  }
}

// -----------------------------------------------------------------------------
// 2. AJUSTE DINÂMICO DE MODO
// -----------------------------------------------------------------------------
export function sugerirAjuste() {
  const memoria = ATOM_CORE.logHistory || [];
  const ultimos = memoria.slice(-5);
  const falhas  = ultimos.filter((e) => e.includes("falha")).length;

  if (falhas >= 5) {
    registrarEvento("ajuste",
      "5 falhas detectadas — ativando modo conservador temporário");
    ATOM_CORE.mode = "conservador";

    setTimeout(() => {
      ATOM_CORE.mode = "tático";
      registrarEvento("ajuste", "Modo tático restaurado automaticamente");
    }, 300_000); // 5 min
  }
}

// -----------------------------------------------------------------------------
// 3. PADRÕES DE USO (Histórico local)
// -----------------------------------------------------------------------------
let historicoModos = [];

export function registrarModo(modoAtual) {
  historicoModos.push(modoAtual);
  if (historicoModos.length > 20) historicoModos.shift();
}

function verificarPadroesDeUsoLocal() {
  if (historicoModos.length < 10) return;

  const ultimosModos = historicoModos.slice(-5);
  const repetidos    = ultimosModos.every((m) => m === ultimosModos[0]);

  if (repetidos) {
    registrarEvento("padrao",
      `Modo operando continuamente em ${ultimosModos[0]}`);
  }
}

// -----------------------------------------------------------------------------
// 4. AUTO-SABOTAGEM (5 falhas consecutivas)
// -----------------------------------------------------------------------------
function detectarAutoSabotagem(memoria) {
  const falhas   = memoria.comandos.filter((c) => c.resultado === "falha");
  const ultimas5 = falhas.slice(-5);

  if (ultimas5.length === 5) {
    registrarEvento("auto-sabotagem", "5 falhas consecutivas detectadas");
    logATOM("⚠️ Possível auto-sabotagem identificada.", "warning");

    ATOM_CORE.mode        = "conservador";
    ATOM_CORE.systemReady = false;

    setTimeout(() => {
      ATOM_CORE.systemReady = true;
      registrarEvento("recuperacao", "Sistema reativado após contenção");
    }, 60_000); // 1 min
  }
}

// -----------------------------------------------------------------------------
// 5. PADRÕES DE COMANDO NA MEMÓRIA PERSISTENTE
// -----------------------------------------------------------------------------
export function gerarEstatisticasDeComandos(memoria) {
  const mapa = {};
  for (const entrada of memoria.comandos) {
    const cmd = entrada.comando.toLowerCase();
    mapa[cmd] = (mapa[cmd] || 0) + 1;
  }
  return Object.entries(mapa).sort((a, b) => b[1] - a[1]);
}

function verificarPadroesDeUsoMemoria() {
  const dados = carregarMemoria();
  if (!dados || !dados.comandos) return;

  // Estatísticas básicas
  const stats = gerarEstatisticasDeComandos(dados);
  if (stats[0] && stats[0][1] >= 5) {
    falarTexto(
      `Você repetiu muito o comando ${stats[0][0]}. Deseja automatizar?`
    );
    registrarEvento("sugestao", `Comando repetido: ${stats[0][0]}`);
  }

  detectarAutoSabotagem(dados);
}

// -----------------------------------------------------------------------------
// 6. CICLO INTELIGENTE PERIÓDICO
// -----------------------------------------------------------------------------
export function ativarCicloInteligente() {
  setInterval(() => {
    if (!ATOM_CORE.systemReady) return;

    analisarContexto();
    sugerirAjuste();
    verificarPadroesDeUsoLocal();
    verificarPadroesDeUsoMemoria();
  }, 20_000); // 20 s
}
