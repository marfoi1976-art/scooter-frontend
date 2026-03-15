import React, { useState } from "react";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { KnowledgePage } from "./pages/KnowledgePage";

export const App: React.FC = () => {
  const [view, setView] = useState<"diagnostics" | "knowledge">("diagnostics");

  return (
    <Layout currentView={view} onChangeView={setView}>
      {view === "diagnostics" ? <HomePage /> : <KnowledgePage />}
    </Layout>
  );
};
