import { apiClient } from "./client";

export interface RunDiagnosticsRequest {
  symptoms: string[];
  model: string;
}

export interface RunDiagnosticsResponse {
  summary: string;
  recommendations: string[];
  alternatives: { title: string; score: number }[];
  raw: unknown[];
}

export function runDiagnostics(payload: RunDiagnosticsRequest) {
  return apiClient.post<RunDiagnosticsResponse>("/api/diagnostics/run", payload);
}
