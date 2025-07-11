// src/auto/atomSync.js — Gera blocos, grava e faz sync com GitHub

import chokidar from "chokidar";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

// Diretório raiz do projeto
const raiz = path.resolve(".");

console.log("🟢 atomSync.js operacional — grava e sincroniza automaticamente.");

// --- Função UNIVERSAL: grava arquivo automaticamente ---
export function salvarBloco({ caminhoRelativo, conteudo }) {
  const caminho = path.join(raiz, caminhoRelativo);
  const pasta = path.dirname(caminho);
  if (!fs.existsSync(pasta)) fs.mkdirSync(pasta, { recursive: true });
  fs.writeFileSync(caminho, conteudo, "utf8");
  console.log(`📝 Bloco salvo automaticamente: ${caminhoRelativo}`);
}

// --- Função para rodar via comando terminal, para testes e validação ---
if (require.main === module) {
  const [,, cmd, destino, ...resto] = process.argv;
  if (cmd === "write" && destino && resto.length > 0) {
    const conteudo = resto.join(" ");
    salvarBloco({ caminhoRelativo: destino, conteudo });
    // O watcher abaixo vai cuidar do commit/push automático
    process.exit(0);
  }
}

// --- Watcher universal, sincronização em tempo real ---
let debounceTimer = null;
let arquivosPendentes = new Set();

function syncGit() {
  if (arquivosPendentes.size === 0) return;
  const hora = new Date().toLocaleTimeString("pt-PT");
  const arquivos = Array.from(arquivosPendentes).join(", ");
  arquivosPendentes.clear();
  const msg = `ATOM auto-sync (${arquivos} @ ${hora})`;
  console.log(`[${hora}] ⏳ Commit/push automático: ${arquivos}`);
  exec(`git add . && git commit -m "${msg}" && git push`, (err, stdout, stderr) => {
    if (err) {
      if (stderr && stderr.includes("nothing to commit")) {
        console.log(`[${hora}] ⚠️ Nada novo para commitar (${arquivos})`);
      } else {
        console.error(`[${hora}] ❌ Erro ao sync:`, stderr.trim());
      }
    } else {
      console.log(`[${hora}] ✅ Commit/push automático concluído.`);
    }
  });
}

function debounceSyncGit() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(syncGit, 5000);
}

const watcher = chokidar.watch(raiz, {
  ignored: /(^|[\/\\])\..|node_modules|logs|\.git|\.DS_Store|deprecated/,
  persistent: true,
  ignoreInitial: true,
  depth: 8,
});

watcher.on("all", (event, filePath) => {
  const rel = path.relative(raiz, filePath);
  arquivosPendentes.add(rel);
  debounceSyncGit();
});
