export const SECTION_IDS = ["work", "services", "about", "contact"] as const;

export type SectionId = (typeof SECTION_IDS)[number];
