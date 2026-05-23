import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon, UploadCloud, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMockupStore } from "@/state/useMockupStore";
import { readFileAsDataUrl } from "@/lib/file";

export function ScreenshotUpload() {
  const screenshot = useMockupStore((s) => s.screenshotDataUrl);
  const setScreenshot = useMockupStore((s) => s.setScreenshot);

  const onDrop = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;
      const dataUrl = await readFileAsDataUrl(file);
      setScreenshot(dataUrl);
    },
    [setScreenshot],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    multiple: false,
    noClick: true,
  });

  if (screenshot) {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative overflow-hidden rounded-lg border border-border bg-neutral-100">
          <img
            src={screenshot}
            alt="Uploaded screenshot preview"
            className="aspect-video w-full object-cover"
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={open}
            className="flex-1"
          >
            <ImageIcon className="size-3.5" />
            Replace
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setScreenshot(null)}
            aria-label="Remove screenshot"
          >
            <X className="size-3.5" />
          </Button>
        </div>
        <input {...getInputProps()} />
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-neutral-50 px-4 py-8 text-center transition-colors",
        "hover:border-foreground/30 hover:bg-neutral-100",
        isDragActive && "border-brand bg-brand/5",
      )}
    >
      <input {...getInputProps()} />
      <div className="flex size-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
        <UploadCloud className="size-4 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-medium">
          {isDragActive ? "Drop to upload" : "Drag a screenshot here"}
        </p>
        <p className="text-[11px] text-muted-foreground">
          or click to browse · PNG, JPG, WebP
        </p>
      </div>
    </div>
  );
}
