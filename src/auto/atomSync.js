// atomSync.js — Único módulo para criar, salvar, versionar e sincronizar todo o projeto ATOM
import chokidar from "chokidar";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

// Diretório raiz do projeto ATOM
const raiz = path.resolve(".");

// 1. Função UNIVERSAL para criar/atualizar qualquer arquivo (writer embutido)
export function salvarBloco({ caminhoRelativo, conteudo }) {
  const caminho = path.join(raiz, caminhoRelativo);
  const pasta = path.dirname(caminho);

  if (!fs.existsSync(pasta)) fs.mkdirSync(pasta, { recursive: true });
  fs.writeFileSync(caminho, conteudo, "utf8");
  console.log(`📝 Bloco salvo: ${caminhoRelativo}`);
}

// 2. Debounce para sync automático (acumula eventos em 5s)
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
  debounceTimer = setTimeout(syncGit, 5000); // 5 segundos
}

// 3. Watch universal
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

// 4. Exemplo de chamada programática da função de gravação (pode ser chamada por Sheldon direto)
if (process.env.ATOMWRITE) {
  // Exemplo: node atomSync.js write src/blocoTeste.js "console.log('olá')"
  const [,, cmd, destino, ...resto] = process.argv;
  if (cmd === "write") {
    const conteudo = resto.join(" ");
    salvarBloco({ caminhoRelativo: destino, conteudo });
    // Não precisa commitar, watcher faz automaticamente
    process.exit(0);
  }
}

console.log("🟢 atomSync.js operacional — grava, monitora e sincroniza automaticamente o projeto ATOM.");
