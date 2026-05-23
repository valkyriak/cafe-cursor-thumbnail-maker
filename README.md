# Cafe Cursor Brisbane — Thumbnail Maker

A small, self-contained React app for generating project-card thumbnails for [cafecursorbrisbane.com](https://github.com/0NATE4/Cafe-Cursor-Brisbane).

Drop a screenshot in, slot it into a real Apple device frame (iPhone 17 Pro, MacBook Pro 14", Studio Display), pick a background, and export a PNG or JPG.

Built with **Vite + React + TypeScript**, **Tailwind**, **shadcn/ui**, and **html-to-image**. Everything runs in the browser — no backend, no uploads.

## Quick start

```bash
git clone <this repo>
cd CursorBrisbaneProject
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and you'll land on the title page. Click **Create Thumbnail** to open the editor.

## Scripts

| Command           | What it does                                          |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Vite dev server with hot reload                       |
| `npm run build`   | Type-check then build to `dist/`                      |
| `npm run preview` | Preview the production build locally                  |
| `npm run lint`    | ESLint over `src/`                                    |

## How it works

The editor is a two-pane layout — controls on the left, a live preview on the right. The preview composes a transparent-screen frame PNG over your uploaded screenshot using percentage-based screen coordinates, so it stays pixel-true at any render size. When you hit **Export**, [`html-to-image`](https://github.com/bubkoo/html-to-image) serializes the preview node into a PNG/JPG at 2× pixel density.

```
src/
├── App.tsx                          # landing ⇄ editor (hash-based view switch)
├── components/
│   ├── LandingPage.tsx
│   └── editor/
│       ├── EditorLayout.tsx         # sidebar + canvas
│       ├── ControlPanel.tsx
│       ├── DeviceSelector.tsx
│       ├── ScreenshotUpload.tsx
│       ├── BackgroundControls.tsx
│       ├── ExportFooter.tsx         # sticky orange CTA + validation
│       └── canvas/
│           ├── MockupStage.tsx      # the exportable surface
│           └── DeviceFrame.tsx      # frame PNG + screenshot composite
├── lib/
│   ├── devices.ts                   # frame metadata + screen rect fractions
│   ├── gradients.ts                 # curated gradient presets
│   ├── export.ts                    # html-to-image wrapper
│   ├── file.ts                      # FileReader → data URL
│   └── utils.ts                     # cn() helper
└── state/useMockupStore.ts          # Zustand store
```

## Adding a new device frame

1. **Get a transparent-screen frame PNG.** The bundled three were exported from [jamesjingyi/mockup-device-frames](https://github.com/jamesjingyi/mockup-device-frames), which derives from [Apple's Design Resources](https://developer.apple.com/design/resources/). Frame PNGs must have the device chassis as opaque pixels and the screen area as fully transparent pixels — that lets the screenshot show through.

2. **Drop the PNG** into `public/device-frames/` (e.g. `public/device-frames/ipad-pro.png`).

3. **Add an entry** in [`src/lib/devices.ts`](src/lib/devices.ts):

   ```ts
   "ipad-pro": {
     id: "ipad-pro",
     label: 'iPad Pro 13"',
     shortLabel: "iPad",
     framePng: "/device-frames/ipad-pro.png",
     frameAspect: 2048 / 2732,
     screen: {
       top: 0.05,    // fractions of the frame, not pixels
       left: 0.05,
       width: 0.9,
       height: 0.9,
       radius: 0.04, // fraction of the screen *width*
     },
     recommended: { w: 2048, h: 2732 },
     displayWidth: 600,
   },
   ```

4. **Append the new id** to `DEVICE_LIST` further down the same file. The sidebar picks up new entries automatically.

> Tip: To find precise `screen.top/left/width/height` values, sample the alpha channel of your PNG — the largest transparent region inside the chassis is the screen. Dividing those pixel offsets by the frame's full width/height gives you the fractions.

## Submitting to the project board

See **[docs/SUBMIT_TO_BOARD.md](docs/SUBMIT_TO_BOARD.md)** for the full checklist (publish this repo, export a cover image, fork [Cafe-Cursor-Brisbane](https://github.com/0NATE4/Cafe-Cursor-Brisbane), open a PR).

A ready-made card JSON lives at [`contribution/cafe-cursor-thumbnail-maker.json`](contribution/cafe-cursor-thumbnail-maker.json).

## Credits

- Device frame PNGs: [jamesjingyi/mockup-device-frames](https://github.com/jamesjingyi/mockup-device-frames) (built on Apple's Design Resources).
- Cursor wordmark and icon: [cursor.com/brand](https://cursor.com/brand).
- UI primitives: [shadcn/ui](https://ui.shadcn.com) on top of [Radix UI](https://www.radix-ui.com).
- DOM-to-image rendering: [`html-to-image`](https://github.com/bubkoo/html-to-image).
