import { B2BCustomer, B2BMatch, HREmployee, LogisticsOrder, Machine, ExecutiveDecision } from "../types";

export const MOCK_B2B_CUSTOMERS: B2BCustomer[] = [
  {
    id: "cust-01",
    name: "Tintas & Revestimentos Minas S.A.",
    city: "Contagem",
    uf: "MG",
    address: "Distrito Industrial CINCO, Rua 12, 450",
    tel: "(31) 3399-8800",
    cnpj: "19.823.411/0001-92",
    habitualProduct: "ASH Pure #325 Mesh (Micro-Quartz 44µ)",
    active: true
  },
  {
    id: "cust-02",
    name: "Argamassas Centauro Industrial",
    city: "Betim",
    uf: "MG",
    address: "Av. das Indústrias, 1820 - Polo Petroquímico",
    tel: "(31) 3594-7722",
    cnpj: "24.118.905/0001-44",
    habitualProduct: "Filtered Silica Sand #100 Mesh & Dry",
    active: true
  },
  {
    id: "cust-03",
    name: "Polímeros & Resinas Brasil Ltda",
    city: "Belo Horizonte",
    uf: "MG",
    address: "Anel Rodoviário Km 14, Olhos d'Água",
    tel: "(31) 3288-1500",
    cnpj: "33.402.781/0001-50",
    habitualProduct: "ASH Pure Ultra-Fine #400 Mesh (Mineral Fillers)",
    active: true
  }
];

export const MOCK_B2B_MATCHES: B2BMatch[] = [
  {
    customerName: "Tintas & Revestimentos Minas S.A.",
    score: 98,
    reason: "Immediate demand for 56t of ASH Pure #325 Mesh for automotive paint line. Stock ready at Ribeirão Vermelho.",
    contact: "(31) 3399-8800"
  }
];

export const MOCK_EMPLOYEES: HREmployee[] = [
  {
    id: "emp-1",
    name: "Alexandre Silva",
    role: "Crusher & Screen Operator",
    regime: "Full-time CLT",
    admissionDate: "2024-03-15",
    asoStatus: "Valid",
    asoNextDate: "2027-03-15",
    specialCert: "NR-11 & NR-12",
    salary: 3450,
    status: "Active",
    phone: "(35) 99812-4411",
    accumulatedLowPerformanceYearly: 0,
    lastResetYear: 2026,
    performanceHistory: [],
    signedCodeOfConduct: true,
    warningsCount: 0,
    suspensionsCount: 0
  },
  {
    id: "emp-2",
    name: "Francisco Oliveira",
    role: "Ball Mill Operator",
    regime: "Full-time CLT",
    admissionDate: "2023-08-10",
    asoStatus: "Valid",
    asoNextDate: "2026-11-20",
    specialCert: "NR-22",
    salary: 3600,
    status: "Active",
    phone: "(35) 99933-2288",
    accumulatedLowPerformanceYearly: 0,
    lastResetYear: 2026,
    performanceHistory: [],
    signedCodeOfConduct: true,
    warningsCount: 0,
    suspensionsCount: 0
  }
];

export const MOCK_MACHINES: Machine[] = [
  {
    id: "m1",
    name: "Ball Mill M1 (Ribeirão Vermelho)",
    status: "Busy",
    currentOperatorId: "emp-2",
    currentGranulometry: "ASH Pure #325 Mesh"
  },
  {
    id: "m2",
    name: "Cone Crusher B2",
    status: "Busy",
    currentOperatorId: "emp-1",
    currentGranulometry: "8-20 Mesh"
  }
];

export const MOCK_LOGISTICS_ORDERS: LogisticsOrder[] = [
  {
    id: "ord-101",
    customerName: "Tintas & Revestimentos Minas S.A.",
    destinationCity: "Contagem",
    destinationUF: "MG",
    originBase: "Ribeirão Vermelho - MG",
    distanceKm: 210,
    tonnage: 28,
    granulometry: "ASH Pure #325 Mesh",
    truckType: "Semi-trailer LS (32t)",
    dieselLiters: 95.5,
    dieselPricePerLiter: 5.92,
    dieselCost: 565,
    tollCost: 118,
    operationalCost: 305,
    driverFee: 388,
    totalFreightCost: 1376,
    estimatedHours: 3.2,
    status: "In Transit",
    driverName: "Gustavo (Roma Transportes)",
    driverPlate: "ASH-9A28 (Scania R450)",
    carrierName: "Roma Transportes & Mineral Logistics",
    nfeEmitted: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    eta: "15:45"
  }
];

export const MOCK_EXECUTIVE_DECISIONS: ExecutiveDecision[] = [
  {
    id: "dec-01",
    title: "Freight Dispatch Release: Contagem (28t)",
    domain: "Logistics & Freight",
    supervisor: "Fleet Supervisor (Eng. Gustavo)",
    severity: "Medium",
    summary: "Freight order #101 for Tintas & Revestimentos Minas S.A. approved with Fernão Dias route and optimized refueling.",
    recommendedAction: "Dispatch immediately with concurrent NF-e issuance.",
    financialImpact: 1376,
    status: "Approved",
    timestamp: new Date(Date.now() - 7200000).toISOString()
  }
];

export const isDemoMode = (): boolean => {
  const envVal = (import.meta as any).env?.VITE_DEMO_MODE;
  return envVal !== "false";
};
