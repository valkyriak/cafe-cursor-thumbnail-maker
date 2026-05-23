import { create } from "zustand";

import type { DeviceId } from "@/lib/devices";
import { DEFAULT_PROJECT_FONT } from "@/lib/google-fonts";

export type Background =
  | { kind: "solid"; color: string }
  | { kind: "gradient"; presetId: string }
  | { kind: "image"; dataUrl: string };

export interface MockupState {
  deviceId: DeviceId;
  screenshotDataUrl: string | null;
  background: Background;
  padding: number;
  showProjectName: boolean;
  projectName: string;
  projectNameFontId: string;
  projectNameColor: string;

  setDevice: (id: DeviceId) => void;
  setScreenshot: (dataUrl: string | null) => void;
  setBackground: (bg: Background) => void;
  setPadding: (padding: number) => void;
  setShowProjectName: (show: boolean) => void;
  setProjectName: (name: string) => void;
  setProjectNameFontId: (id: string) => void;
  setProjectNameColor: (color: string) => void;
  reset: () => void;
}

const initialState = {
  deviceId: "iphone-17-pro" as DeviceId,
  screenshotDataUrl: null,
  background: { kind: "gradient", presetId: "warm-sun" } as Background,
  padding: 80,
  showProjectName: false,
  projectName: "",
  projectNameFontId: DEFAULT_PROJECT_FONT.id,
  projectNameColor: "#ffffff",
};

export const useMockupStore = create<MockupState>((set) => ({
  ...initialState,
  setDevice: (id) => set({ deviceId: id }),
  setScreenshot: (dataUrl) => set({ screenshotDataUrl: dataUrl }),
  setBackground: (bg) => set({ background: bg }),
  setPadding: (padding) => set({ padding }),
  setShowProjectName: (show) => set({ showProjectName: show }),
  setProjectName: (name) => set({ projectName: name }),
  setProjectNameFontId: (id) => set({ projectNameFontId: id }),
  setProjectNameColor: (color) => set({ projectNameColor: color }),
  reset: () => set(initialState),
}));
