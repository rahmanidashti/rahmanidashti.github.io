// Shared helpers for the site. Plain ES module, no build step.

const cache = {};

export async function loadJSON(name) {
  if (!cache[name]) {
    cache[name] = fetch('data/' + name + '.json').then(r => {
      if (!r.ok) throw new Error('Failed to load data/' + name + '.json');
      return r.json();
    });
  }
  return cache[name];
}

export const ME = 'Hossein A. Rahmani';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function parseDate(iso) {
  const [y, m, d] = String(iso).split('-').map(Number);
  return { y, m, d };
}

export function shortDate(iso) {
  const { y, m } = parseDate(iso);
  return MONTHS[m - 1] + ' ' + String(y).slice(2);
}

export function longDate(iso) {
  const { y, m, d } = parseDate(iso);
  return MONTHS[m - 1] + ' ' + d + ', ' + y;
}

export function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function initialsOf(name) {
  return String(name).split(/\s+/).filter(p => !/^[A-Z]\.$/.test(p)).map(p => p[0]).join('').slice(0, 2).toUpperCase();
}

// Deterministic soft tint for an avatar, drawn from the site palette.
const AVATAR_TINTS = [
  ['#D8F3E3', '#1B4332'], ['#DBEAFE', '#1E40AF'], ['#EDE9FE', '#5B21B6'],
  ['#FEF3C7', '#92400E'], ['#CCFBF1', '#0F766E'], ['#FEE2E2', '#991B1B']
];

export function avatarTint(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_TINTS[h % AVATAR_TINTS.length];
}

export function queryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

export function venueColors(type) {
  const map = {
    acl: ['#DBEAFE', '#1E40AF'],
    sigir: ['#FEE2E2', '#991B1B'],
    ictir: ['#FEE2E2', '#991B1B'],
    journal: ['#EDE9FE', '#5B21B6'],
    conf: ['#CCFBF1', '#0F766E'],
    workshop: ['#D8F3E3', '#1B4332'],
    arxiv: ['#F3F4F6', '#374151'],
    thesis: ['#F5F0EB', '#57534E']
  };
  return map[type] || map.arxiv;
}

export const TOPIC_COLORS = {
  'IR Evaluation': ['#D1FAE5', '#065F46'],
  'LLMs': ['#DBEAFE', '#1E40AF'],
  'Recommender Systems': ['#EDE9FE', '#5B21B6'],
  'Fairness': ['#FEF3C7', '#92400E'],
  'Conversational Search': ['#CCFBF1', '#0F766E'],
  'POI': ['#FFE4E6', '#9F1239'],
  'NLP': ['#F3F4F6', '#374151'],
  'Other': ['#F3F4F6', '#374151']
};

export function topicColors(t) {
  return TOPIC_COLORS[t] || TOPIC_COLORS.Other;
}

// Renders an author list as React nodes, bolding the site owner and
// linking co-authors to their entry on the publications page.
export function authorNodes(React, authors, coauthors, linkBase) {
  const byName = {};
  (coauthors || []).forEach(c => { byName[c.name] = c; });
  const out = [];
  authors.forEach((a, i) => {
    if (i > 0) out.push(', ');
    if (a === ME) {
      out.push(React.createElement('span', { key: 'a' + i, style: { color: '#1B4332', fontWeight: 600 } }, a));
    } else if (linkBase && byName[a]) {
      out.push(React.createElement('a', {
        key: 'a' + i,
        href: linkBase + byName[a].id,
        style: { color: 'inherit', textDecoration: 'none', borderBottom: '1px solid #D0E8D8' }
      }, a));
    } else {
      out.push(a);
    }
  });
  return out;
}

export function bibtexFor(pub) {
  const key = (pub.authors[0] || 'anon').split(' ').pop().toLowerCase() + pub.year + pub.id.split('-')[0];
  const type = pub.venueType === 'journal' ? 'article' : pub.venueType === 'arxiv' ? 'misc' : 'inproceedings';
  const pad = k => k + ' '.repeat(Math.max(1, 10 - k.length));
  const fields = [
    ['title', pub.title],
    ['author', pub.authors.join(' and ')],
    [type === 'article' ? 'journal' : 'booktitle', pub.venue],
    ['year', String(pub.year)]
  ];
  const url = pub.links && (pub.links.paper || pub.links.arxiv);
  if (url) fields.push(['url', url]);
  const body = fields.map(([k, v]) => '  ' + pad(k) + '= {' + v + '}').join(',\n');
  return '@' + type + '{' + key + ',\n' + body + '\n}';
}
