import { useState } from "react";
import { HexColorPicker } from "react-colorful";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { GOOGLE_FONTS } from "@/lib/google-fonts";
import { useGoogleFont } from "@/hooks/useGoogleFont";
import { useMockupStore } from "@/state/useMockupStore";

const QUICK_COLORS = [
  { label: "White", value: "#ffffff" },
  { label: "Black", value: "#0a0a0a" },
  { label: "Orange", value: "#f97316" },
  { label: "Sky", value: "#38bdf8" },
];

export function ProjectNameControls() {
  const showProjectName = useMockupStore((s) => s.showProjectName);
  const projectName = useMockupStore((s) => s.projectName);
  const projectNameFontId = useMockupStore((s) => s.projectNameFontId);
  const projectNameColor = useMockupStore((s) => s.projectNameColor);
  const setShowProjectName = useMockupStore((s) => s.setShowProjectName);
  const setProjectName = useMockupStore((s) => s.setProjectName);
  const setProjectNameFontId = useMockupStore((s) => s.setProjectNameFontId);
  const setProjectNameColor = useMockupStore((s) => s.setProjectNameColor);

  const fontFamily = useGoogleFont(projectNameFontId);
  const [showPicker, setShowPicker] = useState(false);

  function handleHexInput(raw: string) {
    const val = raw.startsWith("#") ? raw : `#${raw}`;
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setProjectNameColor(val);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor="project-name-toggle" className="text-sm font-medium">
          Cafe project name
        </Label>
        <button
          id="project-name-toggle"
          type="button"
          role="switch"
          aria-checked={showProjectName}
          aria-label="Show project name on thumbnail"
          onClick={() => setShowProjectName(!showProjectName)}
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            showProjectName ? "bg-brand" : "bg-muted",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none block size-4 rounded-full bg-white shadow transition-transform",
              showProjectName ? "translate-x-4" : "translate-x-0",
            )}
          />
        </button>
      </div>

      {showProjectName ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="project-name-input">Project title</Label>
            <Input
              id="project-name-input"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My Cursor project"
              maxLength={80}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="project-name-font">Font</Label>
            <Select
              value={projectNameFontId}
              onValueChange={setProjectNameFontId}
            >
              <SelectTrigger id="project-name-font">
                <SelectValue placeholder="Choose a font" />
              </SelectTrigger>
              <SelectContent>
                {GOOGLE_FONTS.map((font) => (
                  <SelectItem key={font.id} value={font.id}>
                    <span style={{ fontFamily: font.family }}>{font.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Text color */}
          <div className="flex flex-col gap-1.5">
            <Label>Text color</Label>
            <div className="flex items-center gap-2">
              {QUICK_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  aria-label={c.label}
                  title={c.label}
                  onClick={() => setProjectNameColor(c.value)}
                  className={cn(
                    "size-6 rounded-full border-2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    projectNameColor === c.value
                      ? "border-brand scale-110"
                      : "border-border",
                  )}
                  style={{ backgroundColor: c.value }}
                />
              ))}

              {/* Custom color swatch button */}
              <button
                type="button"
                aria-label="Custom color"
                title="Custom color"
                onClick={() => setShowPicker((p) => !p)}
                className={cn(
                  "relative size-6 rounded-full border-2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  showPicker ? "border-brand scale-110" : "border-border",
                )}
                style={{ backgroundColor: projectNameColor }}
              >
                <span className="sr-only">Pick custom color</span>
              </button>

              <Input
                aria-label="Hex color"
                defaultValue={projectNameColor}
                key={projectNameColor}
                onChange={(e) => handleHexInput(e.target.value)}
                className="h-7 flex-1 font-mono text-xs"
                maxLength={7}
                placeholder="#ffffff"
              />
            </div>

            {showPicker && (
              <div className="pt-1">
                <HexColorPicker
                  color={projectNameColor}
                  onChange={setProjectNameColor}
                  className="!w-full"
                />
              </div>
            )}
          </div>

          {projectName.trim() ? (
            <p
              className="rounded-md border border-border bg-neutral-50 px-3 py-2 text-center text-sm font-semibold"
              style={{ fontFamily, color: projectNameColor }}
            >
              {projectName}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
