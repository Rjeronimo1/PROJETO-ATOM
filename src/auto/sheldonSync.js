// src/auto/sheldonSync.js — Commit automático Git
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Corrigir __dirname para funcionar em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function sincronizarGitAuto() {
  const comando = `
    cd "${__dirname}/../../" &&
    git add . &&
    git commit -m "Sheldon: commit automático horário" &&
    git push
  `;

  exec(comando, (erro, stdout, stderr) => {
    if (erro) {
      console.error("❌ Erro ao sincronizar com o GitHub:", erro.message);
      return;
    }
    console.log("✅ Sincronização automática com GitHub realizada.");
    console.log(stdout || stderr);
  });
}
