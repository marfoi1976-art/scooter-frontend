import React, { useEffect, useState } from "react";
import { fetchGuides, GuideDto } from "../api/guides";

export const GuidesList: React.FC = () => {
  const [items, setItems] = useState<GuideDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchGuides()
      .then(setItems)
      .catch(err => setError(err.message || "Failed to load guides"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: "#9ca3af" }}>Loading guides...</div>;
  if (error) return <div style={{ color: "#fca5a5" }}>{error}</div>;

  return (
    <div style={{ display: "grid", gap: "10px" }}>
      {items.map(g => (
        <div key={g._id} style={{ padding: "14px", borderRadius: "8px", backgroundColor: "#0f172a", border: "1px solid #1f2937" }}>
          <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "8px" }}>{g.title}</div>
          <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "8px" }}>
            Keywords: {g.keywords.join(", ")}
          </div>
          <ol style={{ paddingLeft: "18px", fontSize: "13px", display: "grid", gap: "4px" }}>
            {g.steps.map((s, i) => (
              <li key={i} style={{ color: s.startsWith("⚠️") ? "#fbbf24" : "#e5e7eb" }}>{s}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};
