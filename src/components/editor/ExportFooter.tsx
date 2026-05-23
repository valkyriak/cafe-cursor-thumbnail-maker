import { useState, type RefObject } from "react";
import { AlertCircle, ChevronDown, Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { exportMockup, type ExportFormat } from "@/lib/export";
import { DEVICES } from "@/lib/devices";
import { useMockupStore } from "@/state/useMockupStore";

interface ExportFooterProps {
  stageRef: RefObject<HTMLDivElement | null>;
}

export function ExportFooter({ stageRef }: ExportFooterProps) {
  const screenshot = useMockupStore((s) => s.screenshotDataUrl);
  const deviceId = useMockupStore((s) => s.deviceId);

  const [busy, setBusy] = useState<null | ExportFormat>(null);
  const [error, setError] = useState<string | null>(null);

  const ready = screenshot !== null;

  async function handleExport(format: ExportFormat) {
    if (!stageRef.current) return;
    if (!ready) {
      setError("Upload a screenshot to export.");
      return;
    }
    setError(null);
    setBusy(format);
    try {
      await exportMockup(stageRef.current, {
        format,
        filename: `cafe-cursor-${DEVICES[deviceId].id}-${Date.now()}.${format}`,
        pixelRatio: 2,
      });
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? e.message : "Export failed. Try a smaller image.",
      );
    } finally {
      setBusy(null);
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 border-t border-border bg-white px-4 py-3",
        "pb-[max(theme(spacing.3),env(safe-area-inset-bottom))]",
      )}
    >
      {!ready ? (
        <p
          role="status"
          className="flex items-start gap-1.5 text-[11px] text-muted-foreground"
        >
          <AlertCircle className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
          <span>Upload a screenshot to enable export.</span>
        </p>
      ) : error ? (
        <p
          role="alert"
          className="flex items-start gap-1.5 text-[11px] text-destructive"
        >
          <AlertCircle className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}

      <div className="flex gap-1.5">
        <Button
          variant="brand"
          className="flex-1"
          onClick={() => handleExport("png")}
          disabled={!ready || busy !== null}
          aria-label="Export as PNG"
        >
          {busy === "png" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Download className="size-4" aria-hidden="true" />
          )}
          {busy === "png" ? "Exporting..." : "Export PNG"}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="brand"
              size="icon"
              disabled={!ready || busy !== null}
              aria-label="More export formats"
            >
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport("png")}>
              <Download className="size-4" />
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("jpg")}>
              <Download className="size-4" />
              Export as JPG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
