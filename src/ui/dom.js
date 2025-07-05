// dom.js — Gerenciador de interface visual do ATOM

// Cria um novo card visual com título e valor
export function criarCard(titulo, valor, id) {
  const card = document.createElement("div");
  card.className = "card modo-padrao";  // Classe para tema dinâmico
  card.id = id;

  const h3 = document.createElement("h3");
  h3.textContent = titulo;

  const p = document.createElement("p");
  p.textContent = valor;

  card.appendChild(h3);
  card.appendChild(p);

  return card;
}

// Atualiza o valor de um card existente ou cria se não existir
export function atualizarCard(id, novoValor) {
  const card = document.getElementById(id);
  if (card) {
    const p = card.querySelector("p");
    if (p) p.textContent = novoValor;
  }
}

// Adiciona o card no painel principal (evita duplicações)
export function adicionarAoPainel(card) {
  const painel = document.getElementById("app");
  if (!painel.querySelector(`#${card.id}`)) {
    painel.appendChild(card);
  }
}

// Limpa todo o painel (útil para resets)
export function limparPainel() {
  const painel = document.getElementById("app");
  painel.innerHTML = "";
}

// Altera o tema visual do painel dinamicamente (opcional futuro)
export function definirTemaPainel(modo = "padrao") {
  const painel = document.getElementById("app");
  painel.className = `painel-${modo}`;
}
