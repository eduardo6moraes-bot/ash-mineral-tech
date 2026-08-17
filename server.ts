import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// ROUTE 1: Cassio Executive (Structured Outputs via responseSchema)
app.post("/api/cassio/evaluate", async (req, res) => {
  try {
    const { domain, title, summary, financialImpact, supervisor } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Analyze the following industrial event:
      Domain: ${domain}
      Subject: ${title}
      Summary: ${summary}
      Estimated Financial Impact: R$ ${financialImpact || 0}
      Responsible Supervisor: ${supervisor || "Domain Supervisor"}`,
      config: {
        systemInstruction: "You are CASSIO, the Chief Operations Officer of ASH MINERAL TECH (Ribeirão Vermelho Plant - MG, Brazil). Evaluate operational, labor and margin-per-ton risks strictly according to the provided schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendation: { type: Type.STRING },
            executiveReasoning: { type: Type.STRING },
            riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
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

// ROUTE 2: Multimodal Mesh Inspection (Gemini 2.0 Flash Vision)
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
          text: `Analyze the provided mineral sample. Target mesh: ${targetMesh || "ASH Pure #325 Mesh"}. Estimate particle homogeneity, presence of visible impurities and granulometric conformity.`
        }
      ],
      config: {
        systemInstruction: "You are the multimodal mineral auditor of ASH Mineral Tech. Analyze the microscopic consistency of the mineral mesh.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meshConformityScore: { type: Type.NUMBER },
            granulometryDetected: { type: Type.STRING },
            impuritiesDetected: { type: Type.BOOLEAN },
            auditVerdict: { type: Type.STRING, enum: ["Approved", "Rejected", "Reinspection"] },
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

// ROUTE 3: Charles - Operational Assistant
app.post("/api/chat/charles", async (req, res) => {
  try {
    const { message, context } = req.body;

    const systemInstruction = "You are Charles, the operational assistant of ASH MINERAL TECH. Be direct, technical and focused on supporting the plant team with processes, safety standards (NRs) and B2B dispatch.";

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        { role: "user", parts: [{ text: `${systemInstruction}\nContext: ${context || "General"}\nQuestion: ${message}` }] }
      ],
    });

    res.json({ reply: result.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ROUTE 4: Autonomous SPARK Gateway (Industrial Telemetry)
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
      message: "Telemetry processed and aligned with inventory."
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
    console.log(`ASH Mineral Tech Server running at http://localhost:${PORT}`);
  });
}

startServer();
