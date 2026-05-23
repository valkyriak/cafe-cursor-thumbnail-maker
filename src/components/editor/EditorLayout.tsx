import { useRef } from "react";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ControlPanel } from "./ControlPanel";
import { ExportFooter } from "./ExportFooter";
import { MockupStage } from "./canvas/MockupStage";

interface EditorLayoutProps {
  onBack: () => void;
}

export function EditorLayout({ onBack }: EditorLayoutProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <div className="grid h-dvh w-full grid-cols-[20rem_1fr] bg-neutral-50">
      <aside className="flex h-dvh flex-col border-r border-border bg-white">
        <header className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            aria-label="Back to landing"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex items-center gap-2">
            <img
              src="/cursor-logo.svg"
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
              className="size-5"
            />
            <span className="text-sm font-medium">Thumbnail Maker</span>
          </div>
        </header>

        <ControlPanel />

        <ExportFooter stageRef={stageRef} />
      </aside>

      <main className="relative min-h-0 min-w-0 overflow-hidden">
        <MockupStage ref={stageRef} className="absolute inset-0" />
      </main>
    </div>
  );
}
