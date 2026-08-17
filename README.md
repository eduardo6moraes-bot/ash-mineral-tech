# ASH Mineral Tech

## AI-native industrial operations from demand to delivery

ASH Mineral Tech is an industrial intelligence cockpit for mineral processing and B2B operations. It connects customer demand, OCR order intake, raw-material inventory, factory machines, finished-product allocation, fleet execution, finance, people operations and executive decisions in one auditable workflow.

> **Showcase mode:** this repository includes a clearly labeled synthetic scenario for demos. Showcase values are not a copy of confidential customer, employee, payroll or contract data. Replace them only with authorized data when running a private deployment.

## Why it matters

Industrial teams usually have the same information split between customer messages, production logs, spreadsheets, dispatch calls, finance workbooks and HR documents. ASH turns that fragmentation into a decision loop:

```text
B2B demand → OCR / structured order → stock allocation → machine traceability
        → freight and route → cost and margin → supervisor signals → Cassio executive decision
```

The public showcase follows a 67 t B2B order. It demonstrates 84 t of free stock, 67 t allocated stock, a 17 t safety buffer, a gross-revenue-to-net-margin view, factory telemetry, a GPS-style driver journey and a structured Cassio recommendation. All showcase figures are synthetic and intentionally visible as demo data.

## Product surface

| Surface | What it demonstrates |
| --- | --- |
| Orders & OCR | Converts a B2B request into customer, product, tonnage and delivery context. |
| Factory Floor | Links operators, machines, granulometry, tonnage and traceability events. |
| Fleet & Freight | Exposes route, fuel, tolls, vehicle constraints, delivery ETA and driver mode. |
| Ready Products | Separates free stock from allocated stock and shows inventory value by granulometry. |
| Finance & DRE | Makes gross revenue, production cost, freight cost and net margin visible together. |
| People & Compliance | Presents employee self-service, policy, safety and performance signals without exposing private records. |
| B2B Matchmaking | Connects customer demand to available product, price and operational constraints. |
| Cassio Executive | Orchestrates domain signals into a structured recommendation with risk and approval fields. |
| Charles | Provides an operational copilot for stock, production, safety and dispatch questions. |

## Multi-agent architecture

ASH follows a layered operating model rather than treating the LLM as a single chat box.

| Layer | Agent role | Example decision |
| --- | --- | --- |
| Specialist workers | Machine, inventory, fleet, finance and people signals | Detect a stock shortfall or route constraint. |
| Domain supervisors | Summarize evidence for a functional area | Confirm whether a dispatch is safe and within cost target. |
| Cassio Executive | Cross-domain orchestration | Approve, reject or escalate an order based on risk and margin. |

The server keeps the Gemini key on the backend. The frontend calls application endpoints and never needs to expose `GEMINI_API_KEY` in browser code.

## Run locally

### Requirements

Node.js 20 or newer and npm are recommended. The application can run in showcase mode without a Gemini key; the assistant buttons then use deterministic demo fallbacks. Add a key only for private testing of the Gemini-backed endpoints.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production-style build:

```bash
npm run lint
npm run build
npm start
```

The build creates the Vite frontend in `dist/` and bundles the Express server as `dist/server.cjs`.

### Environment variables

Create a local `.env` file only when needed. Do not commit it.

```bash
GEMINI_API_KEY=your_key_here
PORT=3000
```

`GEMINI_API_KEY` is read server-side. The showcase remains usable when it is absent, which makes the repository safe to review and easy to reproduce.

## API surface

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/cassio/evaluate` | Returns a structured executive recommendation with risk and approval fields. |
| `POST` | `/api/chat/charles` | Answers operational questions with Charles. |
| `POST` | `/api/vision/inspect-mesh` | Inspects a mineral sample and returns a structured mesh audit. |
| `GET` | `/api/spark/status` | Reports the telemetry gateway status and supported protocols. |
| `POST` | `/api/spark/telemetry` | Accepts machine and production telemetry for alignment with inventory. |

All AI routes validate responses as JSON at the server boundary. The UI gracefully falls back to a synthetic response when the AI endpoint is not configured or is unavailable.

## Suggested demo path

For a two-and-a-half-minute submission video, use one coherent order journey instead of showing every menu. Start with the 67 t B2B demand, show its allocation across free and reserved stock, move to the machine traceability screen, calculate the freight route, open the financial view and finish by asking Cassio to evaluate the decision. Use the People & Compliance and B2B Matchmaking screens as short supporting cuts if time allows.

The public video should use anonymized customers and employees. Keep real proposals, payroll records, contract values and proprietary formulations outside this repository unless they are explicitly approved for publication.

## Validation

The repository is intentionally checked with the same commands a reviewer can run:

```bash
npm run lint   # TypeScript validation
npm run build  # Frontend + Express production build
```

## Project structure

```text
.
├── index.html              # Vite entry point
├── src/
│   ├── App.tsx             # Showcase cockpit and workflow views
│   ├── data/mockData.ts    # Existing domain mock objects
│   ├── types.ts            # Shared domain types
│   ├── main.tsx            # React entry point
│   └── index.css           # Industrial control-room visual system
├── server.ts               # Express + Gemini endpoints
├── vite.config.ts          # Vite, React and Tailwind v4 configuration
└── package.json            # Reproducible scripts and dependencies
```

## Responsible demo disclosure

A production deployment should connect to authenticated data sources, enforce role-based access, log decisions, and apply retention controls for employee and customer records. The public showcase deliberately avoids real personal, payroll and contractual information. The application demonstrates a decision-support workflow; final operational, financial, safety and employment actions remain subject to the responsible human team.
