import { useEffect, useState } from "react";

import { LandingPage } from "@/components/LandingPage";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { TooltipProvider } from "@/components/ui/tooltip";

type View = "landing" | "editor";

function viewFromHash(): View {
  return window.location.hash === "#/editor" ? "editor" : "landing";
}

export default function App() {
  const [view, setView] = useState<View>(viewFromHash);

  useEffect(() => {
    const onHash = () => setView(viewFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function go(next: View) {
    window.location.hash = next === "editor" ? "#/editor" : "";
  }

  return (
    <TooltipProvider delayDuration={120}>
      {view === "landing" ? (
        <LandingPage onStart={() => go("editor")} />
      ) : (
        <EditorLayout onBack={() => go("landing")} />
      )}
    </TooltipProvider>
  );
}
