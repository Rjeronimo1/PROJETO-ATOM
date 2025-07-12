// src/core/executorLocal.js
// Ponte de automação: recebe comandos/códigos aprovados e cria arquivos/pastas automaticamente no projeto ATOM

import fs from 'fs';
import path from 'path';
import express from 'express'; // API local simples para integração
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const raizProjeto = path.resolve(__dirname, '../..');

const app = express();
app.use(express.json());

// Endpoint universal para criar ou atualizar arquivos
app.post('/criar-arquivo', (req, res) => {
  const { caminhoRelativo, conteudo } = req.body;
  if (!caminhoRelativo || typeof conteudo !== 'string') {
    return res.status(400).json({ erro: 'Parâmetros obrigatórios: caminhoRelativo, conteudo' });
  }

  const caminhoAbsoluto = path.resolve(raizProjeto, caminhoRelativo);

  // Cria pasta se não existir
  const pasta = path.dirname(caminhoAbsoluto);
  if (!fs.existsSync(pasta)) fs.mkdirSync(pasta, { recursive: true });

  // Cria ou sobrescreve arquivo
  fs.writeFileSync(caminhoAbsoluto, conteudo, 'utf8');
  console.log(`[Sheldon] ✅ Arquivo criado/atualizado: ${caminhoRelativo}`);
  res.json({ status: 'ok', arquivo: caminhoRelativo });
});

// Endpoint opcional para criar pastas
app.post('/criar-pasta', (req, res) => {
  const { caminhoRelativo } = req.body;
  if (!caminhoRelativo) return res.status(400).json({ erro: 'Parâmetro obrigatório: caminhoRelativo' });

  const caminhoAbsoluto = path.resolve(raizProjeto, caminhoRelativo);
  if (!fs.existsSync(caminhoAbsoluto)) fs.mkdirSync(caminhoAbsoluto, { recursive: true });

  console.log(`[Sheldon] 📂 Pasta criada: ${caminhoRelativo}`);
  res.json({ status: 'ok', pasta: caminhoRelativo });
});

// Inicializa servidor na porta 3100
const PORT = 3100;
app.listen(PORT, () => {
  console.log(`[Sheldon ExecutorLocal] Ativo em http://localhost:${PORT}`);
});
