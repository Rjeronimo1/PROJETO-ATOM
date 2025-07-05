// src/config/config.js

export const ATOM_CONFIG = {
  nome: "ATOM — Adaptive Tactical Operating Machine",
  versao: "1.0.0",
  modo: "TÁTICO", // CONSERVADOR | TÁTICO | AGRESSIVO
  riscoDiario: 0.01, // 1%
  drawdownMaximo: 0.05, // 5%
  ativosPermitidos: ["XAUUSD", "BTCUSD", "NAS100", "EURUSD"],
  IA_ativa: true,
  voz_ativa: true,
  logs_ativos: true
};
