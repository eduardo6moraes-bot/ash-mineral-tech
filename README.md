# ⚡ ASH Mineral Tech - Industrial AI OS & Multi-Agent Operations

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ash--mineral--tech.ai.studio-00C853?style=for-the-badge&logo=google)](https://ash-mineral-tech.ai.studio)
[![XPRIZE Submission](https://img.shields.io/badge/XPRIZE-Build%20with%20Gemini-4285F4?style=for-the-badge)](https://devpost.com/software/ash-mineral-tech)
[![AI Core](https://img.shields.io/badge/AI%20Core-Gemini%202.0%20Flash-9C27B0?style=for-the-badge)](https://ai.google.dev)
[![Google Cloud](https://img.shields.io/badge/Cloud-Google%20AI%20Studio-EA4335?style=for-the-badge&logo=googlecloud)](https://aistudio.google.com)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

> **Plataforma Industrial Autônoma Multiagente com Gemini 2.0 Flash, Inspeção Granulométrica Multimodal e Telemetria em Tempo Real**
>
> 🌐 **Ambiente de Produção Ativo:** [https://ash-mineral-tech.ai.studio](https://ash-mineral-tech.ai.studio)
> 🏆 **Submissão Oficial:** Build with Gemini XPRIZE Edition
> 🏭 **Planta Piloto:** Ribeirão Vermelho - MG (Eixo Fernão Dias / Polo B2B Minas-SP)

---

## 🎯 Visão Geral da Arquitetura

O **ASH Mineral Tech** é um sistema operacional industrial de ponta a ponta que automatiza o beneficiamento mineral, a síntese de geopolímeros sustentáveis e a distribuição B2B de sílica de alta pureza (#100, #200, #325 Mesh e frações ultrafinas de 44 micra)


┌────────────────────────────────────────┐
│ ASH MINERAL TECH OS │
│ (React 18 / Tailwind / Project IDX) │
└───────────────────┬────────────────────┘
│
▼
┌────────────────────────────────────────┐
│ CAMADA 3: EXECUTIVA │
│ Cássio Executivo (Gemini 2.0) │
│ - Decisão Estratégica & DRE / Margem │
│ - Structured Outputs (responseSchema) │
└───────────────────▲────────────────────┘
│
┌───────────────────────┴───────────────────────┐
│ │
┌──────────────┴──────────────┐ ┌──────────────┴──────────────┐
│ CAMADA 2: SUPERVISORES │ │ CAMADA 1: MULTIMODAL │
│ - Dra. Cecília (RH / NRs) │ │ - Gemini Vision Mesh Audit │
│ - Eng. Gustavo (Logística) │ │ - OCR de NF-e & Romaneios │
│ - Auditor Marcelo (DRE) │ │ - Charles Ops Chatbot │
└──────────────▲──────────────┘ └──────────────▲──────────────┘
│ │
└───────────────────────┬───────────────────────┘
│
┌───────────────────┴────────────────────┐
│ GATEWAY AUTÔNOMO SPARK │
│ REST / Telemetria em Tempo Real │
│ (Moinhos / Britadores / Estoque) │
└────────────────────────────────────────┘

---

## 🧠 Destaques de Engenharia de IA

* **Auditoria Granulométrica Multimodal (`POST /api/vision/inspect-mesh`):** O modelo Gemini 2.0 Flash Vision analisa amostras microscópicas de minério para verificar a uniformidade da malha (#325 Mesh / 44 micra) e presença de impurezas antes do despacho
* **Cássio Executivo com Saída Estruturada (`POST /api/cassio/evaluate`):** Deliberação estratégica executada com `responseSchema` estrito via SDK `@google/genai`, eliminando alucinações em cálculos de custo de frete, margem por tonelada e balanço estequiométrico
* **Gateway Autônomo SPARK (`POST /api/spark/telemetry`):** Endpoints REST para captura contínua de vibração, corrente elétrica e produtividade dos moinhos de bolas e britadores
* **Charles Copilot Operacional (`POST /api/chat/charles`):** Assistente conversacional em tempo real para operadores de pátio sobre procedimentos técnicos e normas regulamentadoras (NR-11, NR-12, NR-22)

---

## 🛡️ Segurança & Arquitetura Dual-Mode

O repositório e o ambiente de demonstração foram projetados com isolamento total de segredos industriais:
* **`VITE_DEMO_MODE=true`**: Carrega dados industriais sintéticos de alta fidelidade sem exigir credenciais privadas de banco de dados
* **Segurança de Chaves**: A `GEMINI_API_KEY` roda exclusivamente no backend Express/Node.js, nunca exposta ao cliente
* **Dataset Blindado**: Nomes de clientes, contratos e rotas foram anonimizados para a demonstração pública

---

## 🚀 Execução Local Rápida

```bash
git clone https://github.com/eduardo6moraes-bot/ash-mineral-tech.git
cd ash-mineral-tech
npm install
cp .env.example .env
npm run dev
```

Acesse a aplicação local em http://localhost:3000

## 🛠️ Stack Tecnológica

* **IA & LLMs**: `@google/genai` (Gemini 2.0 Flash com Structured Outputs & Multimodal Vision)
* **Frontend**: React 18, TypeScript, Tailwind CSS, Motion, Lucide Icons
* **Backend**: Node.js, Express, Vite Server Middleware, esbuild
* **Ambiente de Desenvolvimento**: Google AI Studio, Project IDX, Google Cloud
