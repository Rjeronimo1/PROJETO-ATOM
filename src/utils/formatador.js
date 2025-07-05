// ==============================================
// UTILS / FORMATADOR — Funções auxiliares ATOM
// ==============================================

export function formatarHoraAgora() {
  const agora = new Date();
  return agora.toLocaleTimeString("pt-PT", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function formatarMoeda(valor, moeda = "EUR") {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: moeda,
    minimumFractionDigits: 2,
  }).format(valor);
}

export function formatarPorcentagem(valor, casas = 2) {
  return `${valor.toFixed(casas)}%`;
}
