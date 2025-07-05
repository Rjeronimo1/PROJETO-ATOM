// log.js — Log Central de Eventos ATOM
// -----------------------------------------------

const logs = [];
const LIMITE_LOGS = 300;

/**
 * Registra uma nova entrada no log central.
 * @param {string} tipo      info | success | warning | error | sistema
 * @param {string} mensagem  texto a registrar
 */
export function criarEntradaLog(tipo = "sistema", mensagem = "") {
  const entrada = { tipo, mensagem, ts: Date.now() };

  logs.push(entrada);
  if (logs.length > LIMITE_LOGS) logs.shift();

  // 🔔 Dispara evento DOM se estiver em browser
  if (typeof document !== "undefined") {
    document.dispatchEvent(
      new CustomEvent("novoLog", { detail: entrada })
    );
  }
}

/** Retorna uma cópia segura dos logs atuais */
export function obterLogs() {
  return [...logs];
}

/** Apaga todo o histórico de logs */
export function limparLogs() {
  logs.length = 0;
}
