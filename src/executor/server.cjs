// src/executor/server.cjs
// Servidor Node.js – gera sinais JSON e já permite CORS para o painel

const express = require("express");
const fs      = require("fs");
const path    = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

// --- CORS mínimo ----------------------------------------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});
// ---------------------------------------------------------------

// Pasta Files\sinais do teu MT5
const SINAIS_DIR = path.resolve(
  "C:/Users/rober/AppData/Roaming/MetaQuotes/Terminal/D0E8209F77C8CF37AD8BF550E51FF075",
  "MQL5",
  "Files",
  "sinais"
);
fs.mkdirSync(SINAIS_DIR, { recursive: true });

// POST /api/ordem  { tipo: "buy" | "sell" | "fechar", volume?: 0.02, symbol?: "BTCUSD" }
app.post("/api/ordem", (req, res) => {
  let { tipo, volume = 0.02, symbol = "BTCUSD" } = req.body;
  tipo = String(tipo).toLowerCase();

  if (!["buy", "sell", "fechar"].includes(tipo))
    return res.status(400).json({ ok: false, detalhe: "Tipo inválido" });

  if (symbol === "BTCUSD" && volume > 0.05) volume = 0.02;

  if (tipo === "fechar") {
    const payload = { tipo: "fechar", symbol, volume: "0.00", sl: "0", tp: "0" };
    const filename = `signal_${Date.now()}_${uuidv4().slice(0,6)}.json`;
    fs.writeFileSync(path.join(SINAIS_DIR, filename), JSON.stringify(payload));
    return res.json({ ok: true, detalhe: `Ordem de fechamento enviada.` });
  }

  const payload = {
    tipo,
    volume: volume.toFixed(2),
    symbol,
    sl: "0",
    tp: "0"
  };

  const filename = `signal_${Date.now()}_${uuidv4().slice(0,6)}.json`;

  try {
    fs.writeFileSync(path.join(SINAIS_DIR, filename), JSON.stringify(payload));
    return res.json({ ok: true, detalhe: `Arquivo ${filename} criado` });
  } catch (err) {
    return res.status(500).json({ ok: false, detalhe: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`✅ Executor MT5 API ativo em http://localhost:${PORT}`)
);
