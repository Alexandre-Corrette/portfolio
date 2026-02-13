# Folio — Premium Hugo Portfolio Theme

A fully configurable, multilingual, secure, and performance-optimized Hugo theme for entrepreneurs, agencies, startups, and freelancers.

**Un thème Hugo portfolio premium** entièrement configurable, multilingue, sécurisé et optimisé pour les entrepreneurs, agences, startups et freelances.

---

## Features

- **100% configurable** — Everything is controlled via `hugo.toml`. No code editing required.
- **Modular sections** — Enable, disable, and reorder sections from config.
- **Multilingual** — i18n-ready with French and English included. Add any language.
- **GSAP animations** — Smooth scroll reveals, counter animations, and staggered entrances.
- **Multi-mode contact form** — Works with your own API, Netlify Forms, or Formspree.
- **Security-first** — Dynamic CSP headers, SRI on CDN resources, honeypot anti-spam.
- **Design tokens** — Colors and fonts are CSS custom properties, changeable in one place.
- **Accessible** — Semantic HTML, ARIA attributes, focus management, `prefers-reduced-motion` support.
- **SEO optimized** — Open Graph, JSON-LD structured data, sitemap, robots.txt.
- **Lightweight** — No frameworks, no build tools. Vanilla CSS + JS only.

---

## Quick Start

### Prerequisites

