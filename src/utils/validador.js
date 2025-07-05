// utils/validador.js — Verificações e sanitizações ATOM
// ----------------------------------------------------

/** Valida comando recebido por texto */
export function validarComando(texto) {
  if (typeof texto !== "string") return false;

  const proibidos = ["<SCRIPT>", "DROP", "DELETE", "--", ";"];
  const up = texto.toUpperCase();
  if (proibidos.some(p => up.includes(p))) return false;

  return texto.trim().length > 0;
}

/** Verifica se o modo solicitado é válido */
export function validarModo(modo = "") {
  const modosValidos = ["conservador", "tático", "tatico", "agressivo"];
  return modosValidos.includes(modo.toLowerCase());
}

/** Remove caracteres não permitidos na entrada livre */
export function limparTextoEntrada(texto = "") {
  return texto
    .replace(/[^\w\sáéíóúàèìòùãõâêîôûçñ.,!?()\-]/gi, "")
    .trim();
}
