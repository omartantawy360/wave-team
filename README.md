# 🌊 Wave Team — Digital Studio Portfolio

An ultra-premium, high-performance front-end engineering portfolio and agency landing page. Built with a cutting-edge technical architecture combining **TanStack Start (SSR)**, **React 19**, and a highly optimized, motion-rich, glassmorphic client-facing site with full bilingual (English & Arabic) RTL capabilities.

---

## ✨ Features & Premium Experiences

### 🌍 Intelligent Bilingual & RTL Engine

- **Arabic-First Design:** Optimized for regional prominence with Cairo typography and fully mirror-responsive layouts.
- **Seamless Language Toggle:** Hot-swaps the DOM attributes (`lang` and `dir="rtl"`) on-the-fly.
- **Localized Key-Value Dictionary:** Translates all interface strings, services, dynamic projects, and form elements instantly without layout shifts or reloading.

### 🎨 Visual Excellence & Rich Aesthetics

- **Glassmorphic Component Architecture:** Sleek, translucent cards featuring floating border-gradients, drop-shadow elevations, and real-time backdrop filtering.
- **Fluid Theme Engine:** One-click toggling between an immersive, futuristic dark-space mode and a clean, high-contrast ice-blue light mode.
- **Custom Trailing Cursor:** An interactive circular cursor with momentum physics and automatic size-scaling/color-blending when hovering over interactive elements.
- **Dynamic Blob-Glow Tracker:** A soft, ambient light blob that follows the user's cursor behind the glass layers to create premium depth and texture.
- **Aurora CSS Animations:** Three massive multi-color ambient dust clouds that drift and morph across the screen using smooth infinite bezier animations.

### ⚡ Performance & Content Rendering

- **Dynamic Grid Injection:** Services, portfolio cards, and team listings are loaded programmatically from a single configuration schema, keeping the HTML template clean.
- **"Show More" Lazy Layout:** Optimizes initial viewport loading speeds by limiting visible projects to a curated set, rendering remaining items instantly on user click.
- **Core Web Vital Driven:** Built using native browser constructs (`IntersectionObserver` for scroll reveals, native CSS variables, optimized media formats) ensuring sub-second visual rendering.

### 💬 Conversion-Focused WhatsApp Flow

- **Frictionless Lead Capture:** The elegant contact section validates user input and generates an automated prefilled query.
- **Instant Handshake:** Clicking submit redirects clients directly to a designated WhatsApp business line (`+20 15 50888640`) for lightning-fast business conversion.

---

## 🛠️ Technology Stack

### 🚀 Core Platform (SSR Engine)

