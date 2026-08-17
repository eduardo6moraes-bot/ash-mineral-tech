import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bot,
  Boxes,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Factory,
  Gauge,
  GitBranch,
  LayoutDashboard,
  MapPinned,
  MessageSquareText,
  PackageCheck,
  Radio,
  Route,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  WalletCards,
  Wrench,
  XCircle
} from "lucide-react";
import { MOCK_LOGISTICS_ORDERS, MOCK_MACHINES } from "./data/mockData";

 type View = "dashboard" | "executive" | "orders" | "factory" | "logistics" | "inventory" | "finance" | "hr" | "commercial";

type AgentResult = {
  recommendation: string;
  executiveReasoning: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  approved: boolean;
};

const navItems: Array<{ id: View; label: string; icon: typeof LayoutDashboard }> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "executive", label: "Cassio Executive", icon: Sparkles },
  { id: "orders", label: "Orders & OCR", icon: MessageSquareText },
  { id: "factory", label: "Factory Floor", icon: Factory },
  { id: "logistics", label: "Fleet & Freight", icon: Truck },
  { id: "inventory", label: "Ready Products", icon: Boxes },
  { id: "finance", label: "Finance & DRE", icon: CircleDollarSign },
  { id: "hr", label: "People & Compliance", icon: Users },
  { id: "commercial", label: "B2B Matchmaking", icon: GitBranch }
];

const showcase = {
  orderTonnage: 67,
  monthlyTonnage: 1452,
  queueOrders: 8,
  stockFree: 84,
  stockAllocated: 67,
  productPrice: 3014,
  grossRevenue: 201938,
  productionCost: 42500,
  freightCost: 1376,
  netMargin: 158062,
  marginPercent: 78.3,
  customers: 3,
  activeMachines: 2,
  fleetLoads: 2
};

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);

