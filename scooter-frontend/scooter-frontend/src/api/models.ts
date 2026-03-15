import { apiClient } from "./client";

export interface ModelDto {
  _id: string;
  name: string;
  manufacturer: string;
}

export function fetchModels() {
  return apiClient.get<ModelDto[]>("/api/models");
}
