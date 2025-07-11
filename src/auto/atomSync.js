// src/auto/atomSync.js — Sincronização TOTAL e IMEDIATA de todo o projeto ATOM
import chokidar from "chokidar";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Corrige __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lista de pastas monitoradas (adicione/remova conforme o projeto evoluir)
const pastasMonitoradas = [
  path.join(__dirname, "../../src"),
  path.join(__dirname, "../../sinais"),
  path.join(__dirname, "../../config"),
  path.join(__dirname, "../../mql5"),
  path.join(__dirname, "../../logs"),
  path.join(__dirname, "../../tests"),
  path.join(__dirname, "../../atom"),
];

// Mensagem de ativação
console.log("🟢 atomSync ativo — monitorando todas as pastas ATOM");

const watcher = chokidar.watch(pastasMonitoradas, {
  ignored: /(^|[\/\\])\../, // ignora arquivos ocultos (ponto)
  persistent: true
});

function commitPush(filePath) {
  const nome = path.basename(filePath);
  const hora = new Date().toLocaleTimeString("pt-PT", { hour12: false });

  exec(`git add . && git commit -m "ATOM auto-sync (${nome} @ ${hora})" && git push`, (err, stdout, stderr) => {
    if (err) {
      if (stderr && stderr.includes("nothing to commit")) {
        console.log(`[${hora}] ⚠️ Nada novo para commitar (${nome})`);
      } else {
        console.error(`[${hora}] ❌ Erro ao sync:`, stderr ? stderr.trim() : err.message);
      }
    } else {
      console.log(`[${hora}] ✅ Commit/push automático: ${nome}`);
    }
  });
}

// Dispara para qualquer criação, alteração ou remoção de arquivo/pasta monitorada
watcher
  .on("add",    commitPush)
  .on("change", commitPush)
  .on("unlink", commitPush);

console.log("🚀 Toda alteração será sincronizada no GitHub imediatamente.");
