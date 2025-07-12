// src/core/executorLocal.js
// Daemon executor local ATOM - Automação total via API

import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const raizProjeto = path.resolve(__dirname, '../..');

const app = express();
app.use(express.json());

// Criar ou atualizar arquivo
app.post('/criar-arquivo', (req, res) => {
  const { caminhoRelativo, conteudo } = req.body;
  if (!caminhoRelativo || typeof conteudo !== 'string') {
    return res.status(400).json({ erro: 'Parâmetros obrigatórios: caminhoRelativo, conteudo' });
  }
  const caminhoAbsoluto = path.resolve(raizProjeto, caminhoRelativo);
  const pasta = path.dirname(caminhoAbsoluto);
  if (!fs.existsSync(pasta)) fs.mkdirSync(pasta, { recursive: true });
  fs.writeFileSync(caminhoAbsoluto, conteudo, 'utf8');
  console.log(`[Sheldon] ✅ Arquivo criado/atualizado: ${caminhoRelativo}`);
  res.json({ status: 'ok', arquivo: caminhoRelativo });
});

// Criar pasta
app.post('/criar-pasta', (req, res) => {
  const { caminhoRelativo } = req.body;
  if (!caminhoRelativo) return res.status(400).json({ erro: 'Parâmetro obrigatório: caminhoRelativo' });
  const caminhoAbsoluto = path.resolve(raizProjeto, caminhoRelativo);
  if (!fs.existsSync(caminhoAbsoluto)) fs.mkdirSync(caminhoAbsoluto, { recursive: true });
  console.log(`[Sheldon] 📂 Pasta criada: ${caminhoRelativo}`);
  res.json({ status: 'ok', pasta: caminhoRelativo });
});

// (Opcional) Remover arquivo
app.post('/deletar-arquivo', (req, res) => {
  const { caminhoRelativo } = req.body;
  if (!caminhoRelativo) return res.status(400).json({ erro: 'Parâmetro obrigatório: caminhoRelativo' });
  const caminhoAbsoluto = path.resolve(raizProjeto, caminhoRelativo);
  if (fs.existsSync(caminhoAbsoluto)) {
    fs.unlinkSync(caminhoAbsoluto);
    console.log(`[Sheldon] ❌ Arquivo removido: ${caminhoRelativo}`);
    res.json({ status: 'ok', arquivo: caminhoRelativo });
  } else {
    res.status(404).json({ erro: 'Arquivo não encontrado' });
  }
});

// (Opcional) Commit em lote (gatilho manual)
app.post('/commit-em-lote', (req, res) => {
  // Aqui, podemos disparar um comando externo, chamar o orquestrador, etc.
  console.log('[Sheldon] 🚀 Commit em lote solicitado.');
  res.json({ status: 'ok', mensagem: 'Commit em lote será processado.' });
});

// Inicializa servidor na porta 3100
const PORT = 3100;
app.listen(PORT, () => {
  console.log(`[Sheldon ExecutorLocal] Ativo em http://localhost:${PORT}`);
});
