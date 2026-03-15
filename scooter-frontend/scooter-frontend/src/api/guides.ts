import { apiClient } from "./client";

export interface GuideDto {
  _id: string;
  title: string;
  keywords: string[];
  steps: string[];
}

export interface PrincipleDto {
  _id: string;
  name: string;
  description: string;
}

export function fetchGuides() {
  return apiClient.get<GuideDto[]>("/api/guides");
}

export function fetchPrinciples() {
  return apiClient.get<PrincipleDto[]>("/api/principles");
}
