# Portfolio Site Design Spec

## Overview

A personal portfolio site for Jonathan Grossman — data engineer and backend developer — deployed to GitHub Pages at jgwentworth92.github.io. Primary goal: impress recruiters and hiring managers during a job search.

## Design Direction

**Minimal Professional** — dark background, strong typography, generous whitespace. No gimmicks. Clean, fast, readable. Polished with Framer Motion scroll/page animations and a subtle Three.js hero visual.

## Tech Stack

- **Framework:** Next.js 16 (already scaffolded) with static export
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (scroll reveals, page transitions)
- **3D/Visual:** Three.js or React Three Fiber (subtle hero visual — particle field or abstract data visualization)
- **Fonts:** Geist Sans + Geist Mono (already configured)
- **Deployment:** GitHub Pages via GitHub Actions (already configured)

## Site Structure

Single scrollable main page with dedicated project detail pages.

### Routes

- `/` — Main page (all sections)
- `/projects/[slug]` — Project detail pages (one per project)

### Main Page Sections (top to bottom)

#### 1. Navigation
- Fixed top nav bar
- Left: "Jonathan Grossman" (links to top)
- Right: anchor links — About, Experience, Projects, Contact
- Transparent background, becomes solid on scroll

#### 2. Hero
- Full viewport height
- Name: "Jonathan Grossman" (large, bold)
- Title: "Data Engineer & Backend Developer"
- 1-2 sentence summary
- CTA buttons: Resume (PDF download), GitHub (external), LinkedIn (external)
- Subtle Three.js background visual (particle field or abstract network graph)
- Framer Motion fade-in on load

#### 3. Skills
- Section heading: "Skills"
- Color-coded tech stack badges grouped by category:
  - Backend & Integration: C#, .NET 8, Python, FastAPI, EDI Processing, REST APIs
  - AI & Data: RAG Pipelines, Knowledge Graphs, PyTorch, PostgreSQL, ETL
  - Engineering & DevOps: Linux/UNIX, Bash, Docker, AWS, Azure DevOps, Git
  - Frontend: React, Next.js, JavaScript/TypeScript
- Framer Motion staggered reveal on scroll

#### 4. Experience
- Section heading: "Experience"
- Clean timeline layout, each entry shows:
  - Date range (left-aligned, muted)
  - Role title (bold)
  - Company name (muted)
  - Brief 1-line description of key work
- Entries:
  1. Technical Partner & AI Developer — KW Consulting (Dec 2023 – Present)
  2. Database Integration Developer — Key Software Systems (Jun 2025 – Aug 2025)
  3. Teaching Assistant — NJIT (Jan 2021 – May 2025)
  4. Front-End Developer — Concave Finance (Nov 2021 – Dec 2022)
- Framer Motion staggered reveal on scroll

#### 5. Projects
- Section heading: "Projects"
- 2-column responsive grid (1 column on mobile)
- Each card shows:
  - Project name
  - 1-2 line description
  - Tech stack badges
  - "View details →" link to detail page
- Projects:
  1. Scalable Academic Graph Mining (PyTorch Geometric)
  2. Gutenberg ETL Pipeline (FastAPI, AWS Lambda)
  3. Text Embedding Clustering Framework (Python, spaCy)
- Cards animate in with Framer Motion on scroll

#### 6. Contact
- Section heading: "Get in Touch"
- Email address
- Icon links: GitHub, LinkedIn, Email
- Simple, centered layout

### Project Detail Page Template

Route: `/projects/[slug]`

#### Layout
- Same nav bar as main page, with "← Back to Home" link
- Sections:
  1. **Header** — Project name, summary, tech badges, GitHub link button
  2. **The Problem** — What challenge this project addresses
  3. **The Approach** — How it was built, technical decisions
  4. **Results** — Outcomes, metrics, impact
  5. **Technical Highlights** — Bullet list of notable implementation details
- Framer Motion page transition (fade/slide in)

#### Content per project

**Scalable Academic Graph Mining**
- Problem: Researchers can't discover connections in large citation networks manually
- Approach: GNN link prediction with PyTorch Geometric on 4.8M nodes / 25M edges
- Results: 98.1% accuracy on link prediction
- Highlights: Scaled GNN training, GPU-accelerated graph ops, custom data pipeline

**Gutenberg ETL Pipeline**
- Problem: Book content not searchable by meaning, only keywords
- Approach: Serverless pipeline on AWS Lambda with FastAPI, change detection
- Results: Automatic processing of new/changed data, semantic search enabled
- Highlights: Event-driven architecture, Lambda deployment, embedding-based search

**Text Embedding Clustering Framework**
- Problem: No easy way to compare how different AI models group similar text
- Approach: Framework that benchmarks embedding models with auto-tuned clustering
- Results: Automatic identification of best clustering approach per dataset
- Highlights: Multi-model comparison, automatic hyperparameter tuning, spaCy integration

## Data Architecture

All content is hardcoded in components/data files — no CMS, no API calls. Project data lives in a single TypeScript data file (`src/data/projects.ts`) that exports an array of project objects. This keeps content easy to update and the site fully static.

```typescript
interface Project {
  slug: string;
  title: string;
  summary: string;
  techStack: string[];
  problem: string;
  approach: string;
  results: string;
  highlights: string[];
  githubUrl?: string;
}
```

Experience and skills data follow the same pattern in `src/data/experience.ts` and `src/data/skills.ts`.

## Responsive Design

- **Desktop (1024px+):** Full layout, 2-column project grid, fixed nav
- **Tablet (768-1023px):** Same layout, slightly tighter spacing
- **Mobile (<768px):** Single column, hamburger nav or simplified header, stacked project cards

## Animation Strategy

- **Framer Motion:**
  - Page load: hero content fades in with slight upward motion
  - Scroll: sections reveal with staggered fade-up as they enter viewport
  - Page transitions: fade between main page and project detail pages
  - Skill badges: staggered pop-in
- **Three.js (hero only):**
  - Subtle particle field or abstract network/node visualization
  - Responds gently to mouse movement (parallax)
  - Low particle count, performant — must not hurt page load
  - Falls back gracefully if WebGL unavailable (just show dark background)

## Performance Considerations

- Static export — no server-side rendering needed
- Three.js loaded lazily (dynamic import) to keep initial bundle small
- Images: unoptimized (GitHub Pages requirement), but minimal images needed
- Target: Lighthouse performance score 90+

## Out of Scope

- Blog / writing section
- CMS or database
- Contact form (just email link)
- Dark/light theme toggle (dark only)
- Analytics
