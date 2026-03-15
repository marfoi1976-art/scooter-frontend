import React, { useEffect, useState } from "react";
import { fetchModels, ModelDto } from "../api/models";
import { runDiagnostics, RunDiagnosticsResponse } from "../api/diagnostics";
import { DiagnosticsResult } from "./DiagnosticsResult";

export const DiagnosticsForm: React.FC = () => {
  const [models, setModels] = useState<ModelDto[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [symptomsInput, setSymptomsInput] = useState<string>("");
  const [loadingModels, setLoadingModels] = useState(false);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RunDiagnosticsResponse | null>(null);

  useEffect(() => {
    setLoadingModels(true);
    fetchModels()
      .then(data => {
        setModels(data);
        if (data.length > 0) setSelectedModel(data[0].name);
      })
      .catch(err => setError(err.message || "Failed to load models"))
      .finally(() => setLoadingModels(false));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!selectedModel || !symptomsInput.trim()) {
      setError("Please select a model and enter at least one symptom");
      return;
    }
    const symptoms = symptomsInput.split(",").map(s => s.trim()).filter(Boolean);
    setRunning(true);
    try {
      const res = await runDiagnostics({ model: selectedModel, symptoms });
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Diagnostics failed");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "14px", padding: "20px", borderRadius: "10px", backgroundColor: "#0f172a", border: "1px solid #1f2937" }}>
        <div style={{ fontSize: "16px", fontWeight: 600 }}>Describe your scooter problem</div>

        <label style={{ display: "grid", gap: "6px", fontSize: "14px" }}>
          <span style={{ color: "#9ca3af" }}>Select your scooter model</span>
          <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)} disabled={loadingModels}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #374151", backgroundColor: "#1f2937", color: "#e5e7eb", fontSize: "14px" }}>
            {models.map(m => (
              <option key={m._id} value={m.name}>{m.manufacturer} · {m.name}</option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: "6px", fontSize: "14px" }}>
          <span style={{ color: "#9ca3af" }}>What's wrong? (separate multiple issues with commas)</span>
          <input type="text" value={symptomsInput} onChange={e => setSymptomsInput(e.target.value)}
            placeholder="e.g. no power, brakes feel soft, throttle not responding"
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #374151", backgroundColor: "#1f2937", color: "#e5e7eb", fontSize: "14px" }} />
        </label>

        {error && <div style={{ fontSize: "13px", color: "#fca5a5", padding: "8px", backgroundColor: "#450a0a", borderRadius: "6px" }}>{error}</div>}

        <button type="submit" disabled={running || loadingModels}
          style={{ padding: "12px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: "#2563eb", color: "#fff", fontWeight: 600, fontSize: "15px", opacity: running ? 0.7 : 1 }}>
          {running ? "Analyzing..." : "Run Diagnostics"}
        </button>
      </form>
      {result && <DiagnosticsResult result={result} />}
    </div>
  );
};
