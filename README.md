# rahmanidashti.github.io — site structure

Every page is a self-contained Design Component (`.dc.html`) that opens directly in a
browser. All content lives in JSON (and a few HTML fragments), so you edit data, not markup.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Landing page: bio, research areas, recent news, selected papers |
| `publications.html` | Full list with topic/year/author filters, search, featured cards, co-author gallery |
| `paper.html?id=<id>` | One page per paper — co-author avatars, links, abstract, BibTeX |
| `news.html` | Full news archive, grouped by year |
| `news-item.html?id=<id>` | Long-form news item |
| `blog.html` | Post index |
| `post.html?id=<id>` | Blog post |
| `projects.html` | Workshops, benchmarks, resources, challenges |
| `experience.html` | Research positions, internships and education, with place logos |
| `talks.html` | Invited talks |
| `service.html` | Organising, PC, reviewing |
| `teaching.html` | Teaching assistantships |
| `cv.html` | Structured CV + embedded PDF |
| `collaborate.html` | Contact, office hours, students |
| `about.html` | Longer bio and links |
| `SiteNav.dc.html` | Shared top navigation (pass `active="<page>"`) |
| `SiteFooter.dc.html` | Shared footer |

## Data

| File | Used by |
| --- | --- |
| `data/profile.json` | Home (bio, research areas, social links) |
| `data/honors.json` | Home (honor/award pills under the name) |
| `data/publications.json` | Publications, Paper, Home |
| `data/coauthors.json` | Publications gallery, Paper author row (generated from publications) |
| `data/news.json` | News, Home |
| `data/talks.json` | Talks |
| `data/service.json` | Service |
| `data/teaching.json` | Teaching |
| `data/projects.json` | Projects |
| `data/experience.json` | Experience |
| `data/posts.json` | Blog index |
| `data/students.json` | Collaborate |
| `data/cv.json` | CV |
| `data/travel.json` | About (world map) |

Long-form bodies are plain HTML fragments:

- `content/posts/<id>.html` — blog post bodies
- `content/news/<id>.html` — long news bodies (set `"hasPage": true` on the news entry)

## Adding things

**A paper.** Append an object to `data/publications.json`:

```json
{
  "id": "short-slug",
  "year": 2026,
  "abbr": "SIGIR",
  "venue": "ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)",
  "venueType": "sigir",
  "title": "…",
  "authors": ["Hossein A. Rahmani", "…"],
  "topics": ["IR Evaluation"],
  "selected": true,
  "abstract": "…",
  "thumb": "assets/img/papers/short-slug-thumb.png",
  "image": "assets/img/papers/short-slug.png",
  "links": { "paper": "…", "code": "…" }
}
```

`venueType` picks the chip colour (`sigir`, `acl`, `ictir`, `journal`, `conf`, `workshop`,
`arxiv`, `thesis`). `selected: true` surfaces it on the home page. `image` is optional and
renders as a figure at the top of the paper page.

**A paper thumbnail.** Each row on the Publications page can show a 176×132 (4:3) still on
the right. It comes from `thumb` in `data/publications.json`, falling back to `image` if
`thumb` is absent:

```json
"thumb": "assets/img/papers/syndl-thumb.png"
```

Set `image` alone and both the paper-page figure and the list thumbnail use it. Papers with
neither show no thumbnail; the column is only reserved when at least one paper in the
current filtered view has an image, so an all-text list stays full width. Stills are cropped
to fill (`object-fit: cover`) — 4:3 landscape crops sit best.

**A featured card.** The three cards at the top of the Publications page are the papers with
`"featured": true` in `data/publications.json` (first three, in file order). They use the
same `thumb`/`image`, and fall back to a serif venue mark when a paper has no image.

**A co-author photo.** Add a `photo` path to that person's entry in `data/coauthors.json`
(e.g. `assets/img/people/emine-yilmaz.jpg`). Until then the site shows a tinted initials
avatar. `data/coauthors.json` is regenerated from the author lists in
`data/publications.json` — if you add a paper with a new co-author, add them here too.

**An honor/award pill.** Home shows a row of pills under your name, right below the
Turing Institute line — one per entry in `data/honors.json`, hidden entirely when the file
is an empty array. Only `title` is required:

```json
{
  "icon": "🏆",
  "title": "SIGIR Best Paper",
  "count": 2,
  "year": 2024,
  "href": "https://example.com/paper"
}
```

`icon` is any emoji/glyph shown before the title. `count`, if set, renders as `×N` after
the title (for a repeated honor). `year` renders as a muted `· 2024` suffix. `href`, if
set, makes the pill a link (opens in a new tab); omit it for a plain, non-clickable pill.

**A blog post.** Add an entry to `data/posts.json` and write
`content/posts/<id>.html`.

**A long news item.** Add `"id"`, `"title"` and `"hasPage": true` to the news entry and
write `content/news/<id>.html`.

**A place logo.** `data/experience.json` entries take a `logo` path, e.g.
`"logo": "assets/img/logos/ucl.svg"`. Drop the files in `assets/img/logos/` — square-ish
SVG or transparent PNG works best; they are fitted inside a 56px rounded tile
(`object-fit: contain`), so no cropping. Entries with `logo: null` show a tinted monogram —
from the entry's `abbr` field when set (`"abbr": "ZNU"`), otherwise from the organisation's
initials.

**A visited country.** Add an entry to `data/travel.json`:

```json
{ "code": "FR", "name": "France", "photo": null }
```

`code` is the ISO-3166 alpha-2 code (used by the `about.html` world map, powered by
[jsvectormap](https://www.jsvectormap.com/), loaded from a CDN). Set `photo` to an image
path (e.g. `"assets/img/countries/france.jpg"`) to show it in the hover tooltip; `photo:
null` highlights the country with a name-only tooltip until a photo is added.

## Shared code

`js/site.js` holds the data loader, date formatting, slug/initials helpers, the venue and
topic colour maps, the author-list renderer and the BibTeX generator. Nothing else is
shared — each page keeps its own layout.

`js/icons.js` holds the icon set: each entry is a single combined SVG path string for a
24×24 stroke icon, so it can be dropped straight into a template hole
(`<path d="{{ l.iconPath }}">`). `LINK_ICONS` maps a publication/project/talk link key
(`paper`, `arxiv`, `code`, `website`, `slides`, `poster`, `video`) to its icon; unknown keys
fall back to the globe. To add a new link type, add the key to both `LINK_LABELS` in the
page's logic class and `LINK_ICONS` here.

## Assets

- `assets/img/prof_pic.jpg` — profile photo
- `assets/img/blogs/…` — blog figures
- `assets/pdf/Hossein_Rahmani_CV.pdf` — CV
