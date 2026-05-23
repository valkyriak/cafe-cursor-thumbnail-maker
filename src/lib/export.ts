import { toJpeg, toPng } from "html-to-image";

export type ExportFormat = "png" | "jpg";

export interface ExportOptions {
  format: ExportFormat;
  filename?: string;
  pixelRatio?: number;
}

/**
 * Capture `node` and trigger a browser download.
 *
 * Uses html-to-image which serializes the DOM into an SVG <foreignObject>
 * and renders it onto a canvas. Reliable for our use case because the only
 * external assets are the frame PNG and the user's screenshot, both served
 * from the same origin.
 */
export async function exportMockup(
  node: HTMLElement,
  { format, filename, pixelRatio = 2 }: ExportOptions,
): Promise<void> {
  await document.fonts.ready;

  const opts = {
    cacheBust: true,
    pixelRatio,
    backgroundColor: format === "jpg" ? "#ffffff" : undefined,
    skipFonts: false,
  };

  const dataUrl =
    format === "png"
      ? await toPng(node, opts)
      : await toJpeg(node, { ...opts, quality: 0.95 });

  const link = document.createElement("a");
  link.download = filename ?? defaultFilename(format);
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function defaultFilename(format: ExportFormat): string {
  const stamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .slice(0, 19);
  return `cafe-cursor-${stamp}.${format}`;
}
