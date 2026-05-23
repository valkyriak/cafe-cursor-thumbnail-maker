import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <main
      className="relative flex h-dvh w-full flex-col items-center justify-center px-6 text-foreground"
      style={{ backgroundColor: "#F0F0F0" }}
    >
      <div className="flex flex-col items-center gap-8 text-center">
        <img
          src="/cursor-logo.svg"
          alt="Cursor"
          width={56}
          height={56}
          className="size-14"
          draggable={false}
        />

        <div
          className="-rotate-1 flex flex-col items-center text-center"
          aria-label="Cafe Cursor Brisbane event details"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Brisbane · May 23, 2026
          </p>
          <h1 className="landing-sticker-title font-display text-balance text-[clamp(40px,7vw,88px)] font-normal leading-[0.95] text-foreground">
            Cafe Cursor Brisbane
          </h1>
        </div>

        <p className="max-w-md text-pretty text-base text-muted-foreground sm:text-lg">
          Drop a screenshot, slot it into a real Apple device frame, and
          export a thumbnail for your project card.
        </p>

        <Button
          variant="brand"
          size="xl"
          onClick={onStart}
          className="group mt-2"
        >
          Create Thumbnail
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>

      <footer className="absolute inset-x-0 bottom-6 flex justify-center px-6">
        <p className="text-xs text-muted-foreground">
          A contribution to{" "}
          <a
            href="https://github.com/0NATE4/Cafe-Cursor-Brisbane"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            cafecursorbrisbane.com
          </a>
        </p>
      </footer>
    </main>
  );
}
