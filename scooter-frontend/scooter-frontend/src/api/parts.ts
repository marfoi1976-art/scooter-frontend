import { apiClient } from "./client";

export interface PartDto {
  _id: string;
  name: string;
  category: string;
  description: string;
  skillLevelRequired: string;
  installationRisk: string;
  safetyWarnings: string[];
  wrongInstallConsequences: string;
  verificationSteps: string[];
  toolsRequired: string[];
  compatibilityNotes: string;
}

export function fetchParts() {
  return apiClient.get<PartDto[]>("/api/parts");
}
