# ⚡ ASH Mineral Tech - Industrial AI OS & Multi-Agent Operations

> **Plataforma Industrial Autônoma Multiagente com Gemini 2.0 Flash, Visão Computacional Multimodal e Telemetria em Tempo Real.**
>
> *Submissão Oficial: Build with Gemini XPRIZE | Planta Piloto: Ribeirão Vermelho - MG*

---

## 🎯 Visão Geral

O **ASH Mineral Tech** é um sistema operacional industrial de ponta a ponta projetado para governar e automatizar o beneficiamento mineral, a síntese de geopolímeros e a distribuição B2B de sílica pura e micro-quartzo (#100, #200, #325 Mesh e frações ultrafinas).


┌────────────────────────────────────────┐
│ ASH MINERAL TECH OS │
│ (Project IDX / React 18 / Tailwind) │
└───────────────────┬────────────────────┘
│
▼
┌────────────────────────────────────────┐
│ CAMADA 3: EXECUTIVA │
│ Cássio Executivo (Gemini 2.0) │
│ - Decisão Estratégica & DRE / Margem │
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

## 🧠 Destaques de Arquitetura de IA

- **Auditoria Granulométrica Multimodal**: Endpoint `/api/vision/inspect-mesh` processando imagens microscópicas de amostras via Gemini 2.0 Flash Vision para certificar a malha #325 Mesh antes do despacho
- **Raciocínio Executivo Estruturado**: Cássio Executivo operando com `responseSchema` nativo do SDK `@google/genai` eliminando alucinações em deliberações financeiras e operacionais
- **Gateway SPARK**: Telemetria contínua de sensores de vibração, corrente e moagem em tempo real

---

## 🚀 Como Executar Localmente

```bash
git clone https://github.com/eduardo6moraes-bot/ash-mineral-tech.git
cd ash-mineral-tech
npm install
cp .env.example .env
npm run dev
```

Acesse em http://localhost:3000

Desenvolvido com Google AI Studio, Gemini 2.0 Flash e Project IDX para o Build with Gemini XPRIZE.
