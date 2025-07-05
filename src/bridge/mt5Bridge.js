// ============================================
// MT5 BRIDGE - Comunicação com MetaTrader 5
// Arquivo: mt5Bridge.js
// Finalidade: Simular interface de integração com MT5 (versão mock)
// ============================================

/**
 * Simula a obtenção de dados operacionais do MetaTrader 5
 * @returns {Object} Dados simulados de ativos e métricas
 */
export function obterDadosMT5() {
  return {
    ativos: [
      { simbolo: "EURUSD", lucro: 124.75 },
      { simbolo: "XAUUSD", lucro: -45.20 },
      { simbolo: "BTCUSD", lucro: 302.10 }
    ],
    totalLucro: 381.65,
    drawdown: 1.45,
    modo: "tático",
    operacoes: 18
  };
}

/**
 * Simula o envio de um comando ao MetaTrader 5
 * @param {Object|string} comando - Comando ou instrução a ser enviada
 */
export function enviarComandoMT5(comando) {
  console.log("📡 Comando simulado enviado ao MT5:", comando);
  // Versão real: substituir por WebSocket, REST ou ponte nativa
}

/**
 * Simula conexão com o MetaTrader 5
 */
export function conectarComMT5() {
  console.log("🔌 Iniciando conexão simulada com MetaTrader 5...");
  setTimeout(() => {
    console.log("✅ Conexão simulada com MT5 estabelecida com sucesso.");
  }, 1500);
}

/**
 * Simula desconexão do MetaTrader 5
 */
export function desconectarMT5() {
  console.log("🔌 Encerrando conexão simulada com MetaTrader 5...");
  setTimeout(() => {
    console.log("❎ Conexão simulada com MT5 finalizada.");
  }, 1000);
}
