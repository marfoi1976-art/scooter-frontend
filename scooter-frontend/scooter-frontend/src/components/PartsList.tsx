import React, { useEffect, useState } from "react";
import { fetchParts, PartDto } from "../api/parts";

const riskColor = (risk: string) => {
  if (risk === "critical") return "#ef4444";
  if (risk === "medium") return "#f59e0b";
  return "#22c55e";
};

export const PartsList: React.FC = () => {
  const [items, setItems] = useState<PartDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchParts()
      .then(setItems)
      .catch(err => setError(err.message || "Failed to load parts"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: "#9ca3af" }}>Loading parts...</div>;
  if (error) return <div style={{ color: "#fca5a5" }}>{error}</div>;

  return (
    <div style={{ display: "grid", gap: "10px" }}>
      {items.map(p => (
        <div key={p._id} style={{ borderRadius: "8px", backgroundColor: "#0f172a", border: `1px solid ${riskColor(p.installationRisk)}44` }}>
          <div onClick={() => setExpanded(expanded === p._id ? null : p._id)}
            style={{ padding: "12px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>{p.name}</div>
              <div style={{ fontSize: "12px", color: "#9ca3af" }}>{p.category} · Skill: {p.skillLevelRequired}</div>
            </div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: riskColor(p.installationRisk), textTransform: "uppercase" }}>
              {p.installationRisk} risk
            </div>
          </div>

          {expanded === p._id && (
            <div style={{ padding: "0 14px 14px", display: "grid", gap: "10px", fontSize: "13px" }}>
              <div style={{ color: "#9ca3af" }}>{p.description}</div>

              {p.safetyWarnings?.length > 0 && (
                <div style={{ padding: "10px", borderRadius: "6px", backgroundColor: "#450a0a", border: "1px solid #ef444466" }}>
                  <div style={{ fontWeight: 600, color: "#fca5a5", marginBottom: "6px" }}>⚠️ SAFETY WARNINGS</div>
                  {p.safetyWarnings.map((w, i) => <div key={i} style={{ color: "#fca5a5", marginBottom: "4px" }}>{w}</div>)}
                </div>
              )}

              {p.wrongInstallConsequences && (
                <div style={{ padding: "10px", borderRadius: "6px", backgroundColor: "#1c1917", border: "1px solid #78350f" }}>
                  <div style={{ fontWeight: 600, color: "#fbbf24", marginBottom: "4px" }}>What happens if installed wrong:</div>
                  <div style={{ color: "#fde68a" }}>{p.wrongInstallConsequences}</div>
                </div>
              )}

              {p.toolsRequired?.length > 0 && (
                <div>
                  <div style={{ fontWeight: 600, color: "#9ca3af", marginBottom: "4px" }}>Tools needed:</div>
                  <ul style={{ paddingLeft: "16px", color: "#e5e7eb" }}>
                    {p.toolsRequired.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              )}

              {p.verificationSteps?.length > 0 && (
                <div>
                  <div style={{ fontWeight: 600, color: "#9ca3af", marginBottom: "4px" }}>Verify installation:</div>
                  <ol style={{ paddingLeft: "16px", color: "#e5e7eb" }}>
                    {p.verificationSteps.map((s, i) => <li key={i}>{s}</li>)}
                  </ol>
                </div>
              )}

              {p.compatibilityNotes && (
                <div style={{ color: "#9ca3af", fontStyle: "italic" }}>ℹ️ {p.compatibilityNotes}</div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
