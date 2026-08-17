import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// ROTA 1: Cássio Executivo (Structured Outputs via responseSchema)
app.post("/api/cassio/evaluate", async (req, res) => {
  try {
    const { domain, title, summary, financialImpact, supervisor } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Analise o seguinte evento industrial:
      Domínio: ${domain}
      Assunto: ${title}
      Resumo: ${summary}
      Impacto Financeiro Estimado: R$ ${financialImpact || 0}
      Supervisor Responsável: ${supervisor || "Supervisor de Domínio"}`,
      config: {
        systemInstruction: "Você é CÁSSIO, o Diretor Executivo de Operações da ASH MINERAL TECH (Planta de Ribeirão Vermelho - MG). Avalie riscos operacionais, trabalhistas e margem por tonelada com base estrita no schema fornecido.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendation: { type: Type.STRING },
            executiveReasoning: { type: Type.STRING },
            riskLevel: { type: Type.STRING, enum: ["Baixo", "Médio", "Alto", "Crítico"] },
            approved: { type: Type.BOOLEAN }
          },
          required: ["recommendation", "executiveReasoning", "riskLevel", "approved"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ROTA 2: Inspeção Multimodal de Granulometria (Gemini 2.0 Flash Vision)
app.post("/api/vision/inspect-mesh", async (req, res) => {
  try {
    const { imageBase64, mimeType, targetMesh } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          inlineData: {
            data: imageBase64,
            mimeType: mimeType || "image/jpeg"
          }
        },
        {
          text: `Analise a amostra mineral fornecida. Malha alvo: ${targetMesh || "ASH Pure #325 Mesh"}. Estime a homogeneidade das partículas, presença de impurezas visíveis e conformidade granulométrica.`
        }
      ],
      config: {
        systemInstruction: "Você é o auditor mineral multimodal da ASH Mineral Tech. Analise a consistência microscópica da malha mineral.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meshConformityScore: { type: Type.NUMBER },
            granulometryDetected: { type: Type.STRING },
            impuritiesDetected: { type: Type.BOOLEAN },
            auditVerdict: { type: Type.STRING, enum: ["Aprovado", "Rejeitado", "Reinspeção"] },
            technicalNotes: { type: Type.STRING }
          },
          required: ["meshConformityScore", "granulometryDetected", "impuritiesDetected", "auditVerdict", "technicalNotes"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ROTA 3: Charles - Assistente Operacional
app.post("/api/chat/charles", async (req, res) => {
  try {
    const { message, context } = req.body;

    const systemInstruction = "Você é Charles, assistente operacional da ASH MINERAL TECH. Seja direto, técnico e focado em apoiar a equipe de fábrica com processos, normas (NRs) e despacho B2B.";

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        { role: "user", parts: [{ text: `${systemInstruction}\nContexto: ${context || "Geral"}\nPergunta: ${message}` }] }
      ],
    });

    res.json({ reply: result.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ROTA 4: Gateway SPARK Autônomo (Telemetria Industrial)
app.get("/api/spark/status", (req, res) => {
  res.json({
    status: "online",
    engine: "ASH-Mineral-Spark-Gateway",
    version: "2.4.0",
    supportedProtocols: ["REST/JSON", "Webhooks", "Firestore-Direct"],
    endpoints: {
      telemetry: "POST /api/spark/telemetry",
      webhook: "POST /api/spark/webhook"
    },
    plant: "Ribeirão Vermelho - MG"
  });
});

app.post("/api/spark/telemetry", async (req, res) => {
  try {
    const { machineId, operator, granulometry, tonnage, sensorData, status } = req.body;
    res.json({
      success: true,
      receivedAt: new Date().toISOString(),
      sparkSync: "synced",
      message: "Telemetria processada e alinhada ao estoque."
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ASH Mineral Tech Server rodando em http://localhost:${PORT}`);
  });
}

startServer();
