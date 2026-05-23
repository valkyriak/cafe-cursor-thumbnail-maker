import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Device } from "@/lib/devices";
import { DEVICE_LIST, formatRecommended } from "@/lib/devices";
import { useMockupStore } from "@/state/useMockupStore";

/** Thumbnail sizing inside the narrow picker cards. */
function pickerImageStyle(device: Device): React.CSSProperties {
  const aspect = device.frameAspect;
  if (aspect < 0.75) {
    return { maxHeight: "52px", width: "auto", maxWidth: "72%" };
  }
  if (aspect > 1.15) {
    return { maxHeight: "40px", width: "100%", maxWidth: "100%" };
  }
  return { maxHeight: "44px", width: "100%", maxWidth: "100%" };
}

export function DeviceSelector() {
  const deviceId = useMockupStore((s) => s.deviceId);
  const setDevice = useMockupStore((s) => s.setDevice);

  return (
    <div className="grid grid-cols-3 gap-2">
      {DEVICE_LIST.map((d) => {
        const active = d.id === deviceId;
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => setDevice(d.id)}
            aria-pressed={active}
            aria-label={d.label}
            className={cn(
              "group relative flex flex-col items-center rounded-lg border bg-neutral-50 p-2 transition-colors",
              "hover:border-foreground/30",
              active
                ? "border-foreground bg-white shadow-sm"
                : "border-border",
            )}
          >
            <div className="flex h-[56px] w-full items-center justify-center overflow-hidden">
              <img
                src={d.framePng}
                alt=""
                aria-hidden="true"
                className="object-contain object-center"
                style={pickerImageStyle(d)}
                draggable={false}
              />
            </div>
            <span className="mt-1.5 w-full truncate text-center text-[11px] font-medium leading-tight text-foreground">
              {d.shortLabel}
            </span>
            {active ? (
              <Check
                className="absolute right-1.5 top-1.5 size-3.5 text-foreground"
                aria-hidden="true"
              />
            ) : null}
          </button>
        );
      })}

      <div className="col-span-3 mt-1 rounded-md bg-neutral-100 px-3 py-2 text-[11px] tabular-nums text-muted-foreground">
        Recommended:{" "}
        <span className="font-medium text-foreground">
          {formatRecommended(activeDevice(deviceId))}
        </span>{" "}
        px
      </div>
    </div>
  );
}

function activeDevice(id: string) {
  return DEVICE_LIST.find((d) => d.id === id) ?? DEVICE_LIST[0];
}