- **Framework:** [TanStack Start](https://tanstack.com/router/latest/docs/start/overview) (Server-Side Rendering + Router combo)
- **Library:** React 19 (Modern hooks, state management, and component architecture)
- **Routing:** TanStack Router (Typesafe, robust route hierarchy)
- **Data Fetching:** TanStack Query v5 (Caching and asynchronous state manager)
- **Styles & Primitives:** Tailwind CSS v4, Lucide React, and Radix UI primitives
- **Runtime/Bundler:** Vite 7 & Bun (Hyper-fast local development and compile times)

### 💎 Client-Facing Landing Page (`public/wave`)

- **Markup:** Semantic HTML5 structured for high SEO indexability.
- **Styling:** Custom, zero-bloat Vanilla CSS with complex custom properties, responsive grid systems, responsive breakpoints, and keyframe physics.
- **Behavior:** Premium modern ES6+ Vanilla JavaScript managing animations, language state, custom cursor coordinates, and programmatic template rendering.

---

## 📁 Architecture & File Directory

```bash
wave-team/
├── public/                 # Static assets & client-facing website
│   └── wave/
│       ├── assets/         # Branding and SVGs (logos, vector shapes)
│       ├── images/         # High-resolution optimized project screenshots (WebP/PNG)
│       ├── index.html      # Main landing page markup & SEO metadata
│       ├── script.js       # Dynamic translations, project data, form validators, cursor physics
│       └── styles.css      # Premium custom CSS, Aurora animation keyframes, dark/light modes
├── src/                    # SSR Application Root (TanStack Start wrapper)
│   ├── components/         # Reusable React components
│   ├── lib/                # Error captures and utility files
│   ├── routes/             # TanStack Router directory
│   │   ├── __root.tsx      # Main application frame, global SEO meta, stylesheets
│   │   └── index.tsx       # Automatically redirects traffic to the dynamic landing page
│   ├── server.ts           # Cloudflare SSR execution environment wrapper
│   └── styles.css          # React environment base styling
├── wrangler.jsonc          # Cloudflare Pages / Workers SSR deployment config
└── package.json            # Script targets, packages, and metadata
```

---

## 🚀 Quick Start Guide

### 1. Installation

Clone the repository and install the project dependencies using your preferred package manager (npm or Bun):

```bash
# Using npm
npm install

# Using bun
bun install
```

### 2. Run Local Development Server

Start the local bundler. The TanStack Start system will spin up a local development server:

```bash
# Using npm
npm run dev

# Using bun
bun dev
```

Open **`http://localhost:3000`** in your browser to view the application.

### 3. Build & Preview for Production

Generate the highly optimized production bundle and check it locally:

```bash
# Compile bundle
npm run build

# Preview build locally
npm run preview
```

---

## ⚙️ Customization & Configuration Guide

You can easily adapt the landing page to showcase your own team, services, projects, and branding. Almost all configuration resides inside [public/wave/script.js](file:///c:/Users/omart/OneDrive/Documents/GitHub/wave-team/public/wave/script.js).

### 1. Adding/Editing Portfolio Projects

Projects are rendered dynamically from the `projects` array in [script.js](file:///c:/Users/omart/OneDrive/Documents/GitHub/wave-team/public/wave/script.js#L182-L295). To add a new project, insert a configuration object in the following format:

```javascript
{
  img: "./images/your-project-image.webp",      // Path to optimized image
  title: "Your Project Title",                 // Fallback title (English)
  desc: "A brief descriptive tagline.",         // Fallback description (English)
  tech: ["React", "TypeScript", "Tailwind"],    // Tech stack badges
  liveLink: "https://your-live-demo.com",      // Target live link (optional)
  translationKey: "project-custom-key"         // Unique key for the translation dictionary
}
```

### 2. Updating Bilingual Translations

Translation mappings are located in the `translations` object inside [script.js](file:///c:/Users/omart/OneDrive/Documents/GitHub/wave-team/public/wave/script.js#L523-L734).

To wire up text for the project you added above, map your `translationKey` inside both the `en` and `ar` dictionaries:

```javascript
const translations = {
  en: {
    // English Translation
    "project-custom-key-title": "Project Name",
    "project-custom-key-desc": "An elegant dashboard showing real-time statistics.",
  },
  ar: {
    // Arabic Translation
    "project-custom-key-title": "اسم المشروع",
    "project-custom-key-desc": "لوحة تحكم أنيقة تعرض إحصائيات فورية ودقيقة.",
  },
};
```

### 3. Modifying Team Profiles

Manage developer and designer profiles in the `team` array in [script.js](file:///c:/Users/omart/OneDrive/Documents/GitHub/wave-team/public/wave/script.js#L424-L481):

```javascript
{
  name: "Your Full Name",
  initials: "YFN",                        // Displayed in place of a missing avatar image
  img: "./images/team/your-avatar.jpg",   // Leave blank "" to auto-generate a sleek initials avatar
  phone: "201000000000",                  // WhatsApp number format (including country code, without '+' or '00')
  linkedin: "https://linkedin.com/in/your-profile"
}
```

### 4. Updating the WhatsApp Contact Lead Destination

To modify the email, name, and project description destination in the contact section, locate the contact form submission handler in [script.js](file:///c:/Users/omart/OneDrive/Documents/GitHub/wave-team/public/wave/script.js).

The form compiles user inputs into a prefilled message and opens a WhatsApp redirect to the primary phone number. Simply update the contact phone numbers in [script.js](file:///c:/Users/omart/OneDrive/Documents/GitHub/wave-team/public/wave/script.js) and the fallback info in `README.md` when launching your live campaign.

---

## ⚡ Cloudflare Deployment (Production Ready)

This repository is ready for global edge deployment on **Cloudflare Pages** or **Cloudflare Workers**.

The configuration in [wrangler.jsonc](file:///c:/Users/omart/OneDrive/Documents/GitHub/wave-team/wrangler.jsonc) and [vite.config.ts](file:///c:/Users/omart/OneDrive/Documents/GitHub/wave-team/vite.config.ts) is pre-wired to build using `@cloudflare/vite-plugin` with full `nodejs_compat` enabled, ensuring lightning-fast Server-Side Rendering directly from edge nodes.
