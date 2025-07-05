/**********************************************************************
 * motor.js — Núcleo de Decisão e Fluxo Tático do ATOM
 * ---------------------------------------------------
 * Executa em Node.js, mas mantém fallback de voz para browser.
 *********************************************************************/

// Voz (seleciona módulo certo conforme ambiente)
const usarBrowser = typeof window !== "undefined";
const { falarTexto } = usarBrowser
  ? await import("../infra/speech.js")
  : await import("../infra/audioNode.js");

import { executarComando } from "../infra/comandos.js";

let sistemaPausado = false;

/**
 * Processa uma entrada de comando, validando contexto.
 * @param {string} comando
 * @param {object} dados
 */
export function processarEntrada(comando = "", dados = {}) {
  if (sistemaPausado) {
    falarTexto("O sistema está pausado. Diga 'retomar' para continuar.");
    return;
  }

  if (typeof comando !== "string" || !comando.trim()) {
    falarTexto("Entrada inválida. Tente novamente.");
    return;
  }

  executarComando(comando, dados);
}

/** Pausa o fluxo tático */
export function pausarSistema() {
  sistemaPausado = true;
  falarTexto("Sistema pausado.");
}

/** Retoma o fluxo tático */
export function retomarSistema() {
  sistemaPausado = false;
  falarTexto("Sistema retomado.");
}
