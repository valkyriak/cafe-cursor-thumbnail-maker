import { Separator } from "@/components/ui/separator";

import { BackgroundControls } from "./BackgroundControls";
import { DeviceSelector } from "./DeviceSelector";
import { ProjectNameControls } from "./ProjectNameControls";
import { ScreenshotUpload } from "./ScreenshotUpload";

/**
 * Scrolling sidebar control region. Sits between the header and the
 * Export footer in EditorLayout's flex column.
 */
export function ControlPanel() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <Section title="Device" description="Pick the frame to mock into.">
        <DeviceSelector />
      </Section>
      <Separator />
      <Section
        title="Screenshot"
        description="PNG or JPG — drag in or click to upload."
      >
        <ScreenshotUpload />
      </Section>
      <Separator />
      <Section
        title="Background"
        description="What sits behind the device."
      >
        <BackgroundControls />
      </Section>
      <Separator />
      <Section
        title="Project name"
        description="Show your project title above the device in the export."
      >
        <ProjectNameControls />
      </Section>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 px-4 py-5">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="text-pretty text-xs text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