function MetricCard({ label, value, detail, icon: Icon, tone = "blue" }: { label: string; value: string; detail: string; icon: typeof Activity; tone?: "blue" | "green" | "orange" | "violet" }) {
  return (
    <div className={`metric-card tone-${tone}`}>
      <div className="metric-top"><span>{label}</span><Icon size={18} /></div>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function StatusPill({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "amber" | "blue" | "red" | "violet" }) {
  return <span className={`status-pill pill-${tone}`}><span className="status-dot" />{children}</span>;
}

function SectionHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="section-header">
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{description}</p></div>
      {action}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [showcaseLoaded, setShowcaseLoaded] = useState(true);
  const [agentResult, setAgentResult] = useState<AgentResult | null>(null);
  const [agentLoading, setAgentLoading] = useState(false);
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatAnswer, setChatAnswer] = useState("Ask Charles about stock, production, safety or customer dispatch.");
  const [toast, setToast] = useState("Showcase dataset loaded — synthetic values are clearly labeled.");

  const visibleOrders = useMemo(() => MOCK_LOGISTICS_ORDERS, []);
  const visibleMachines = useMemo(() => MOCK_MACHINES, []);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast("Showcase dataset loaded — synthetic values are clearly labeled."), 3500);
  };

  const loadShowcase = () => {
    setShowcaseLoaded(true);
    notify("67 t B2B showcase scenario synchronized across inventory, production, freight and finance.");
  };

  const askCassio = async () => {
    setAgentLoading(true);
    setAgentResult(null);
    try {
      const response = await fetch("/api/cassio/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: "B2B dispatch and margin governance",
          title: "Release the 67 t showcase order",
          summary: "Inventory has 84 t free and 67 t allocated to an active customer order. Freight, production cost and delivery route are within target.",
          financialImpact: showcase.netMargin,
          supervisor: "Fleet and Finance supervisors"
        })
      });
      if (!response.ok) throw new Error("Gemini endpoint unavailable");
      setAgentResult(await response.json() as AgentResult);
      notify("Cassio returned a structured executive recommendation.");
    } catch {
      setAgentResult({
        recommendation: "Approve dispatch and preserve a 17 t safety buffer.",
        executiveReasoning: "The 67 t order is covered by the showcase inventory, the route is inside the freight target and the projected net margin remains positive after production and delivery costs.",
        riskLevel: "Low",
        approved: true
      });
      notify("Demo fallback used: structured decision preserved without exposing a secret key.");
    } finally {
      setAgentLoading(false);
    }
  };

  const askCharles = async () => {
    if (!chatQuestion.trim()) return;
    const question = chatQuestion.trim();
    setChatQuestion("");
    try {
      const response = await fetch("/api/chat/charles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, context: "Showcase dataset: 67 t allocated, 84 t free, 3 B2B customers, 2 active loads." })
      });
      if (!response.ok) throw new Error("Charles endpoint unavailable");
      const data = await response.json() as { reply?: string };
      setChatAnswer(data.reply || "Charles returned no text.");
    } catch {
      setChatAnswer("Showcase answer: 67 t are allocated to the active B2B order, 84 t remain free, and the current plan keeps a 17 t buffer for production continuity.");
    }
  };

  const renderDashboard = () => (
    <>
      <SectionHeader eyebrow="Industrial intelligence platform" title="One operating system from demand to delivery" description="A reproducible showcase of ASH Mineral Tech's AI-native industrial workflow." action={<button className="primary-button" onClick={loadShowcase}><Sparkles size={16} /> Load showcase scenario</button>} />
      <div className="hero-card">
        <div className="hero-copy"><StatusPill>Live demo mode</StatusPill><h3>Make every tonne, machine and decision visible.</h3><p>ASH connects B2B demand, factory telemetry, inventory allocation, fleet execution, finance and people operations in one auditable cockpit.</p><div className="hero-actions"><button className="primary-button" onClick={() => setView("executive")}>Run an executive decision <ArrowRight size={16} /></button><button className="ghost-button" onClick={() => setView("orders")}>Inspect the order journey</button></div></div><div className="hero-orbit"><div className="orbit-core"><Sparkles size={28} /><span>GEMINI</span><small>AI CORE</small></div><span className="orbit-node node-one">Inventory</span><span className="orbit-node node-two">Fleet</span><span className="orbit-node node-three">Finance</span><span className="orbit-node node-four">People</span></div>
      </div>
      <div className="metric-grid">
        <MetricCard label="B2B order in showcase" value={`${showcase.orderTonnage} t`} detail="Allocated to an active customer order" icon={PackageCheck} tone="green" />
        <MetricCard label="Monthly flow" value={`${showcase.monthlyTonnage.toLocaleString("pt-BR")} t`} detail="Demo KPI with transparent labeling" icon={Activity} tone="blue" />
        <MetricCard label="Projected net margin" value={formatBRL(showcase.netMargin)} detail={`${showcase.marginPercent}% after freight and production`} icon={CircleDollarSign} tone="violet" />
        <MetricCard label="AI supervisors online" value="3 layers" detail="Specialists → domain supervisors → Cassio" icon={Bot} tone="orange" />
      </div>
      <div className="two-column">
        <div className="panel"><div className="panel-heading"><div><span className="eyebrow">Business flow</span><h3>67 t order traceability</h3></div><StatusPill tone="blue">Synthetic showcase</StatusPill></div><div className="flow-list"><FlowRow icon={MessageSquareText} title="Demand captured" detail="OCR order → customer, product and tonnage" done /><FlowRow icon={Boxes} title="Inventory allocated" detail={`${showcase.stockAllocated} t allocated / ${showcase.stockFree} t free`} done /><FlowRow icon={Factory} title="Production synchronized" detail="M1 ball mill and B2 cone crusher connected" done /><FlowRow icon={Truck} title="Dispatch optimized" detail="Route, diesel, tolls and delivery window" done /><FlowRow icon={Sparkles} title="Executive decision" detail="Cassio validates margin and risk" /></div></div>
        <div className="panel"><div className="panel-heading"><div><span className="eyebrow">AI-native operations</span><h3>Agents that govern the workflow</h3></div><Bot size={22} className="accent-icon" /></div><div className="agent-stack"><AgentRow name="Charles" role="Operational copilot" text="Answers operators and turns telemetry into next actions." tone="blue" /><AgentRow name="Gustavo" role="Fleet supervisor" text="Optimizes routes, refueling and delivery constraints." tone="orange" /><AgentRow name="Cassio" role="Executive orchestrator" text="Synthesizes domain signals into structured decisions." tone="violet" /></div></div>
      </div>
    </>
  );

  const renderExecutive = () => (
    <><SectionHeader eyebrow="Layer 3 · Gemini executive orchestration" title="Cassio Executive Command Center" description="A structured decision layer that turns operational signals into auditable business actions." action={<StatusPill>GCP connected</StatusPill>} /><div className="metric-grid"><MetricCard label="Decision status" value="Ready" detail="One showcase order awaiting approval" icon={ShieldCheck} tone="green" /><MetricCard label="Risk level" value={agentResult?.riskLevel || "Low"} detail="Derived from stock, route and margin" icon={Gauge} tone="orange" /><MetricCard label="Margin at stake" value={formatBRL(showcase.netMargin)} detail="Net value after direct costs" icon={CircleDollarSign} tone="violet" /><MetricCard label="Hierarchy" value="3 tiers" detail="Specialists, supervisors, executive" icon={GitBranch} tone="blue" /></div><div className="two-column"><div className="panel decision-panel"><div className="panel-heading"><div><span className="eyebrow">Simulation</span><h3>Release the 67 t B2B order</h3></div><StatusPill tone="amber">Needs review</StatusPill></div><p>Run the decision so the demo can show Gemini-backed structured output and the connection between inventory, freight and margin.</p><div className="decision-inputs"><div><span>Inventory coverage</span><strong>{showcase.stockAllocated} t allocated / {showcase.stockFree} t free</strong></div><div><span>Freight estimate</span><strong>{formatBRL(showcase.freightCost)}</strong></div><div><span>Projected net margin</span><strong>{formatBRL(showcase.netMargin)}</strong></div></div><button className="primary-button full-width" onClick={askCassio} disabled={agentLoading}>{agentLoading ? <><Activity size={16} className="spin" /> Running Gemini decision...</> : <><Sparkles size={16} /> Ask Cassio to evaluate</>}</button>{agentResult && <div className={`decision-result risk-${agentResult.riskLevel.toLowerCase()}`}><div className="result-title">{agentResult.approved ? <CheckCircle2 size={18} /> : <XCircle size={18} />} {agentResult.recommendation}</div><p>{agentResult.executiveReasoning}</p></div>}</div><div className="panel"><div className="panel-heading"><div><span className="eyebrow">Supervisor mesh</span><h3>Three domain signals</h3></div></div><AgentRow name="Dra. Cecilia" role="People & compliance" text="Checks operator compliance and work-safety obligations." tone="blue" /><AgentRow name="Eng. Gustavo" role="Fleet & logistics" text="Confirms route, diesel and delivery window." tone="orange" /><AgentRow name="Auditor Marcelo" role="Finance & margins" text={`Validates ${formatBRL(showcase.netMargin)} projected net margin.`} tone="violet" /></div></div></>
  );

  const renderOrders = () => (
    <><SectionHeader eyebrow="Layer 1 · Multimodal intake" title="Orders & OCR" description="Turn a manual B2B order into structured production and delivery work." action={<StatusPill tone="blue">142 captures · 99.2% OCR demo KPI</StatusPill>} /><div className="metric-grid"><MetricCard label="Showcase order" value={`${showcase.orderTonnage} t`} detail="Customer order ready for allocation" icon={PackageCheck} tone="green" /><MetricCard label="Monthly tonnage" value={`${showcase.monthlyTonnage.toLocaleString("pt-BR")} t`} detail="+12% versus previous period" icon={Activity} tone="blue" /><MetricCard label="Orders in queue" value={String(showcase.queueOrders).padStart(2, "0")} detail="Priority: industrial minerals" icon={Boxes} tone="orange" /><MetricCard label="Customers in CRM" value={String(showcase.customers)} detail="B2B accounts matched to products" icon={Users} tone="violet" /></div><div className="two-column"><div className="panel"><div className="panel-heading"><div><span className="eyebrow">Showcase order</span><h3>67 t of high-purity mesh</h3></div><StatusPill>Ready to allocate</StatusPill></div><div className="order-card"><div className="order-icon"><MessageSquareText /></div><div><strong>Industrial coatings customer</strong><span>ASH Pure #325 Mesh · anonymous demo account</span></div><div className="order-value"><strong>67 t</strong><small>due this month</small></div></div><div className="table-like"><div><span>OCR extraction</span><strong>Customer · product · quantity · delivery window</strong></div><div><span>Inventory rule</span><strong>Reserve allocated stock before dispatch</strong></div><div><span>Next agent</span><strong>Charles → Factory → Cassio</strong></div></div></div><div className="panel"><div className="panel-heading"><div><span className="eyebrow">Charles AI</span><h3>Ask the operator copilot</h3></div><Bot size={22} className="accent-icon" /></div><div className="chat-bubble">{chatAnswer}</div><div className="chat-input"><input value={chatQuestion} onChange={event => setChatQuestion(event.target.value)} onKeyDown={event => { if (event.key === "Enter") void askCharles(); }} placeholder="Ask about stock, production or dispatch..." /><button className="icon-button" onClick={() => void askCharles()}><ArrowRight size={17} /></button></div><small className="muted-text">Gemini-backed endpoint with a deterministic demo fallback.</small></div></div></>
  );

  const renderFactory = () => (
    <><SectionHeader eyebrow="Factory telemetry" title="Factory floor" description="Link operators, machines, granulometry and produced volume for traceable production." action={<StatusPill>Telemetry live</StatusPill>} /><div className="metric-grid"><MetricCard label="Machines online" value={`${showcase.activeMachines}/3`} detail="M1 and B2 active in showcase" icon={Factory} tone="green" /><MetricCard label="Produced today" value="84.5 t" detail="Across three tracked machine events" icon={Gauge} tone="blue" /><MetricCard label="Target product" value="#325 mesh" detail="High-purity industrial silica" icon={Boxes} tone="violet" /><MetricCard label="Traceability" value="100%" detail="Machine → operator → batch" icon={ShieldCheck} tone="orange" /></div><div className="panel"><div className="panel-heading"><div><span className="eyebrow">Machine control</span><h3>Critical equipment status</h3></div><button className="ghost-button" onClick={() => notify("Showcase telemetry refreshed.")}><Radio size={16} /> Refresh telemetry</button></div><div className="machine-grid">{visibleMachines.map(machine => <div className="machine-card" key={machine.id}><div className="machine-top"><Factory size={20} /><StatusPill tone={machine.status === "Busy" ? "green" : "amber"}>{machine.status === "Busy" ? "Running" : "Idle"}</StatusPill></div><h4>{machine.name}</h4><span>{machine.currentGranulometry || "Awaiting assignment"}</span><div className="progress"><i style={{ width: machine.status === "Busy" ? "78%" : "18%" }} /></div><small>Operator linked · live production log</small></div>)}</div></div><div className="panel"><div className="panel-heading"><div><span className="eyebrow">Traceability log</span><h3>Recent machine events</h3></div></div><div className="table-like"><div><span>08:15 · M1</span><strong>28.5 t · #325 mesh · forward to dispatch</strong></div><div><span>10:30 · B2</span><strong>32 t · 8–20 mesh · quality check passed</strong></div><div><span>13:45 · P1</span><strong>24 t · #100 mesh · available for allocation</strong></div></div></div></>
  );

  const renderLogistics = () => (
    <><SectionHeader eyebrow="Fleet orchestration" title="Freight & fleet" description="Optimize route, diesel, tolls and delivery visibility from the same order record." action={<StatusPill tone="blue">{showcase.fleetLoads} loads in route</StatusPill>} /><div className="metric-grid"><MetricCard label="Diesel S10 average" value="R$ 5,89/L" detail="Cassio optimization · -4.2%" icon={Truck} tone="orange" /><MetricCard label="Freight cost" value="R$ 49,30/t" detail="Direct cost preserved in margin" icon={Calculator} tone="violet" /><MetricCard label="Route" value="210 km" detail="Ribeirao Vermelho → Contagem" icon={Route} tone="blue" /><MetricCard label="Delivery ETA" value="15:45" detail="GPS-style driver mode" icon={MapPinned} tone="green" /></div><div className="panel route-panel"><div className="route-map"><div className="map-line" /><div className="map-point point-origin"><span>Origin</span><strong>Plant 01</strong></div><div className="map-point point-stop"><span>Fuel stop</span><strong>Posto S10</strong></div><div className="map-point point-destination"><span>Delivery</span><strong>B2B customer</strong></div><div className="route-overlay"><StatusPill>GPS active</StatusPill><strong>BR-381 · safe speed 68 km/h</strong><small>Next stop in 18 km · 3h12m estimate</small></div></div><div className="route-side"><span className="eyebrow">Cassio route recommendation</span><h3>Dispatch with a 17 t buffer</h3><p>Route is within target, diesel stop is selected and the customer delivery window is covered.</p><div className="route-costs"><div><span>Diesel</span><strong>R$ 565</strong></div><div><span>Tolls</span><strong>R$ 118</strong></div><div><span>Maintenance</span><strong>R$ 305</strong></div></div><button className="primary-button" onClick={() => notify("Route package prepared for the driver showcase.")}><MapPinned size={16} /> Prepare driver package</button></div></div><div className="panel"><div className="panel-heading"><div><span className="eyebrow">Transport queue</span><h3>Orders from CRM to road</h3></div></div><div className="transport-list">{visibleOrders.map(order => <div className="transport-row" key={order.id}><div><strong>{order.customerName}</strong><span>{order.tonnage} t · {order.granulometry} · {order.destinationCity}/{order.destinationUF}</span></div><StatusPill tone={order.status === "In Transit" ? "green" : order.status === "Released by Cassio" ? "blue" : "amber"}>{order.status}</StatusPill><strong>{formatBRL(order.totalFreightCost)}</strong></div>)}</div></div></>
  );

  const renderInventory = () => (
    <><SectionHeader eyebrow="Inventory governance" title="Ready products" description="Separate free stock from allocated stock and expose the value of every silo." action={<StatusPill tone="blue">Showcase dataset</StatusPill>} /><div className="metric-grid"><MetricCard label="Free stock" value={`${showcase.stockFree} t`} detail="Available for new B2B demand" icon={Boxes} tone="green" /><MetricCard label="Allocated stock" value={`${showcase.stockAllocated} t`} detail="Reserved for active order" icon={PackageCheck} tone="blue" /><MetricCard label="Inventory value" value={formatBRL(showcase.stockFree * showcase.productPrice)} detail="At current product price" icon={WalletCards} tone="violet" /><MetricCard label="Safety buffer" value="17 t" detail="Protects production continuity" icon={ShieldCheck} tone="orange" /></div><div className="panel inventory-feature"><div><span className="eyebrow">Silo control</span><h3>ASH Pure #325 Mesh</h3><p>High-purity material is split between customer allocation and free stock, so every production decision has a commercial consequence.</p></div><div className="inventory-bar"><div><span>Allocated</span><strong>{showcase.stockAllocated} t</strong></div><div><span>Free</span><strong>{showcase.stockFree} t</strong></div><div className="bar-track"><i style={{ width: `${(showcase.stockAllocated / (showcase.stockAllocated + showcase.stockFree)) * 100}%` }} /></div></div></div><div className="panel"><div className="panel-heading"><div><span className="eyebrow">Charles inventory report</span><h3>Next best action</h3></div><Bot size={22} className="accent-icon" /></div><div className="insight-callout"><Sparkles size={20} /><p>Demand is rising for the next two weeks. Release only the allocated 67 t and preserve 17 t as a production buffer.</p></div></div></>
  );

  const renderFinance = () => (
    <><SectionHeader eyebrow="Finance & DRE governance" title="From gross revenue to net margin" description="Make direct costs visible before an order becomes an executive decision." action={<StatusPill tone="violet">Margin protected</StatusPill>} /><div className="metric-grid"><MetricCard label="Gross revenue" value={formatBRL(showcase.grossRevenue)} detail={`${showcase.orderTonnage} t × R$ 3,014/t`} icon={CircleDollarSign} tone="blue" /><MetricCard label="Production cost" value={formatBRL(showcase.productionCost)} detail="Material and factory allocation" icon={Factory} tone="orange" /><MetricCard label="Freight cost" value={formatBRL(showcase.freightCost)} detail="Route, diesel, tolls and wear" icon={Truck} tone="violet" /><MetricCard label="Net margin" value={formatBRL(showcase.netMargin)} detail={`${showcase.marginPercent}% of gross revenue`} icon={WalletCards} tone="green" /></div><div className="two-column"><div className="panel"><div className="panel-heading"><div><span className="eyebrow">DRE snapshot</span><h3>67 t order economics</h3></div><Calculator size={22} className="accent-icon" /></div><div className="waterfall"><WaterfallRow label="Gross revenue" value={showcase.grossRevenue} max={showcase.grossRevenue} tone="blue" /><WaterfallRow label="Production cost" value={showcase.productionCost} max={showcase.grossRevenue} tone="orange" /><WaterfallRow label="Freight and route" value={showcase.freightCost} max={showcase.grossRevenue} tone="violet" /><WaterfallRow label="Net margin" value={showcase.netMargin} max={showcase.grossRevenue} tone="green" /></div></div><div className="panel"><div className="panel-heading"><div><span className="eyebrow">Decision context</span><h3>Why AI matters here</h3></div><Sparkles size={22} className="accent-icon" /></div><p className="large-copy">A single spreadsheet can show revenue. ASH connects revenue to stock, machine availability, route risk, people compliance and customer service before approving the next action.</p><button className="primary-button" onClick={() => setView("executive")}>Open Cassio decision <ArrowRight size={16} /></button></div></div></>
  );

  const renderHR = () => (
    <><SectionHeader eyebrow="People, policy & compliance" title="People operations with an audit trail" description="Support employees, supervisors and directors with consistent rules and measurable performance signals." action={<StatusPill>Compliance workflow</StatusPill>} /><div className="metric-grid"><MetricCard label="Active operators" value="24" detail="Demo employee roster" icon={Users} tone="blue" /><MetricCard label="Safety checks" value="100%" detail="NR-11 · NR-12 · NR-22 routines" icon={ShieldCheck} tone="green" /><MetricCard label="Open alerts" value="1" detail="ASO renewal due in 15 days" icon={Activity} tone="orange" /><MetricCard label="Performance signals" value="Daily" detail="Production → supervisor insight" icon={Gauge} tone="violet" /></div><div className="two-column"><div className="panel"><div className="panel-heading"><div><span className="eyebrow">Employee self-service</span><h3>Policy, payslip and acknowledgements</h3></div><Users size={22} className="accent-icon" /></div><div className="hr-list"><HrRow icon={WalletCards} title="Payslip access" detail="Employee can review and print the current salary statement." /><HrRow icon={ShieldCheck} title="Policy handbook" detail="Controlled clauses, acknowledgements and version history." /><HrRow icon={Wrench} title="Discipline workflow" detail="Warnings and suspensions follow consistent documented rules." /><HrRow icon={Sparkles} title="Campaigns and engagement" detail="Recognition loops connect effort to operational goals." /></div></div><div className="panel"><div className="panel-heading"><div><span className="eyebrow">Dra. Cecilia</span><h3>Compliance signal for directors</h3></div><Bot size={22} className="accent-icon" /></div><div className="decision-result risk-low"><div className="result-title"><CheckCircle2 size={18} /> Schedule ASO for the operator before the deadline.</div><p>People data becomes an executive signal without exposing personal details in the public showcase.</p></div><div className="mini-chart"><span style={{ height: "42%" }} /><span style={{ height: "60%" }} /><span style={{ height: "53%" }} /><span style={{ height: "78%" }} /><span style={{ height: "70%" }} /><span style={{ height: "88%" }} /></div><small className="muted-text">Illustrative showcase trend — not a payroll or HR export.</small></div></div></>
  );

  const renderCommercial = () => (
    <><SectionHeader eyebrow="Commercial intelligence" title="Match inventory to B2B demand" description="Find the next customer while keeping stock, price, freight and production constraints visible." action={<StatusPill tone="blue">CRM connected</StatusPill>} /><div className="metric-grid"><MetricCard label="Active B2B accounts" value="3" detail="Customer base matched to products" icon={Users} tone="blue" /><MetricCard label="Match score" value="98/100" detail="Immediate demand for #325 mesh" icon={GitBranch} tone="green" /><MetricCard label="Open pipeline" value="3 plants" detail="Mining and water-treatment opportunities" icon={Activity} tone="violet" /><MetricCard label="Next action" value="Schedule PoC" detail="Convert qualified demand into evidence" icon={ArrowRight} tone="orange" /></div><div className="two-column"><div className="panel"><div className="panel-heading"><div><span className="eyebrow">Customer-product fit</span><h3>98% match for 67 t</h3></div><Sparkles size={22} className="accent-icon" /></div><div className="match-card"><div className="match-score">98<span>%</span></div><div><strong>Industrial coatings buyer</strong><p>Needs high-purity #325 mesh; stock is available and the route is inside the delivery window.</p><StatusPill tone="green">Ready for commercial action</StatusPill></div></div><button className="primary-button" onClick={() => notify("Commercial follow-up created in the showcase pipeline.")}><MessageSquareText size={16} /> Create follow-up</button></div><div className="panel"><div className="panel-heading"><div><span className="eyebrow">Pipeline evidence</span><h3>Real opportunities, safe presentation</h3></div><Route size={22} className="accent-icon" /></div><div className="pipeline"><PipelineRow title="Water treatment PoC" status="Proposal" tone="blue" /><PipelineRow title="Iron ore process test" status="Testing" tone="orange" /><PipelineRow title="Gold mining application" status="Discovery" tone="violet" /></div><p className="muted-text">Keep customer names and contract values private; publish only authorized, anonymized evidence.</p></div></div></>
  );

  const content: Record<View, React.ReactNode> = { dashboard: renderDashboard(), executive: renderExecutive(), orders: renderOrders(), factory: renderFactory(), logistics: renderLogistics(), inventory: renderInventory(), finance: renderFinance(), hr: renderHR(), commercial: renderCommercial() };

  return (
    <div className="app-shell">
      <aside className="sidebar"><div className="brand"><div className="brand-mark"><Sparkles size={18} /></div><div><strong>ASH</strong><span>MINERAL TECH</span></div></div><div className="demo-badge"><span className="status-dot" /> SHOWCASE MODE</div><nav>{navItems.map(({ id, label, icon: Icon }) => <button key={id} className={view === id ? "nav-item active" : "nav-item"} onClick={() => setView(id)}><Icon size={17} /><span>{label}</span>{view === id && <ChevronRight size={15} className="nav-arrow" />}</button>)}</nav><div className="sidebar-bottom"><div className="stack-status"><div><span className="status-dot" /> Firebase Cloud</div><div><span className="status-dot" /> Gemini API</div><div><span className="status-dot" /> Charles online</div></div><small>v2.4.0 · public demo</small></div></aside>
      <main className="main-content"><header className="topbar"><div><span className="eyebrow">Ribeirao Vermelho plant · industrial control room</span><h1>ASH Mineral Tech <span>OS</span></h1></div><div className="topbar-actions"><div className="sync-state"><Activity size={15} /> Last sync <strong>just now</strong></div><button className="avatar-button">EM</button></div></header><div className="content-wrap">{content[view]}</div>{showcaseLoaded && <div className="toast"><CheckCircle2 size={16} />{toast}</div>}</main>
    </div>
  );
}

