// Icon paths — 24×24 stroke icons (Lucide-style geometry), one combined path each
// so they can be dropped straight into a template hole: <path d="{{ iconPath }}">

export const ICONS = {
  paper: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6 M9 17h4',
  arxiv: 'M12 7v14 M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z',
  code: 'M16 18l6-6-6-6 M8 6l-6 6 6 6',
  website: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3a19 19 0 0 0 0 18 M12 3a19 19 0 0 1 0 18',
  slides: 'M2 3h20 M3 3v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V3 M8 21l4-6 4 6',
  poster: 'M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M10 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0 M21 16l-5-5L5 21',
  video: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M10 8l6 4-6 4z',
  details: 'M9 18l6-6-6-6',
  email: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z M2.5 6.5l9.5 7 9.5-7',
  download: 'M12 3v12 M7 11l5 5 5-5 M4 21h16',
  scholar: 'M22 9L12 5 2 9l10 4 10-4z M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5',
  github: 'M9 19c-4 1.5-4-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6-1.5 6-6.5a5 5 0 0 0-1.4-3.5 4.6 4.6 0 0 0-.1-3.5s-1.4-.4-4.5 1.7a12.3 12.3 0 0 0-6.2 0C6.8 1.1 5.4 1.5 5.4 1.5a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 4 8.5c0 5 3 6.2 6 6.5a3.4 3.4 0 0 0-.9 2.6V22',
  twitter: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
  linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A6 6 0 0 1 16 8z M6 9H2v12h4z M6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
  semanticscholar: 'M4 19.5V5a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v14 M6 17h14 M6 21h14a1 1 0 0 0 1-1v-1 M6 21a2 2 0 0 1 0-4',
  calendar: 'M8 2v4 M16 2v4 M4 6h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z M3 11h18',
  copy: 'M9 9h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z M5 15H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v1',
  check: 'M20 6L9 17l-5-5',
  news: 'M3 11l18-5v12L3 14v-3z M11.6 16.8a3 3 0 1 1-5.8-1.6',
  blog: 'M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z',
  talks: 'M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z M19 10v1a7 7 0 0 1-14 0v-1 M12 18v4',
  service: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M22 21v-2a4 4 0 0 0-3-3.9 M16 3.1a4 4 0 0 1 0 7.8',
  projects: 'M4 4h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z',
  about: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0'
};

// Which icon a publication/project/talk link key uses.
export const LINK_ICONS = {
  paper: 'paper', arxiv: 'arxiv', code: 'code', website: 'website',
  slides: 'slides', poster: 'poster', video: 'video'
};

export function iconPath(name) {
  return ICONS[name] || '';
}
