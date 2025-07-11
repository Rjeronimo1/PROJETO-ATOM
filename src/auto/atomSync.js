// src/auto/atomSyncLatenode.js
// Função para enviar arquivos/blocos para o endpoint Latenode, que grava e faz push automático no GitHub

import fetch from "node-fetch"; // npm install node-fetch

const ENDPOINT_LATENODE = "https://webhook.latenode.com/71206/dev/c7783145-189e-47e3-b729-b241498339cd";

// Função principal: envia arquivo/bloco para o Latenode, que grava e faz o push
export async function gravarBlocoNoGitHub({ caminhoRelativo, conteudo }) {
  try {
    const resposta = await fetch(ENDPOINT_LATENODE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        caminho: caminhoRelativo,
        conteudo: conteudo
      })
    });
    if (!resposta.ok) {
      throw new Error(`Erro ao enviar para Latenode: ${await resposta.text()}`);
    }
    console.log(`✅ Bloco enviado para o GitHub via Latenode: ${caminhoRelativo}`);
  } catch (erro) {
    console.error("❌ Falha ao gravar bloco no GitHub:", erro.message);
  }
}

// --- Exemplo de uso direto ---
// Comente ou remova se for importar de outro módulo
if (process.argv[2] === "teste") {
  // Exemplo: node src/auto/atomSyncLatenode.js teste src/testeSheldon/blocoAuto.js "// Exemplo\nconsole.log('Bloco criado via Sheldon!')"
  const [, , , caminho, ...resto] = process.argv;
  if (!caminho || resto.length === 0) {
    console.log("Uso: node atomSyncLatenode.js teste <caminhoRelativo> <conteudo>");
    process.exit(1);
  }
  const conteudo = resto.join(" ");
  gravarBlocoNoGitHub({ caminhoRelativo: caminho, conteudo });
}
