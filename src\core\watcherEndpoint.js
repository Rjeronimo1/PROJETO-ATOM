// src/core/watcherEndpoint.js

import express from "express";
import fs from "fs";
import path from "path";
import chokidar from "chokidar";

const PORT = 3100;
const LOG_FILE = path.resolve("logs", "automacao.log");
const PROJETO_ROOT = path.resolve(".");

if (!fs.existsSync("logs")) fs.mkdirSync("logs");

// Logger simples
function registrarLog(msg) {
  const data = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOG_FILE, data, "utf-8");
  console.log(msg);
}

// Watcher - monitora alterações no projeto ATOM
function startWatcher() {
  registrarLog("Watcher iniciado.");
  chokidar.watch(PROJETO_ROOT, {
    ignored: /(^|[\/\\])\../, // ignora arquivos/pastas ocultos
    ignoreInitial: true,
    persistent: true,
    depth: 8,
  })
    .on("add", file => registrarLog(`Arquivo criado: ${file}`))
    .on("change", file => registrarLog(`Arquivo alterado: ${file}`))
    .on("unlink", file => registrarLog(`Arquivo removido: ${file}`))
    .on("error", error => registrarLog(`Erro watcher: ${error}`));
}

// Express endpoint para comandos externos (sincronização, diagnóstico, etc)
function startEndpoint() {
  const app = express();
  app.use(express.json({ limit: "20mb" }));

  app.post("/sincronizar", (req, res) => {
    try {
      const payload = req.body;
      const arquivoTemp = path.resolve("logs", `sync_${Date.now()}.json`);
      fs.writeFileSync(arquivoTemp, JSON.stringify(payload, null, 2), "utf-8");
      registrarLog(`Payload recebido e salvo em ${arquivoTemp}`);
      res.status(200).json({ status: "OK", arquivo: arquivoTemp });
    } catch (err) {
      registrarLog(`Erro ao salvar sync: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(PORT, () => registrarLog(`Endpoint /sincronizar ativo em http://localhost:${PORT}`));
}

// Execução principal
startWatcher();
startEndpoint();
