import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrige __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o blueprint
const blueprintPath = path.join(__dirname, '..', '..', 'atom_blueprint.json');
// Raiz do projeto
const raizProjeto = path.join(__dirname, '..', '..');

async function criarRecursivo(obj, destino) {
  for (const [nome, valor] of Object.entries(obj)) {
    const caminhoAtual = path.join(destino, nome);
    if (typeof valor === 'object') {
      // Cria pasta se não existir
      await fs.mkdir(caminhoAtual, { recursive: true });
      await criarRecursivo(valor, caminhoAtual);
    } else if (typeof valor === 'string') {
      // Cria arquivo se não existir
      try {
        await fs.access(caminhoAtual);
        console.log(`[SKIP] Arquivo já existe: ${caminhoAtual}`);
      } catch {
        await fs.writeFile(caminhoAtual, valor, 'utf-8');
        console.log(`[ADD] Arquivo criado: ${caminhoAtual}`);
      }
    }
  }
}

async function aplicarBlueprint() {
  try {
    const blueprintRaw = await fs.readFile(blueprintPath, 'utf-8');
    const blueprint = JSON.parse(blueprintRaw);

    await criarRecursivo(blueprint, raizProjeto);

    console.log('\x1b[32m[ATOM] Blueprint aplicado com sucesso.\x1b[0m');
  } catch (erro) {
    console.error('\x1b[31m[ATOM] Erro ao aplicar blueprint:\x1b[0m', erro.message);
  }
}

aplicarBlueprint();
