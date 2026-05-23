export interface GoogleFontOption {
  id: string;
  label: string;
  /** CSS font-family value */
  family: string;
  /** Google Fonts weight axis, e.g. "400;600;700" */
  weights: string;
}

/** Curated Google Fonts suitable for project titles on thumbnails. */
export const GOOGLE_FONTS: GoogleFontOption[] = [
  { id: "inter", label: "Inter", family: "Inter", weights: "400;600;700" },
  { id: "roboto", label: "Roboto", family: "Roboto", weights: "400;700" },
  { id: "open-sans", label: "Open Sans", family: "Open Sans", weights: "400;600;700" },
  { id: "lato", label: "Lato", family: "Lato", weights: "400;700" },
  { id: "montserrat", label: "Montserrat", family: "Montserrat", weights: "400;600;700" },
  { id: "poppins", label: "Poppins", family: "Poppins", weights: "400;600;700" },
  { id: "raleway", label: "Raleway", family: "Raleway", weights: "400;600;700" },
  { id: "oswald", label: "Oswald", family: "Oswald", weights: "400;600;700" },
  { id: "playfair", label: "Playfair Display", family: "Playfair Display", weights: "400;700" },
  { id: "merriweather", label: "Merriweather", family: "Merriweather", weights: "400;700" },
  { id: "source-sans", label: "Source Sans 3", family: "Source Sans 3", weights: "400;600;700" },
  { id: "nunito", label: "Nunito", family: "Nunito", weights: "400;700" },
];

export const DEFAULT_PROJECT_FONT = GOOGLE_FONTS[0];

export function fontById(id: string): GoogleFontOption {
  return GOOGLE_FONTS.find((f) => f.id === id) ?? DEFAULT_PROJECT_FONT;
}

const loaded = new Set<string>();

/** Inject a Google Fonts stylesheet once per family. */
export function loadGoogleFont(font: GoogleFontOption): void {
  const key = `${font.family}:${font.weights}`;
  if (loaded.has(key)) return;
  loaded.add(key);

  const linkId = `gf-${font.id}`;
  if (document.getElementById(linkId)) return;

  const link = document.createElement("link");
  link.id = linkId;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.family)}:wght@${font.weights}&display=swap`;
  document.head.appendChild(link);
}
