import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { HexColorPicker } from "react-colorful";
import { ImagePlus, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { GRADIENTS } from "@/lib/gradients";
import { readFileAsDataUrl } from "@/lib/file";
import { useMockupStore, type Background } from "@/state/useMockupStore";

export function BackgroundControls() {
  const background = useMockupStore((s) => s.background);
  const setBackground = useMockupStore((s) => s.setBackground);

  return (
    <Tabs
      value={background.kind}
      onValueChange={(v) => switchKind(v as Background["kind"], setBackground)}
    >
      <TabsList>
        <TabsTrigger value="solid">Solid</TabsTrigger>
        <TabsTrigger value="gradient">Gradient</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
      </TabsList>

      <TabsContent value="solid">
        <SolidControls />
      </TabsContent>
      <TabsContent value="gradient">
        <GradientGrid />
      </TabsContent>
      <TabsContent value="image">
        <ImageUpload />
      </TabsContent>
    </Tabs>
  );
}

function switchKind(
  kind: Background["kind"],
  set: (bg: Background) => void,
) {
  switch (kind) {
    case "solid":
      set({ kind: "solid", color: "#FAFAFA" });
      break;
    case "gradient":
      set({ kind: "gradient", presetId: "warm-sun" });
      break;
    case "image":
      set({ kind: "image", dataUrl: "" });
      break;
  }
}

function SolidControls() {
  const bg = useMockupStore((s) => s.background);
  const setBackground = useMockupStore((s) => s.setBackground);
  const color = bg.kind === "solid" ? bg.color : "#FAFAFA";
  const [draft, setDraft] = useState(color);

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-lg border border-border">
        <HexColorPicker
          color={color}
          onChange={(c) => setBackground({ kind: "solid", color: c })}
          style={{ width: "100%", height: 140 }}
        />
      </div>
      <div className="flex items-center gap-2">
        <div
          className="size-8 rounded-md border border-border"
          style={{ background: color }}
          aria-hidden="true"
        />
        <Input
          value={draft}
          onChange={(e) => {
            const v = e.target.value;
            setDraft(v);
            if (/^#?[0-9a-fA-F]{6}$/.test(v.replace("#", ""))) {
              setBackground({
                kind: "solid",
                color: v.startsWith("#") ? v : `#${v}`,
              });
            }
          }}
          className="font-mono uppercase"
          aria-label="Hex color"
        />
      </div>
    </div>
  );
}

function GradientGrid() {
  const bg = useMockupStore((s) => s.background);
  const setBackground = useMockupStore((s) => s.setBackground);
  const activeId = bg.kind === "gradient" ? bg.presetId : null;

  return (
    <div className="grid grid-cols-4 gap-2">
      {GRADIENTS.map((g) => (
        <button
          key={g.id}
          type="button"
          onClick={() =>
            setBackground({ kind: "gradient", presetId: g.id })
          }
          aria-pressed={activeId === g.id}
          aria-label={g.label}
          title={g.label}
          className={cn(
            "aspect-square rounded-lg border transition-shadow",
            activeId === g.id
              ? "border-foreground shadow-sm ring-2 ring-foreground/10"
              : "border-border hover:border-foreground/30",
          )}
          style={{ background: g.css }}
        />
      ))}
    </div>
  );
}

function ImageUpload() {
  const bg = useMockupStore((s) => s.background);
  const setBackground = useMockupStore((s) => s.setBackground);
  const dataUrl = bg.kind === "image" ? bg.dataUrl : "";

  const onDrop = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;
      const url = await readFileAsDataUrl(file);
      setBackground({ kind: "image", dataUrl: url });
    },
    [setBackground],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    multiple: false,
    noClick: true,
  });

  if (dataUrl) {
    return (
      <div className="flex flex-col gap-2">
        <div className="overflow-hidden rounded-lg border border-border">
          <img
            src={dataUrl}
            alt="Background preview"
            className="aspect-video w-full object-cover"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={open}
          className="w-full"
        >
          <ImagePlus className="size-3.5" />
          Replace background
        </Button>
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
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-neutral-50 px-4 py-6 text-center transition-colors",
        "hover:border-foreground/30 hover:bg-neutral-100",
        isDragActive && "border-brand bg-brand/5",
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className="size-4 text-muted-foreground" aria-hidden="true" />
      <p className="text-xs font-medium">
        {isDragActive ? "Drop to upload" : "Upload a background image"}
      </p>
    </div>
  );
}
