export interface B2BCustomer {
  id: string;
  name: string;
  city: string;
  uf: string;
  address: string;
  tel: string;
  cnpj?: string;
  habitualProduct: string;
  active?: boolean;
}

export interface B2BMatch {
  customerName: string;
  score: number;
  reason: string;
  contact: string;
}

export interface HREmployee {
  id: string;
  name: string;
  role: string;
  regime: string;
  admissionDate: string;
  asoStatus: "Valid" | "Expires in 15 days" | "Expired";
  asoNextDate: string;
  specialCert: string;
  salary: number;
  status: "Active" | "On Leave" | "Vacation";
  phone: string;
  accumulatedLowPerformanceYearly: number;
  lastResetYear: number;
  performanceHistory: any[];
  signedCodeOfConduct: boolean;
  conductSignatureDate?: string;
  warningsCount: number;
  suspensionsCount: number;
}

export interface Machine {
  id: string;
  name: string;
  status: "Idle" | "Busy" | "Maintenance";
  currentOperatorId?: string;
  currentGranulometry?: string;
}

export interface LogisticsOrder {
  id: string;
  customerName: string;
  destinationCity: string;
  destinationUF: string;
  originBase: string;
  distanceKm: number;
  tonnage: number;
  granulometry: string;
  truckType: string;
  dieselLiters: number;
  dieselPricePerLiter: number;
  dieselCost: number;
  tollCost: number;
  operationalCost: number;
  driverFee: number;
  totalFreightCost: number;
  estimatedHours: number;
  status: "Awaiting Dispatch" | "Released by Cassio" | "In Transit" | "Delivered";
  driverName: string;
  driverPlate: string;
  carrierName: string;
  nfeEmitted: boolean;
  createdAt: string;
  eta: string;
}

export interface ExecutiveDecision {
  id: string;
  title: string;
  domain: "Logistics & Freight" | "HR & Labor Law" | "Finance & Procurement" | "Operations";
  supervisor: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  summary: string;
  details?: string;
  recommendedAction: string;
  financialImpact: number;
  status: "Pending" | "Approved" | "Rejected";
  timestamp: string;
}
