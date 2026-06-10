export interface Message {
  id: string;
  sender: "user" | "nova" | "system";
  text: string;
  timestamp: string;
}

export interface MetricPoint {
  label: string;
  value: number;
}

export interface AnalysisResponse {
  mode: "sandbox" | "live";
  executiveSummary: string;
  confidenceScore: number;
  sentimentScore: number;
  riskRating: "LOW" | "MEDIUM" | "SUBSTANTIAL" | "CRITICAL";
  rawMarkdown: string;
  projectedRevenue: MetricPoint[];
  systemInsights: string[];
}

export interface Node {
  id: string;
  label: string;
  type: "source" | "transformer" | "sink";
  status: "idle" | "active" | "error";
  x: number;
  y: number;
  connections: string[]; // Connected node IDs
  params: Record<string, string | number | boolean>;
}
