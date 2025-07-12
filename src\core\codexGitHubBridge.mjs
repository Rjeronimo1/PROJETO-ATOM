// codexGitHubBridge.mjs — Commit seguro sequencial GitHub ATOM

import dotenv from 'dotenv';
dotenv.config();

import { Octokit } from "@octokit/rest";
import fs from "fs/promises";
import path from "path";

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("[ATOM::ERRO] Token GitHub ausente no .env");
  process.exit(1);
}
const octokit = new Octokit({ auth: token });

// Configure aqui:
const owner = 'Rjeronimo1';            // Seu GitHub
const repo = 'PROJETO-ATOM';           // Nome do repo
const branch = 'main';                 // Ou 'master' se for o caso

async function getCurrentSha(remotePath) {
  try {
    const { data } = await octokit.repos.getContent({
      owner, repo, path: remotePath, ref: branch
    });
    return data.sha;
  } catch (err) {
    if (err.status === 404) return undefined; // Arquivo não existe
    throw err;
  }
}

async function commitFile(localPath, remotePath, mensagem) {
  // Verifica se arquivo existe localmente
  let conteudoArquivo;
  try {
    conteudoArquivo = await fs.readFile(localPath, "utf-8");
  } catch (err) {
    console.error(`[ATOM] Falha ao ler ${localPath}:`, err.message);
    return;
  }
  const conteudoBase64 = Buffer.from(conteudoArquivo).toString("base64");
  const sha = await getCurrentSha(remotePath);

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: remotePath,
      message: mensagem,
      content: conteudoBase64,
      branch,
      sha: sha || undefined,
    });
    console.log(`✔ Commit enviado: ${remotePath}`);
  } catch (err) {
    if (err.status === 409 && err.message.includes('sha')) {
      // SHA mismatch, tente novamente com SHA correto
      const novoSha = await getCurrentSha(remotePath);
      if (novoSha) {
        await octokit.repos.createOrUpdateFileContents({
          owner,
          repo,
          path: remotePath,
          message: mensagem + ' (retry SHA)',
          content: conteudoBase64,
          branch,
          sha: novoSha,
        });
        console.log(`✔ Commit retry SHA: ${remotePath}`);
      } else {
        console.error(`[ATOM] Erro de SHA ao tentar retry para ${remotePath}`);
      }
    } else {
      console.error(`[ATOM] Erro ao enviar commit (${remotePath}):`, err.message);
    }
  }
}

// Função sequencial para blueprint (exemplo de uso)
export async function commitBlueprintSequencial(blueprint, basePath = ".") {
  const tasks = [];

  function walker(node, relPath) {
    for (const key in node) {
      if (typeof node[key] === "string") {
        // É arquivo
        const localPath = path.join(basePath, relPath, key);
        const remotePath = path.join(relPath, key).replace(/\\/g, "/");
        tasks.push({ localPath, remotePath, conteudo: node[key] });
      } else if (typeof node[key] === "object") {
        // É pasta, cria recursivamente
        walker(node[key], path.join(relPath, key));
      }
    }
  }

  walker(blueprint, "");

  // Commita 1 a 1, sempre aguardando o anterior (sequencial)
  for (const task of tasks) {
    // Garante que o arquivo existe localmente
    await fs.mkdir(path.dirname(task.localPath), { recursive: true });
    await fs.writeFile(task.localPath, task.conteudo);
    await commitFile(task.localPath, task.remotePath, `Commit automático de ${task.remotePath}`);
  }
  console.log("✔ Todos arquivos do blueprint sincronizados.");
}

// Exporta commitFile para uso avulso
export { commitFile };
