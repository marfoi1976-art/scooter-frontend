import React from "react";
import { DiagnosticsForm } from "../components/DiagnosticsForm";

export const HomePage: React.FC = () => {
  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <div>
        <div style={{ fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>What's wrong with your scooter?</div>
        <div style={{ fontSize: "14px", color: "#9ca3af" }}>Select your model, describe the problem, and we'll guide you through the fix — safely.</div>
      </div>
      <DiagnosticsForm />
    </div>
  );
};
