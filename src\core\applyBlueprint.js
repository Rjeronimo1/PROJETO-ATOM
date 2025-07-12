// src/core/applyBlueprint.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import simpleGit from 'simple-git';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do blueprint JSON
const blueprintPath = path.join(__dirname, '..', '..', 'atom_blueprint.json');
const raizProjeto = path.join(__dirname, '..', '..');
const git = simpleGit(raizProjeto);

// Criação recursiva de arquivos/pastas
async function criarEstrutura(base, estrutura) {
  for (const [nome, conteudo] of Object.entries(estrutura)) {
    const caminho = path.join(base, nome);

    if (typeof conteudo === 'string') {
      // Arquivo
      try {
        await fs.access(caminho);
        console.log(`[SKIP] Arquivo já existe: ${caminho}`);
      } catch {
        await fs.writeFile(caminho, conteudo, 'utf8');
        console.log(`[CREATE] Arquivo criado: ${caminho}`);
      }
    } else {
      // Pasta
      await fs.mkdir(caminho, { recursive: true });
      await criarEstrutura(caminho, conteudo);
    }
  }
}

// Aplicar blueprint + commit/push
(async () => {
  try {
    const data = await fs.readFile(blueprintPath, 'utf8');
    const blueprint = JSON.parse(data);

    await criarEstrutura(raizProjeto, blueprint);

    // Adiciona todas as alterações
    await git.add('.');
    await git.commit('[ATOM] Sincronização automática do blueprint');
    await git.push();
    console.log('\x1b[32m[ATOM] Blueprint aplicado e push automático realizado com sucesso.\x1b[0m');
  } catch (erro) {
    console.error('\x1b[31m[ERRO] ', erro.message);
  }
})();
