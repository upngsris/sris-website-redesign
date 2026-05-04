/** Photo projected from Sanity asset reference → { url, alt } */
export interface SanityPhoto {
  url: string;
  alt?: string;
}

/** Social links object — all fields optional except email */
export interface Socials {
  email: string;
  linkedin?:  string;
  whatsapp?:  string;
  twitter?:   string;
  instagram?: string;
}

// ─── Executive Member ─────────────────────────────────────────────────────────
// Matches: executive.ts → name: "ExecutiveMember"

export interface ExecutiveMember {
  _id:         string;
  name:        string;
  role:        string;
  department?: string;
  slug?:       string;          // projected as slug.current in GROQ
  photo?:      SanityPhoto;
  socials?:    Socials;
}

interface NewsArticle {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
}

interface UpcomingEvent {
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
  href: string;
}

interface OfferingCard {
  emoji: string;
  title: string;
  description: string;
}

interface StatItem {
  value: string;
  label: string;
}
