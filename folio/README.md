# Folio

Premium multi-purpose portfolio theme for Hugo. Fully configurable, i18n-ready, animated, and secure.

![Hugo](https://img.shields.io/badge/Hugo-%3E%3D0.120-ff4088?logo=hugo&logoColor=white)
![License](https://img.shields.io/badge/License-Proprietary-blue)
![i18n](https://img.shields.io/badge/i18n-FR%20%7C%20EN-green)

---

## Features

- **9 configurable sections** — Hero, About, Services, Portfolio, Testimonials, Team, Clients, CTA, Contact
- **Enable, disable, and reorder** sections from a single config file
- **GSAP animations** with ScrollTrigger (respects `prefers-reduced-motion`)
- **Multi-mode contact form** — API (fetch JSON), Netlify Forms, or Formspree
- **i18n ready** — French and English included, easily extendable
- **SEO optimized** — Open Graph, Twitter Cards, JSON-LD structured data, canonical URLs
- **Security first** — Dynamic CSP headers, honeypot bot protection, SRI on CDN scripts
- **Fully responsive** — Mobile-first design with smooth breakpoints
- **Accessible** — ARIA attributes, keyboard navigation, focus management
- **CSS custom properties** — Change colors and fonts from config, no CSS editing required
- **Zero JS dependencies** — Vanilla JS + GSAP from CDN
- **Google Fonts** — Dynamic loading from config

---

## Quick Start

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) >= 0.120.0

### Installation

```bash
# From your Hugo site root
cd themes/
git clone https://github.com/Alexandre-Corrette/portfolio.git folio
```

Or add as a Git submodule:

```bash
git submodule add https://github.com/Alexandre-Corrette/portfolio.git themes/folio
```

### Setup

```bash
# Copy the example site config
cp themes/folio/exampleSite/hugo.toml .

# Copy the example data files
cp -r themes/folio/exampleSite/data .

# Copy the example content
cp -r themes/folio/exampleSite/content .

# Copy placeholder images
cp -r themes/folio/exampleSite/static/images static/
```

### Run

```bash
hugo server
```

Your site is live at `http://localhost:1313/`.

---

## Configuration

All configuration is done in `hugo.toml`. Every parameter is documented with bilingual comments (FR/EN).

### General

```toml
[params]
  logo = ""                    # Logo image URL (empty = use logoText)
  logoText = "Studio Horizon"  # Text logo fallback
  description = "Your site description"
  author = "Your Name"
  contactEmail = "hello@example.com"
```

### Colors

All colors are injected as CSS custom properties. Change them here, the entire theme updates instantly.

```toml
[params.colors]
  primary = "#1a1a2e"       # Headings, nav
  accent = "#e2725b"        # Buttons, links, accents
  background = "#fafaf8"    # Page background
  surface = "#ffffff"       # Cards, elevated elements
  text = "#2d2d2d"          # Main text
  textLight = "#6b7280"     # Secondary text
  border = "#e5e5e5"        # Borders
```

### Fonts

Google Fonts loaded dynamically. No need to edit any template.

```toml
[params.fonts]
  display = "Cormorant Garamond"
  displayWeights = "400;500;600;700"
  body = "Outfit"
  bodyWeights = "300;400;500;600"
```

### Sections

Enable, disable, and reorder sections:

```toml
[params.sections]
  hero = true
  about = true
  services = true
  portfolio = true
  testimonials = true
  team = false              # Disabled by default
  clients = false           # Disabled by default
  cta = true
  contact = true
  order = ["hero", "about", "services", "portfolio", "testimonials", "cta", "contact"]
```

Disabled sections produce zero HTML output. The navigation automatically adapts to only show enabled sections.

---

## Content

### Data Files

Section content is stored in YAML files under `data/`.

#### `data/services.yaml`

```yaml
- title: "Web Development"
  description: "Fast, accessible, and secure websites."
  icon: "⚡"           # Emoji or text
  badge: "New"          # Optional
  link: ""              # Optional
```

#### `data/portfolio.yaml`

```yaml
- title: "Project Name"
  description: "What we did for this client."
  image: "/images/project-1.jpg"
  tags: ["Web", "Design"]
  link: "https://..."   # Optional
```

Tags are automatically collected for the portfolio filter buttons.

#### `data/testimonials.yaml`

```yaml
- quote: "Working with them was a fantastic experience."
  author: "Jane Doe"
  role: "CEO, Company"
  avatar: "/images/avatar.jpg"  # Optional
```

#### `data/team.yaml`

```yaml
- name: "Alex Martin"
  role: "Founder & Creative Director"
  image: "/images/team-1.jpg"
  social:
    linkedin: "https://linkedin.com/in/..."
    twitter: ""
    github: ""
    instagram: ""
```

#### `data/clients.yaml`

```yaml
- name: "Client Name"
  logo: "/images/client-1.svg"
  link: ""              # Optional
```

### Pages

- `content/_index.md` — Homepage (sections are driven by params, not content)
- `content/mentions-legales.md` — Legal/privacy page (or any single page)

---

## Hero Section

```toml
[params.hero]
  badge = "Creative Agency"            # Small badge above title
  title = "Studio Horizon"
  subtitle = "We craft memorable digital experiences."
  backgroundImage = "/images/hero.jpg" # Optional background image

  [params.hero.cta1]
    text = "View Projects"
    url = "#portfolio"

  [params.hero.cta2]
    text = "Contact Us"
    url = "#contact"
```

All fields are optional. Empty fields are hidden without leaving empty HTML.

---

## About Section

```toml
[params.about]
  title = ""                           # Empty = uses i18n key
  image = "/images/portrait.jpg"
  imageAlt = "Team photo"
  content = """
**Your story** in Markdown. Supports bold, italic, links, etc.
"""
  [[params.about.counters]]
    value = 48
    label = "Projects delivered"
  [[params.about.counters]]
    value = 6
    label = "Years of experience"
```

Counters animate from 0 to the target value on scroll.

---

## Contact Form

The form supports three submission modes:

### Mode: API (default)

Sends a `fetch()` POST request with JSON body to your endpoint.

```toml
[params.contact]
  formMethod = "api"
  formAction = "https://api.example.com/contact"
```

JSON body sent: `{ "name", "email", "phone", "subject", "message" }`

### Mode: Netlify Forms

```toml
[params.contact]
  formMethod = "netlify"
```

Adds `data-netlify="true"` and honeypot attributes automatically.

### Mode: Formspree

```toml
[params.contact]
  formMethod = "formspree"
  formAction = "https://formspree.io/f/your-id"
```

### Options

```toml
[params.contact]
  title = ""                           # Empty = uses i18n
  honeypotField = "website"            # Invisible anti-bot field
  successMessage = ""                  # Empty = uses i18n
  errorMessage = ""                    # Empty = uses i18n
  subjects = ["Quote request", "Partnership", "Other"]
```

### Security Notes

- **Honeypot field** silently rejects bot submissions
- **Client-side validation**: required fields, email format, maxlength
- **Rate limiting**: submit button disabled for 5 seconds after submission
- **No secrets in client code** — server-side validation is your responsibility
- Uses `textContent` (never `innerHTML`) for all dynamic content

---

## Footer

```toml
[params.footer]
  copyright = "© 2026 Your Name. All rights reserved."

  [[params.footer.links]]
    name = "Legal"
    url = "/legal/"

  [[params.footer.social]]
    platform = "linkedin"
    url = "https://linkedin.com/company/..."

  [[params.footer.social]]
    platform = "github"
    url = "https://github.com/..."
```

Supported social platforms (with SVG icons): `linkedin`, `twitter`, `github`, `instagram`, `youtube`, `tiktok`.

---

## SEO

```toml
[params.seo]
  ogImage = "/images/og-default.jpg"   # Default Open Graph image
  twitterHandle = "@yourhandle"        # Optional
  jsonldType = "Organization"          # "Organization" or "Person"
```

The theme generates:
- `<meta>` tags (description, author, canonical, robots)
- Open Graph tags (`og:title`, `og:image`, `og:type`, etc.)
- Twitter Cards (`summary_large_image`)
- JSON-LD structured data (Organization/Person + WebPage schemas)
- `robots.txt` (via Hugo)
- Sitemap (auto-generated by Hugo)

---

## i18n

The theme ships with French (`fr.toml`) and English (`en.toml`) translations.

Set your language in `hugo.toml`:

```toml
languageCode = "en"
defaultContentLanguage = "en"
```

### Adding a Language

Create `i18n/de.toml` (or any locale) with the same keys as `en.toml`. All 30+ UI strings are covered: navigation labels, section titles, form fields, error messages, accessibility labels, and more.

Section titles can be overridden per-language in config (`params.about.title`, etc.). If left empty, the i18n key is used.

---

## Security

### Content Security Policy

The theme generates a dynamic CSP `<meta>` tag:

```
default-src 'self';
script-src 'self' https://cdnjs.cloudflare.com;
style-src 'self' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data:;
connect-src 'self' <your-form-endpoint>;
frame-ancestors 'none';
form-action 'self';
base-uri 'self'
```

Toggle CSP and add extra domains:

```toml
[params.security]
  cspEnabled = true
  extraConnectSrc = "https://analytics.example.com"
```

### Additional Measures

- **SRI hashes** on all CDN scripts (GSAP, ScrollTrigger)
- **Markdown rendering** with `unsafe = false` (no raw HTML injection)
- **External execution** blocked (`security.exec.allow = []`)
- **Referrer policy**: `strict-origin-when-cross-origin`
- **No `eval()`** or `innerHTML` with dynamic content anywhere in JS

---

## Deployment

### Netlify

```toml
# netlify.toml
[build]
  command = "hugo --minify"
  publish = "public"

[build.environment]
  HUGO_VERSION = "0.128.0"
```

### Vercel

```json
{
  "build": {
    "command": "hugo --minify",
    "output": "public"
  }
}
```

### GitHub Pages

Use the [Hugo GitHub Action](https://github.com/peaceiris/actions-hugo):

```yaml
- uses: peaceiris/actions-hugo@v3
  with:
    hugo-version: '0.128.0'
    extended: true
- run: hugo --minify
```

### Recommended Headers (any host)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Permissions-Policy: camera=(), microphone=(), geolocation=()
Referrer-Policy: strict-origin-when-cross-origin
```

---

## Project Structure

```
folio/
├── archetypes/default.md
├── i18n/
│   ├── en.toml
│   └── fr.toml
├── layouts/
│   ├── 404.html
│   ├── index.html
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── list.html
│   │   └── single.html
│   └── partials/
│       ├── head.html
│       ├── header.html
│       ├── footer.html
│       ├── components/
│       │   ├── button.html
│       │   ├── card.html
│       │   ├── counter.html
│       │   └── social-icons.html
│       ├── sections/
│       │   ├── hero.html
│       │   ├── about.html
│       │   ├── services.html
│       │   ├── portfolio.html
│       │   ├── testimonials.html
│       │   ├── team.html
│       │   ├── clients.html
│       │   ├── cta.html
│       │   └── contact.html
│       └── seo/
│           ├── meta.html
│           ├── opengraph.html
│           └── jsonld.html
├── static/
│   ├── css/
│   │   ├── main.css
│   │   ├── animations.css
│   │   └── utilities.css
│   ├── js/
│   │   ├── main.js
│   │   └── animations.js
│   └── images/favicon.svg
├── exampleSite/
├── theme.toml
├── LICENSE
└── README.md
```

---

## License

Copyright (c) 2026 Alexandre Corrette / Groupe Horao. All rights reserved.

Licensed for use on a single website per purchase. Redistribution, resale, or sublicensing is prohibited without written permission.

For licensing inquiries: contact@groupehorao.com
