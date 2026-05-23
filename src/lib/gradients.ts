export interface GradientPreset {
  id: string;
  label: string;
  css: string;
}

/**
 * Editorial gradient palette. Curated for thumbnail contrast against device
 * frames — no purple/multi-color cliches, mostly two-stop linear gradients.
 */
export const GRADIENTS: GradientPreset[] = [
  {
    id: "warm-sun",
    label: "Warm Sun",
    css: "linear-gradient(135deg, #FFB47A 0%, #F97316 100%)",
  },
  {
    id: "espresso",
    label: "Espresso",
    css: "linear-gradient(135deg, #3D2A1E 0%, #1B130C 100%)",
  },
  {
    id: "ink",
    label: "Ink",
    css: "linear-gradient(160deg, #1E1F25 0%, #0A0B0E 100%)",
  },
  {
    id: "stone",
    label: "Stone",
    css: "linear-gradient(180deg, #F4F2EE 0%, #D9D5CE 100%)",
  },
  {
    id: "sage",
    label: "Sage",
    css: "linear-gradient(135deg, #C6D6C2 0%, #6A7E68 100%)",
  },
  {
    id: "tide",
    label: "Tide",
    css: "linear-gradient(135deg, #BDD8DD 0%, #3B6477 100%)",
  },
  {
    id: "rose",
    label: "Rose",
    css: "linear-gradient(135deg, #F8D2C9 0%, #C25B5B 100%)",
  },
  {
    id: "papyrus",
    label: "Papyrus",
    css: "linear-gradient(180deg, #FAFAFA 0%, #ECE7DC 100%)",
  },
];

export function gradientById(id: string): GradientPreset {
  return GRADIENTS.find((g) => g.id === id) ?? GRADIENTS[0];
}
