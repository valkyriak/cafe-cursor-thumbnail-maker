import { useEffect } from "react";

import { fontById, loadGoogleFont } from "@/lib/google-fonts";

/** Loads the selected Google Font into the document when it changes. */
export function useGoogleFont(fontId: string): string {
  const font = fontById(fontId);

  useEffect(() => {
    loadGoogleFont(fontById(fontId));
  }, [fontId]);

  return font.family;
}