- Hugo **extended** >= 0.120.0 ([install guide](https://gohugo.io/getting-started/installing/))

### Installation

```bash
# Create a new Hugo site
hugo new site my-portfolio
cd my-portfolio

# Add the theme
git clone https://github.com/your-repo/folio.git themes/folio

# Copy the example configuration
cp themes/folio/exampleSite/hugo.toml .
cp -r themes/folio/exampleSite/data ./data
cp -r themes/folio/exampleSite/content ./content

# Start the dev server
hugo server
```

Open [http://localhost:1313](http://localhost:1313) and you should see the demo site.

### Using the exampleSite directly

```bash
cd themes/folio/exampleSite
hugo server --themesDir ../..
```

---

## Configuration

All configuration lives in `hugo.toml`. The file is extensively commented in both French and English. Below is a guide to each section.

### General Settings

```toml
[params]
  logo = ""                    # Image URL, or leave empty to use logoText
  logoText = "Your Brand"      # Displayed when logo is empty
  description = "Your site description"
  author = "Your Name"
  contactEmail = "hello@example.com"
```

### Colors

Customize the entire color palette. Changes take effect immediately.

```toml
[params.colors]
  primary = "#1a1a2e"          # Headings, navigation
  accent = "#e2725b"           # Buttons, links, highlights
  background = "#fafaf8"       # Page background
  surface = "#ffffff"          # Cards, elevated elements
  text = "#2d2d2d"             # Main text
  textLight = "#6b7280"        # Secondary text
  border = "#e5e5e5"           # Borders, dividers
```

These values are injected as CSS custom properties (`:root` variables) and used throughout all stylesheets. This is the only inline `<style>` block in the theme, generated server-side by Hugo from your config values — no user input is rendered, so there is no XSS risk.

### Fonts

Any Google Fonts family works. Specify the font name and desired weights.

```toml
[params.fonts]
  display = "Cormorant Garamond"    # Headings, hero
  displayWeights = "400;500;600;700"
  body = "Outfit"                    # Body text, UI
  bodyWeights = "300;400;500;600"
```

The theme dynamically builds the Google Fonts URL from these values.

### Sections

Toggle sections on/off and control their display order.

```toml
[params.sections]
  hero = true
  about = true
  services = true
  portfolio = true
  testimonials = true
  team = false                 # Disabled by default
  clients = false              # Disabled by default
  cta = true
  contact = true
  order = ["hero", "about", "services", "portfolio", "testimonials", "team", "clients", "cta", "contact"]
```

Disabled sections produce zero HTML output — no empty wrappers.

### Hero

```toml
[params.hero]
  badge = "Your Tagline Here"           # Small text above the title (optional)
  title = "Your Name"
  subtitle = "What you do, in one sentence."
  backgroundImage = ""                   # Optional background image URL
  [params.hero.cta1]
    text = "View Work"
    url = "#portfolio"
  [params.hero.cta2]
    text = "Contact"
    url = "#contact"
```

### About

```toml
[params.about]
  title = ""                             # Empty = uses i18n default
  image = "/images/portrait.jpg"
  imageAlt = "Description of the image"
  content = "Your bio here. **Markdown** is supported."
  [[params.about.counters]]
    value = 48
    label = "Projects"
  [[params.about.counters]]
    value = 6
    label = "Years"
```

### CTA Banner

```toml
[params.cta]
  title = "Got a project?"
  subtitle = "Let's talk about it."
  buttonText = "Get in touch"
  buttonUrl = "#contact"
```

---

## Content Files

Data-driven sections read from YAML files in the `data/` directory.

### data/services.yaml

```yaml
- title: "Service Name"
  description: "Short description of what you offer."
  icon: "💡"                   # Emoji or SVG reference
  badge: "New"                 # Optional badge text
  link: "https://..."          # Optional link
```

### data/portfolio.yaml

```yaml
- title: "Project Name"
  description: "What was accomplished."
  image: "/images/project.jpg"
  tags: ["Web", "Design"]      # Used for filtering
  link: "https://..."
```

### data/testimonials.yaml

```yaml
- quote: "What the client said about your work."
  author: "Jane Doe"
  role: "CEO, Company"
  avatar: "/images/avatar.jpg" # Optional
```

### data/team.yaml

```yaml
- name: "Team Member"
  role: "Their Role"
  image: "/images/member.jpg"
  social:
    linkedin: "https://..."
    github: "https://..."
```

### data/clients.yaml

```yaml
- name: "Client Name"
  logo: "/images/client-logo.svg"
  link: "https://..."          # Optional
```

---

## Contact Form

The form supports three submission modes, configured in `hugo.toml`.

### Mode 1: Custom API (default)

Sends a JSON POST request to your own backend.

```toml
[params.contact]
  formAction = "https://api.yourdomain.com/contact"
  formMethod = "api"
```

The request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Selected subject",
  "message": "The message content",
  "phone": "+33 6 00 00 00 00"
}
```

Your backend is responsible for CSRF protection, server-side validation, rate limiting, and input sanitization. The frontend provides defense-in-depth only (HTML5 validation, honeypot, UI rate limiting).

If you use Symfony, ensure `nelmio_cors` allows the exact origin of your portfolio site. Never use a wildcard `*` in production.

### Mode 2: Netlify Forms

```toml
[params.contact]
  formAction = ""              # Not needed for Netlify
  formMethod = "netlify"
```

The theme adds the `netlify` attribute and `data-netlify-honeypot` automatically.

### Mode 3: Formspree

```toml
[params.contact]
  formAction = "https://formspree.io/f/your-form-id"
  formMethod = "formspree"
```

### Anti-spam

A honeypot field is included by default (hidden from users, caught by bots). The field name is configurable:

```toml
[params.contact]
  honeypotField = "website"    # Change this to vary across sites using the theme
```

If a bot fills in this field, the submission is silently rejected client-side.

The submit button is also disabled for 5 seconds after each submission to prevent rapid-fire requests.

---

## Internationalization (i18n)

The theme ships with French (`i18n/fr.toml`) and English (`i18n/en.toml`). Every user-facing string in the templates uses `{{ i18n "key" }}`.

### Adding a new language

1. Create `i18n/de.toml` (for German, for example)
2. Copy the keys from `fr.toml` or `en.toml` and translate them
3. Set `defaultContentLanguage = "de"` in `hugo.toml`

### Overriding a translation

Section titles can be overridden per-section in the config:

```toml
[params.about]
  title = "Who We Are"         # Overrides i18n "about_title"
```

If the title is empty, the i18n default is used.

---

## Deployment

### Netlify

A `netlify.toml` is included in `exampleSite/`:

```toml
[build]
  command = "hugo --minify"
  publish = "public"

[build.environment]
  HUGO_VERSION = "0.139.0"
```

A `_headers` file is also included with all recommended security headers.

### Vercel

A `vercel.json` is included with security headers configuration.

### GitHub Pages

Use the official Hugo GitHub Action:

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
      - uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: '0.139.0'
          extended: true
      - run: hugo --minify
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

### Docker / Nginx

A `Dockerfile` is included for self-hosted deployments:

```bash
docker build -t folio .
docker run -p 8080:80 folio
```

The Nginx configuration includes all security headers.

---

## Security

### Content Security Policy (CSP)

The theme generates a strict CSP meta tag dynamically from your configuration:

```
default-src 'self';
script-src 'self' https://cdnjs.cloudflare.com;
style-src 'self' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data:;
connect-src 'self' [your formAction URL];
frame-ancestors 'none';
form-action 'self';
base-uri 'self';
```

The `connect-src` directive automatically includes the URL from `params.contact.formAction` so the form can reach your API. Additional domains can be added via `params.security.extraConnectSrc`.

The CSP never includes `unsafe-inline` or `unsafe-eval`.

To disable the CSP meta tag (for example if you set CSP via server headers instead):

```toml
[params.security]
  cspEnabled = false
```

### Subresource Integrity (SRI)

GSAP and ScrollTrigger are loaded from the Cloudflare CDN with SRI hashes. If you update the GSAP version, regenerate the hashes at [srihash.org](https://www.srihash.org/).

All CDN scripts include `crossorigin="anonymous"` and `referrerpolicy="no-referrer"`.

### Hugo Security

```toml
# Prevents raw HTML injection in Markdown content
[markup.goldmark.renderer]
  unsafe = false

# No external command execution
[security]
  [security.exec]
    allow = []
```

### Recommended Server Headers

These headers should be configured on your hosting platform (Netlify `_headers`, Nginx config, etc.). They are included in the deployment files:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Permissions-Policy: camera=(), microphone=(), geolocation=()
Referrer-Policy: strict-origin-when-cross-origin
```

### JavaScript Safety

All JavaScript in this theme follows these rules:

- No `eval()` calls
- No `innerHTML` with dynamic content (uses `textContent` instead)
- No inline scripts — everything in external `.js` files
- No secrets or tokens in client-side code

### Security Audit Checklist

Before going to production, verify:

```bash
# No secrets in the repository
grep -r "api_key\|secret\|token\|password" . --include="*.html" --include="*.js" --include="*.toml"

# Online scanners
# https://securityheaders.com        → Target: A+
# https://observatory.mozilla.org    → Target: A+
# https://csp-evaluator.withgoogle.com → No critical warnings
```

---

## Project Structure

```
folio/
├── LICENSE                          # Commercial proprietary license
├── README.md                        # This file
├── theme.toml                       # Theme metadata for Hugo
├── i18n/
│   ├── fr.toml                      # French translations
│   └── en.toml                      # English translations
├── layouts/
│   ├── _default/
│   │   ├── baseof.html              # Base layout (head, scripts, CSP, SRI)
│   │   ├── list.html                # List pages
│   │   └── single.html              # Single pages (legal, etc.)
│   ├── index.html                   # Homepage (assembles sections)
│   ├── 404.html                     # Custom 404
│   └── partials/
│       ├── head.html                # <head> with dynamic CSP, fonts, tokens
│       ├── header.html              # Navigation (dynamic from config)
│       ├── footer.html              # Footer with social icons
│       ├── sections/                # One partial per section
│       │   ├── hero.html
│       │   ├── about.html
│       │   ├── services.html
│       │   ├── portfolio.html
│       │   ├── testimonials.html
│       │   ├── team.html
│       │   ├── clients.html
│       │   ├── cta.html
│       │   └── contact.html
│       ├── components/              # Reusable components
│       │   ├── button.html
│       │   ├── card.html
│       │   ├── counter.html
│       │   └── social-icons.html
│       └── seo/
│           ├── meta.html
│           ├── opengraph.html
│           └── jsonld.html
├── static/
│   ├── css/
│   │   ├── main.css                 # Core styles (uses CSS custom properties)
│   │   ├── animations.css           # Animation states & keyframes
│   │   └── utilities.css            # Utility classes & accessibility
│   ├── js/
│   │   ├── main.js                  # Nav, burger, smooth scroll
│   │   └── animations.js            # GSAP scroll animations
│   └── images/
└── exampleSite/                     # Complete demo site
    ├── hugo.toml                    # Fully documented config
    ├── netlify.toml
    ├── _headers
    ├── vercel.json
    ├── Dockerfile
    ├── content/
    ├── data/
    └── static/
```

---

## CSS Architecture

The theme uses a strict no-inline-styles policy. All styles live in three files:

| File | Purpose |
|------|---------|
| `main.css` | Core layout, typography, components. Uses `var(--color-*)` and `var(--font-*)` exclusively. |
| `animations.css` | Animation base states, keyframes, and `prefers-reduced-motion` fallback. |
| `utilities.css` | `.container`, `.sr-only`, `:focus-visible`, reduced motion override. |

There is one intentional exception: a `<style>` block in `head.html` that defines `:root` CSS custom properties from your `hugo.toml` colors and fonts. This is generated server-side by Hugo and contains no user-injectable content.

---

## Accessibility

The theme implements the following accessibility features:

- Semantic HTML5 elements (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`)
- `aria-label` on navigation and social links
- `aria-expanded` on the mobile menu toggle
- `aria-live="polite"` on animated counters
- `:focus-visible` outline on all interactive elements
- `prefers-reduced-motion` respected: all animations are disabled when the user requests reduced motion
- `loading="lazy"` on non-critical images
- `alt` attributes on all images (configurable via `imageAlt` params)
- Keyboard navigation: Escape closes mobile menu, focus returns to toggle button

---

## Performance

Target scores with Lighthouse:

| Metric | Target |
|--------|--------|
| Performance | > 95 |
| Accessibility | > 90 |
| Best Practices | > 95 |
| SEO | > 95 |

Optimizations included:

- No JavaScript frameworks — vanilla JS only
- `hugo --minify` for production builds
- `preconnect` to Google Fonts
- `loading="lazy"` on images
- CSS custom properties instead of runtime style calculations
- GSAP loaded from CDN with long cache TTL

---

## Updating GSAP

If you need to update the GSAP version:

1. Find the new version on [cdnjs.cloudflare.com](https://cdnjs.cloudflare.com/ajax/libs/gsap/)
2. Generate new SRI hashes at [srihash.org](https://www.srihash.org/)
3. Update the `<script>` tags in `layouts/_default/baseof.html` with the new URLs and `integrity` values
4. Update `script-src` in the CSP if the CDN domain changed
5. Test thoroughly — GSAP major versions can have breaking API changes

---

## License

Copyright © 2026 Alexandre Corrette / Groupe Horao. All rights reserved.

This theme is licensed for use on a single website per purchase. Redistribution, resale, or sublicensing is prohibited without written permission from the copyright holder.

For licensing inquiries, contact: alexandrecorrette@gmail.com
