import { UploadCloud } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Device } from "@/lib/devices";

interface DeviceFrameProps {
  device: Device;
  screenshotDataUrl: string | null;
  /** Rendered width in CSS px. Height derived from frame aspect. */
  width: number;
}

/**
 * Composes a device frame PNG over a user screenshot. The screenshot is
 * absolutely positioned inside the wrapper using the device's `screen`
 * fractions, then clipped with a matching border-radius. The frame PNG sits
 * on top with `pointer-events: none` so all interaction goes to the
 * underlying screenshot.
 */
export function DeviceFrame({
  device,
  screenshotDataUrl,
  width,
}: DeviceFrameProps) {
  const height = width / device.frameAspect;
  const screenWidthPx = width * device.screen.width;
  const radiusPx = screenWidthPx * device.screen.radius;

  return (
    <div
      className="relative isolate select-none"
      style={{
        width,
        height,
        aspectRatio: device.frameAspect,
      }}
      role="img"
      aria-label={`${device.label} mockup preview`}
    >
      <div
        className="absolute overflow-hidden"
        style={{
          top: `${device.screen.top * 100}%`,
          left: `${device.screen.left * 100}%`,
          width: `${device.screen.width * 100}%`,
          height: `${device.screen.height * 100}%`,
          borderRadius: radiusPx,
          backgroundColor: "#000",
        }}
      >
        {screenshotDataUrl ? (
          <img
            src={screenshotDataUrl}
            alt=""
            className="size-full object-cover"
            draggable={false}
          />
        ) : (
          <EmptyScreenPrompt />
        )}
      </div>

      <img
        src={device.framePng}
        alt=""
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 size-full",
          "drop-shadow-[0_24px_48px_rgba(0,0,0,0.18)]",
        )}
        draggable={false}
      />
    </div>
  );
}

function EmptyScreenPrompt() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 bg-neutral-100 text-neutral-500">
      <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
        <UploadCloud className="size-5" />
      </div>
      <p className="text-balance px-6 text-center text-sm font-medium">
        Drop a screenshot in the sidebar
        <br />
        to preview it here
      </p>
    </div>
  );
}
