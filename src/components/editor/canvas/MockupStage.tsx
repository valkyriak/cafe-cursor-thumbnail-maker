import { forwardRef, useLayoutEffect, useRef, useState, type HTMLAttributes } from "react";

import { useGoogleFont } from "@/hooks/useGoogleFont";
import { DEVICES } from "@/lib/devices";
import { gradientById } from "@/lib/gradients";
import { cn } from "@/lib/utils";
import { useMockupStore } from "@/state/useMockupStore";

import { DeviceFrame } from "./DeviceFrame";

type MockupStageProps = HTMLAttributes<HTMLDivElement>;

/**
 * Exportable surface: background fills the entire canvas edge-to-edge;
 * device and optional project title sit in a padded inner layer.
 */
export const MockupStage = forwardRef<HTMLDivElement, MockupStageProps>(
  ({ className, style, ...props }, exportRef) => {
  const deviceId = useMockupStore((s) => s.deviceId);
  const screenshot = useMockupStore((s) => s.screenshotDataUrl);
  const background = useMockupStore((s) => s.background);
  const padding = useMockupStore((s) => s.padding);
  const showProjectName = useMockupStore((s) => s.showProjectName);
  const projectName = useMockupStore((s) => s.projectName);
  const projectNameFontId = useMockupStore((s) => s.projectNameFontId);
  const projectNameColor = useMockupStore((s) => s.projectNameColor);

  const device = DEVICES[deviceId];
  const fontFamily = useGoogleFont(projectNameFontId);
  const titleVisible = showProjectName && projectName.trim().length > 0;

  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [deviceWidth, setDeviceWidth] = useState<number>(device.displayWidth);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const observer = new ResizeObserver(() => {
      const titleHeight = titleRef.current?.offsetHeight ?? 0;
      const titleGap = titleVisible ? 24 : 0;
      const w = content.clientWidth - padding * 2;
      const h = content.clientHeight - padding * 2 - titleHeight - titleGap;
      if (w <= 0 || h <= 0) return;
      const widthByHeight = h * device.frameAspect;
      const next = Math.min(w, widthByHeight);
      setDeviceWidth(Math.max(160, Math.floor(next)));
    });

    observer.observe(content);
    return () => observer.disconnect();
  }, [device.frameAspect, padding, titleVisible, projectName]);

  const backgroundStyle = backgroundToStyle(background);

  return (
    <div
      ref={exportRef}
      data-export-root
      className={cn("relative size-full overflow-hidden", className)}
      style={{ ...backgroundStyle, ...style }}
      {...props}
    >
      <div
        ref={contentRef}
        className="flex size-full flex-col items-center justify-center"
        style={{ padding }}
      >
        {titleVisible ? (
          <h2
            ref={titleRef}
            className={cn(
              "mb-6 max-w-[90%] text-balance text-center font-semibold leading-tight",
              "text-[clamp(1.25rem,3vw,2.25rem)]",
            )}
            style={{
              fontFamily,
              color: projectNameColor,
            }}
          >
            {projectName.trim()}
          </h2>
        ) : null}

        <DeviceFrame
          device={device}
          screenshotDataUrl={screenshot}
          width={deviceWidth}
        />
      </div>
    </div>
  );
  },
);
MockupStage.displayName = "MockupStage";

function backgroundToStyle(
  bg: ReturnType<typeof useMockupStore.getState>["background"],
): React.CSSProperties {
  switch (bg.kind) {
    case "solid":
      return { background: bg.color };
    case "gradient":
      return { background: gradientById(bg.presetId).css };
    case "image":
      if (!bg.dataUrl) {
        return { background: "#FAFAFA" };
      }
      return {
        backgroundImage: `url(${bg.dataUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
  }
}
