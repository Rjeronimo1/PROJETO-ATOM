/**********************************************************************
 * main.js — Inicialização do painel ATOM + histórico de logs
 * -------------------------------------------------------------------
 * 1) Mostra o histórico de logs em <ul id="lista-historico">
 * 2) Inicia o executor de setups cíclico
 *********************************************************************/

// Ajuste de import: usa obterLogs do log central
import { obterLogs } from "./log.js";
import { iniciarExecutorDeSetups } from "./executor/setupExecutor.js";

/* ----------------------------------------------------------
 * Renderiza o log em <ul id="lista-historico">
 * ---------------------------------------------------------*/
function preencherHistorico() {
  const lista = document.getElementById("lista-historico");
  if (!lista) return;

  lista.innerHTML = "";                           // limpa
  const logs = obterLogs();                       // [{ tipo, mensagem, ts }]
  logs.slice().reverse().forEach(({ tipo, mensagem, ts }) => {
    const li = document.createElement("li");
    li.textContent = `[${new Date(ts).toLocaleTimeString()}] ${mensagem}`;
    li.className = `log-${tipo}`;                 // permite estilizar por CSS
    lista.appendChild(li);
  });
}

/* ----------------------------------------------------------
 * Eventos
 * ---------------------------------------------------------*/
// Atualiza em tempo-real sempre que um novo log é emitido
document.addEventListener("novoLog", preencherHistorico);

// Inicialização: DOM pronto
window.addEventListener("DOMContentLoaded", () => {
  preencherHistorico();
  iniciarExecutorDeSetups();                      // loop setups
});
