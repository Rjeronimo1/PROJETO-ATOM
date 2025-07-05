/**********************************************************************
 * server.js — API mínima p/ receber sinais do painel (CORS habilitado)
 *********************************************************************/

import express           from "express";
import cors              from "cors";          // ← NOVO
import fs                from "fs";
import path              from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Pasta /atom/sinais
const SINAIS_DIR = path.join(__dirname, "atom", "sinais");
fs.mkdirSync(SINAIS_DIR, { recursive: true });

const app  = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());

// ————————————————————————————————
// 1.  Habilita CORS p/ qualquer origem (*)
//     (troque "*" por "http://127.0.0.1:5500" se quiser restringir)
// ————————————————————————————————
app.use(cors({ origin: "*" }));

/* --------------------------------------------------
 *  POST /api/sinal
 * -------------------------------------------------*/
app.post("/api/sinal", (req, res) => {
  try {
    const sinal = req.body;
    if (!sinal?.tipo) {
      return res.status(400).json({ erro: "JSON sem campo 'tipo'" });
    }

    const nome = `sinal_${sinal.tipo}_${Date.now()}.json`;
    fs.writeFileSync(
      path.join(SINAIS_DIR, nome),
      JSON.stringify(sinal, null, 2)
    );

    console.log(`📥  Sinal '${sinal.tipo}' salvo em /atom/sinais/${nome}`);
    res.json({ ok: true, arquivo: nome });
  } catch (err) {
    console.error("❌  Erro API:", err.message);
    res.status(500).json({ erro: "Falha interna" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 API ATOM pronta em http://127.0.0.1:${PORT}`)
);
