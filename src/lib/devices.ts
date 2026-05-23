export type DeviceId = "iphone-17-pro" | "macbook-pro-14" | "studio-display";

export interface Device {
  id: DeviceId;
  label: string;
  shortLabel: string;
  framePng: string;
  /** width / height ratio of the full frame PNG (incl. transparent padding). */
  frameAspect: number;
  /** screen window inside the frame, as fractions of the frame dimensions. */
  screen: {
    top: number;
    left: number;
    width: number;
    height: number;
    /** corner radius as a fraction of the screen width, used to mask the screenshot. */
    radius: number;
  };
  /** Native display resolution the user should aim for. */
  recommended: { w: number; h: number };
  /** Approximate frame width to render at, in CSS px, for a nice default size. */
  displayWidth: number;
}

/**
 * Device frame metadata.
 *
 * Frame PNGs are sourced from jamesjingyi/mockup-device-frames (built on top
 * of Apple Developer Resources bezel assets). The `screen` fractions were
 * derived by scanning the alpha channel of each PNG and matching the result
 * against Apple's published native display resolutions.
 */
export const DEVICES: Record<DeviceId, Device> = {
  "iphone-17-pro": {
    id: "iphone-17-pro",
    label: "iPhone 17 Pro",
    shortLabel: "iPhone",
    framePng: "/device-frames/iphone-17-pro.png",
    frameAspect: 1406 / 2822,
    screen: {
      top: 0.03544,
      left: 0.07112,
      width: 0.85704,
      height: 0.92877,
      // ~190px on a 1205px wide screen ≈ 0.158 of screen width
      radius: 0.16,
    },
    recommended: { w: 1206, h: 2622 },
    displayWidth: 320,
  },
  "macbook-pro-14": {
    id: "macbook-pro-14",
    label: 'MacBook Pro 14"',
    shortLabel: "MacBook",
    framePng: "/device-frames/macbook-pro-14.png",
    frameAspect: 3944 / 2564,
    screen: {
      top: 0.11739,
      left: 0.11714,
      width: 0.76547,
      height: 0.76482,
      radius: 0.012,
    },
    recommended: { w: 3024, h: 1964 },
    displayWidth: 820,
  },
  "studio-display": {
    id: "studio-display",
    label: "Studio Display",
    shortLabel: "Display",
    framePng: "/device-frames/studio-display.png",
    frameAspect: 5520 / 4316,
    screen: {
      top: 0.04634,
      left: 0.03623,
      width: 0.92736,
      height: 0.66705,
      radius: 0.006,
    },
    recommended: { w: 5120, h: 2880 },
    displayWidth: 900,
  },
};

export const DEVICE_LIST: Device[] = [
  DEVICES["iphone-17-pro"],
  DEVICES["macbook-pro-14"],
  DEVICES["studio-display"],
];

export function formatRecommended(d: Device): string {
  return `${d.recommended.w.toLocaleString()} × ${d.recommended.h.toLocaleString()}`;
}
