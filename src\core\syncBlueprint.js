// src/core/syncBlueprint.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrige __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho correto para o blueprint na raiz do projeto
const blueprintPath = path.join(__dirname, '..', '..', 'atom_blueprint.json');

async function carregarBlueprint() {
  try {
    const blueprintRaw = await fs.readFile(blueprintPath, 'utf-8');
    const blueprint = JSON.parse(blueprintRaw);
    console.log('\x1b[32m[ATOM] atom_blueprint.json carregado com sucesso.\x1b[0m');
    // Aqui você pode processar o blueprint conforme a lógica do seu projeto
    // Exemplo: listar as chaves do blueprint
    console.log(JSON.stringify(blueprint, null, 2));
  } catch (erro) {
    console.error('\x1b[31m[ATOM] Erro ao carregar atom_blueprint.json:\x1b[0m', erro.message);
    process.exit(1);
  }
}

carregarBlueprint();
