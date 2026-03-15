import React from "react";
import { RunDiagnosticsResponse } from "../api/diagnostics";

interface Props {
  result: RunDiagnosticsResponse;
}

export const DiagnosticsResult: React.FC<Props> = ({ result }) => {
  return (
    <div style={{ display: "grid", gap: "12px", padding: "20px", borderRadius: "10px", backgroundColor: "#0f172a", border: "1px solid #1f2937" }}>
      <div style={{ fontSize: "16px", fontWeight: 600, color: "#38bdf8" }}>Diagnostic Result</div>

      <div style={{ padding: "12px", borderRadius: "6px", backgroundColor: "#1f2937", fontSize: "15px" }}>
        {result.summary}
      </div>

      {result.recommendations && result.recommendations.length > 0 && (
        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>RECOMMENDED STEPS</div>
          <ol style={{ paddingLeft: "20px", fontSize: "14px", display: "grid", gap: "6px" }}>
            {result.recommendations.map((s, i) => (
              <li key={i} style={{ color: s.startsWith("⚠️") ? "#fbbf24" : "#e5e7eb" }}>{s}</li>
            ))}
          </ol>
        </div>
      )}

      {result.alternatives && result.alternatives.length > 0 && (
        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>OTHER POSSIBLE ISSUES</div>
          <ul style={{ paddingLeft: "20px", fontSize: "14px", display: "grid", gap: "4px" }}>
            {result.alternatives.map((a, i) => (
              <li key={i} style={{ color: "#9ca3af" }}>{a.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
