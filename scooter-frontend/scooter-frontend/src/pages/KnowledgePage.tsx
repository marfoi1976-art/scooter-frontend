import React, { useState } from "react";
import { PartsList } from "../components/PartsList";
import { GuidesList } from "../components/GuidesList";

export const KnowledgePage: React.FC = () => {
  const [tab, setTab] = useState<"parts" | "guides">("guides");

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <div>
        <div style={{ fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>Knowledge Base</div>
        <div style={{ fontSize: "14px", color: "#9ca3af" }}>Safety information, parts, and guides — everything you need before you start.</div>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setTab("guides")}
          style={{ padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: tab === "guides" ? "#2563eb" : "#1f2937", color: "#e5e7eb", fontWeight: 500 }}>
          Troubleshooting Guides
        </button>
        <button onClick={() => setTab("parts")}
          style={{ padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: tab === "parts" ? "#2563eb" : "#1f2937", color: "#e5e7eb", fontWeight: 500 }}>
          Parts & Safety
        </button>
      </div>

      {tab === "guides" ? <GuidesList /> : <PartsList />}
    </div>
  );
};
