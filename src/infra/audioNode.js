/**********************************************************************
 * bridge.js — Ponte ATOM ↔ MetaEditor/MT5  (Node-side)
 * ----------------------------------------------------
 * Executa em Node.js (ESM):
 *   • abrir MetaEditor
 *   • compilar .mq5/.mqh via CLI
 *   • comandos de sistema genéricos
 *********************************************************************/

import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/* ----------------------------------------------------------
 * Configurações locais
 * ---------------------------------------------------------*/
// Permite override por variável de ambiente
const METAEDITOR_PATH = process.env.METAEDITOR_PATH
  || '"C:\\Program Files\\MetaTrader 5\\metaeditor64.exe"';

const { falarTexto } = await import("./infra/audioNode.js");  // voz TTS Node

/* ----------------------------------------------------------
 * Utilidades
 * ---------------------------------------------------------*/
export function verificarInstalacaoMetaEditor() {
  const ok = fs.existsSync(METAEDITOR_PATH.replace(/"/g, ""));
  console[ok ? "log" : "warn"](
    ok ? "📌 MetaEditor localizado." : "⚠️ Caminho do MetaEditor não encontrado."
  );
  return ok;
}

export function abrirMetaEditor() {
  exec(METAEDITOR_PATH, (err) => {
    if (err) {
      console.error("❌ Erro ao abrir MetaEditor:", err.message);
      falarTexto("Erro ao abrir o MetaEditor.");
    } else {
      console.log("✅ MetaEditor iniciado com sucesso.");
      falarTexto("MetaEditor aberto.");
    }
  });
}

export function compilarScriptMT5(caminhoScript = "") {
  if (!caminhoScript) {
    console.warn("⚠️ Caminho de script vazio.");
    return;
  }
  const comando = `${METAEDITOR_PATH} /compile:"${caminhoScript}"`;
  exec(comando, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Falha na compilação:", err.message);
      falarTexto("Erro ao compilar o robô.");
      return;
    }
    console.log("✅ Robô compilado:", path.basename(caminhoScript));
    if (stderr) console.warn("⚠️ MetaEditor:", stderr.trim());
    falarTexto("Robô compilado com sucesso.");
  });
}

export function executarComandoSistema(cmd = "") {
  if (!cmd) return;
  exec(cmd, (err, out, errout) => {
    if (err) console.error("❌ Erro:", err.message);
    if (out) console.log("📤 STDOUT:", out.trim());
    if (errout) console.warn("⚠️ STDERR:", errout.trim());
  });
}

/* ----------------------------------------------------------
 * Export default permitindo import * as Bridge
 * ---------------------------------------------------------*/
export default {
  verificarInstalacaoMetaEditor,
  abrirMetaEditor,
  compilarScriptMT5,
  executarComandoSistema
};
