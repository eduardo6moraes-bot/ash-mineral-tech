# ⚡ ASH Mineral Tech — Industrial AI OS & Multi-Agent Operations

![ASH Mineral Tech Cover](./docs/cover.png)

> **Autonomous Multi-Agent Industrial Platform powered by Gemini 2.0 Flash, Multimodal Computer Vision and Real-Time Telemetry.**
>
> *Official Submission: Build with Gemini XPRIZE | Pilot Plant: Ribeirão Vermelho – MG, Brazil*

---

## 🎯 Overview

**ASH Mineral Tech** is an end-to-end industrial operating system designed to govern and automate mineral processing, geopolymer synthesis, and B2B distribution of pure silica and micro-quartz (#100, #200, #325 Mesh and ultrafine fractions).

```
┌────────────────────────────────────────┐
│         ASH MINERAL TECH OS            │
│     (Project IDX / React 18 / Tailwind)│
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│           LAYER 3: EXECUTIVE           │
│     Cassio Executive (Gemini 2.0)      │
│  - Strategic Decisions & Margin / P&L  │
└───────────────────▲────────────────────┘
                    │
      ┌─────────────┴─────────────┐
      │                           │
┌─────┴──────────────┐   ┌────────┴─────────────┐
│  LAYER 2: SUPERVISORS │   │ LAYER 1: MULTIMODAL │
│ - Dr. Cecilia (HR / NRs)│   │ - Gemini Vision Mesh Audit │
│ - Eng. Gustavo (Logistics)│ │ - Invoice & Packing List OCR │
│ - Auditor Marcelo (P&L) │   │ - Charles Ops Chatbot │
└──────▲─────────────┘   └────────▲─────────────┘
       │                          │
       └────────────┬─────────────┘
                    │
┌───────────────────┴────────────────────┐
│         AUTONOMOUS SPARK GATEWAY       │
│     REST / Real-Time Telemetry         │
│   (Mills / Crushers / Inventory)       │
└────────────────────────────────────────┘
```

---

## 🧠 AI Architecture Highlights

- **Multimodal Mesh Audit**: Endpoint `/api/vision/inspect-mesh` processes microscopic sample images via Gemini 2.0 Flash Vision to certify #325 Mesh before dispatch.
- **Structured Executive Reasoning**: Cassio Executive uses native `responseSchema` from the `@google/genai` SDK, eliminating hallucinations in financial and operational deliberations.
- **SPARK Gateway**: Continuous real-time telemetry from vibration, current and grinding sensors.

---

## 🚀 Local Setup

```bash
git clone https://github.com/eduardo6moraes-bot/ash-mineral-tech.git
cd ash-mineral-tech
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000

Built with Google AI Studio, Gemini 2.0 Flash and Project IDX for the Build with Gemini XPRIZE.
