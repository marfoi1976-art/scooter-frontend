import React from "react";

interface LayoutProps {
  currentView: "diagnostics" | "knowledge";
  onChangeView: (view: "diagnostics" | "knowledge") => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, onChangeView, children }) => {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", backgroundColor: "#0f172a", color: "#e5e7eb" }}>
      <header style={{ padding: "16px 24px", borderBottom: "1px solid #1f2937", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#38bdf8" }}>🛴 RideRight</div>
          <div style={{ fontSize: "12px", color: "#9ca3af" }}>Electric Scooter Diagnostics</div>
        </div>
        <nav style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => onChangeView("diagnostics")} style={{ padding: "8px 14px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: currentView === "diagnostics" ? "#2563eb" : "#1f2937", color: "#e5e7eb", fontWeight: 500 }}>
            Diagnostics
          </button>
          <button onClick={() => onChangeView("knowledge")} style={{ padding: "8px 14px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: currentView === "knowledge" ? "#2563eb" : "#1f2937", color: "#e5e7eb", fontWeight: 500 }}>
            Knowledge Base
          </button>
        </nav>
      </header>
      <main style={{ padding: "24px", maxWidth: "960px", margin: "0 auto" }}>
        {children}
      </main>
    </div>
  );
};
