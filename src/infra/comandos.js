// comandos.js — Roteador de Comandos ATOM
// ----------------------------------------
// Local: /src/infra/comandos.js

import { falarTexto } from "./speech.js";                 // ← substituído para speech.js
import { ExecutorMT5 } from "../executor/executorMT5.js";
import { comandoFalado } from "../core/core.js";

const executor = new ExecutorMT5();

export function executarComando(comando, dados = {}) {
  switch (comando.toLowerCase()) {
    case "comprar":
    case "buy":
      executor.enviarOrdem("buy", dados);
      comandoFalado("Ordem de compra enviada.");
      break;

    case "vender":
    case "sell":
      executor.enviarOrdem("sell", dados);
      comandoFalado("Ordem de venda enviada.");
      break;

    case "fechar":
    case "close":
      executor.fecharOrdem(dados.ticket);
      comandoFalado(`Ordem ${dados.ticket} encerrada.`);
      break;

    case "stop":
      executor.ajustarStop(dados.ticket, dados.valor);
      comandoFalado("Stop ajustado.");
      break;

    case "pausar":
      executor.pausarSistema();
      comandoFalado("Sistema pausado.");
      break;

    case "retomar":
      executor.retomarSistema();
      comandoFalado("Sistema retomado.");
      break;

    case "editor":
      executor.abrirEditor();
      comandoFalado("Abrindo MetaEditor.");
      break;

    case "mensagem":
      executor.enviarMsg(dados.texto);
      comandoFalado(`Mensagem enviada: ${dados.texto}`);
      break;

    default:
      falarTexto("Comando não reconhecido.");
  }
}
