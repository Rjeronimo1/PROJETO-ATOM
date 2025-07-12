// src/core/executorLocal.js
import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

// Função recursiva para criar árvore de arquivos/pastas a partir de blueprint
function aplicarBlueprint(obj, caminhoAtual) {
  for (const key in obj) {
    const value = obj[key];
    const caminho = path.join(caminhoAtual, key);

    if (typeof value === 'object' && value !== null) {
      if (!fs.existsSync(caminho)) fs.mkdirSync(caminho, { recursive: true });
      if (Object.keys(value).length === 0) {
        fs.writeFileSync(path.join(caminho, '.gitkeep'), '# ATOM: versionamento de pasta');
      } else {
        aplicarBlueprint(value, caminho);
      }
    } else {
      fs.writeFileSync(caminho, value, 'utf8');
    }
  }
}

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

// Remover arquivo
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

// Endpoint universal de sincronização de blueprint
app.post('/sincronizar', (req, res) => {
  let blueprint;
  try {
    blueprint = req.body;
    if (!blueprint || typeof blueprint !== 'object') throw new Error('Blueprint ausente ou inválida');
    aplicarBlueprint(blueprint, raizProjeto);
    console.log('[Sheldon] 🚀 Sincronização concluída pelo endpoint /sincronizar!');
    res.json({ status: 'ok', mensagem: 'Sincronização de blueprint aplicada com sucesso.' });
  } catch (erro) {
    console.error('[Sheldon] Erro na sincronização:', erro.message);
    res.status(500).json({ erro: erro.message });
  }
});

const PORT = 3100;
app.listen(PORT, () => {
  console.log(`[Sheldon ExecutorLocal] Ativo em http://localhost:${PORT}`);
});