function FlowRow({ icon: Icon, title, detail, done = false }: { icon: typeof Activity; title: string; detail: string; done?: boolean }) {
  return <div className="flow-row"><div className="flow-icon"><Icon size={17} /></div><div><strong>{title}</strong><span>{detail}</span></div>{done ? <CheckCircle2 size={17} className="success-icon" /> : <ArrowRight size={17} className="muted-icon" />}</div>;
}

function AgentRow({ name, role, text, tone }: { name: string; role: string; text: string; tone: "blue" | "orange" | "violet" }) {
  return <div className="agent-row"><div className={`agent-avatar agent-${tone}`}>{name.slice(0, 1)}</div><div><strong>{name}</strong><span>{role}</span><p>{text}</p></div><ChevronRight size={16} className="muted-icon" /></div>;
}

function WaterfallRow({ label, value, max, tone }: { label: string; value: number; max: number; tone: string }) {
  return <div className="waterfall-row"><div><span>{label}</span><strong>{formatBRL(value)}</strong></div><div className="waterfall-track"><i className={`bar-${tone}`} style={{ width: `${Math.max(8, (value / max) * 100)}%` }} /></div></div>;
}

function HrRow({ icon: Icon, title, detail }: { icon: typeof Activity; title: string; detail: string }) {
  return <div className="hr-row"><div className="hr-icon"><Icon size={17} /></div><div><strong>{title}</strong><span>{detail}</span></div><CheckCircle2 size={16} className="success-icon" /></div>;
}

function PipelineRow({ title, status, tone }: { title: string; status: string; tone: "blue" | "orange" | "violet" }) {
  return <div className="pipeline-row"><div className={`pipeline-dot dot-${tone}`} /><strong>{title}</strong><span>{status}</span><ChevronRight size={15} className="muted-icon" /></div>;
}

