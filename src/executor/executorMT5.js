// src/executor/executorMT5.js
export async function executarOrdem(tipo) {
  try {
    const corpo = {
      tipo,
      symbol: "BTCUSD",       // ← pode futuramente deixar dinâmico
      volume: 0.02
    };

    const res = await fetch("http://localhost:3001/api/ordem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo)
    });

    if (!res.ok) throw new Error(await res.text());
    const { ok, detalhe } = await res.json();
    console.log(`🟢 ${ok ? "OK" : "Erro"}: ${detalhe}`);
  } catch (err) {
    console.error("❌ Erro ao enviar ordem:", err.message);
  }
}
