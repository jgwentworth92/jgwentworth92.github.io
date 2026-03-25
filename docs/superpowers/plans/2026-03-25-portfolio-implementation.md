# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Jonathan Grossman's portfolio site — a dark, minimal professional single-page site with project detail pages, Framer Motion animations, and a Three.js hero visual.

**Architecture:** Static Next.js 16 site with Tailwind CSS v4 styling. Content lives in TypeScript data files. Main page scrolls through Hero → Skills → Experience → Projects → Contact. Each project links to a `/projects/[slug]` detail page. Framer Motion handles scroll reveals and page transitions. Three.js renders a subtle network graph in the hero, lazy-loaded.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Three.js (React Three Fiber), GitHub Pages

**Spec:** `docs/superpowers/specs/2026-03-25-portfolio-design.md`

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              — Root layout (metadata, fonts, dark bg)
│   ├── page.tsx                — Main page (composes all sections)
│   ├── globals.css             — Global styles (dark theme, Tailwind)
│   └── projects/
│       └── [slug]/
│           └── page.tsx        — Project detail page
├── components/
│   ├── nav.tsx                 — Fixed navigation bar
│   ├── hero.tsx                — Hero section with CTA buttons
│   ├── hero-background.tsx     — Three.js network graph (lazy-loaded)
│   ├── skills.tsx              — Skills badge grid
│   ├── experience.tsx          — Experience timeline
│   ├── projects.tsx            — Project cards grid
│   ├── project-card.tsx        — Individual project card
│   ├── contact.tsx             — Contact footer section
│   ├── project-detail-content.tsx — Animated project detail body (client)
│   ├── section-reveal.tsx      — Framer Motion scroll reveal wrapper
│   └── mobile-nav.tsx          — Mobile hamburger menu
└── data/
    ├── projects.ts             — Project content array
    ├── experience.ts           — Experience entries array
    └── skills.ts               — Skills grouped by category
```

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install framer-motion and three.js packages**

Run:
```bash
npm install framer-motion three @react-three/fiber @react-three/drei
```

- [ ] **Step 2: Install three.js types**

Run:
```bash
npm install -D @types/three
```

- [ ] **Step 3: Verify build still works**

Run:
```bash
npm run build
```
Expected: Build completes with no errors, `out/` directory generated.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add framer-motion and three.js dependencies"
```

---

### Task 2: Data layer — projects, experience, skills

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/skills.ts`

- [ ] **Step 1: Create projects data file**

Create `src/data/projects.ts`:

```typescript
export interface Project {
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

export const projects: Project[] = [
  {
    slug: "academic-graph-mining",
    title: "Scalable Academic Graph Mining",
    summary:
      "Predicted missing links in a research citation network of 4.8M nodes and 25M edges, achieving 98.1% accuracy.",
    techStack: ["PyTorch Geometric", "Python", "Graph Neural Networks"],
    problem:
      "Researchers working with large citation networks can't easily discover connections between papers. Manual traversal of millions of nodes is impractical, and existing tools don't predict where missing links should exist.",
    approach:
      "Built a link prediction model using PyTorch Geometric on a graph with 4.8M nodes and 25M edges. Trained graph neural networks to learn structural patterns in the citation network and predict where new links should form.",
    results:
      "98.1% accuracy on link prediction. The model surfaces connections between papers that researchers would otherwise miss, enabling faster literature discovery.",
    highlights: [
      "Scaled GNN training to handle graph with 25M edges",
      "GPU-accelerated processing for graph operations",
      "Custom data pipeline for ingesting citation data",
    ],
  },
  {
    slug: "gutenberg-etl-pipeline",
    title: "Gutenberg ETL Pipeline",
    summary:
      "Serverless pipeline that detects new or changed data and processes it automatically, making book content searchable by meaning.",
    techStack: ["FastAPI", "AWS Lambda", "Python"],
    problem:
      "Book content in Project Gutenberg is only searchable by keywords, not by meaning. There's no automated way to detect new or changed content and make it semantically searchable.",
    approach:
      "Built a serverless pipeline on AWS Lambda with FastAPI that detects new or changed data and processes it automatically using text embeddings for semantic search.",
    results:
      "Automatic processing of new and changed data with semantic search enabled, allowing users to find books by meaning rather than just keywords.",
    highlights: [
      "Event-driven architecture with change detection",
      "AWS Lambda deployment for serverless scaling",
      "Embedding-based semantic search",
    ],
  },
  {
    slug: "text-embedding-clustering",
    title: "Text Embedding Clustering Framework",
    summary:
      "Framework that compares how different AI models group similar text, with automatic tuning to find the best clustering approach.",
    techStack: ["Python", "spaCy", "scikit-learn"],
    problem:
      "No easy way to compare how different AI embedding models group similar text, or to automatically determine which clustering approach works best for a given dataset.",
    approach:
      "Built a framework that benchmarks multiple embedding models against various clustering algorithms, with automatic hyperparameter tuning to find the optimal combination for any dataset.",
    results:
      "Automatic identification of the best clustering approach per dataset, removing the manual trial-and-error from the embedding model selection process.",
    highlights: [
      "Multi-model comparison across embedding providers",
      "Automatic hyperparameter tuning",
      "spaCy integration for text preprocessing",
    ],
  },
];
```

- [ ] **Step 2: Create experience data file**

Create `src/data/experience.ts`:

```typescript
export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export const experience: Experience[] = [
  {
    role: "Technical Partner & AI Developer",
    company: "KW Consulting (Ordo Studio)",
    period: "Dec 2023 – Present",
    description:
      "RAG pipeline, knowledge graph, and multi-strategy retrieval system for AI-powered business platform.",
  },
  {
    role: "Database Integration Developer",
    company: "Key Software Systems",
    period: "Jun 2025 – Aug 2025",
    description:
      "EDI data pipelines in C#/.NET 8, legacy VB.NET modernization, query performance optimization.",
  },
  {
    role: "Teaching Assistant",
    company: "New Jersey Institute of Technology",
    period: "Jan 2021 – May 2025",
    description:
      "Mentored students in Java, data structures, full-stack web development, and database design.",
  },
  {
    role: "Front-End Developer",
    company: "Concave Finance",
    period: "Nov 2021 – Dec 2022",
    description:
      "Real-time analytics dashboard in React for live blockchain data visualization.",
  },
];
```

- [ ] **Step 3: Create skills data file**

Create `src/data/skills.ts`:

```typescript
export interface SkillCategory {
  name: string;
  color: string; // Tailwind color class prefix, e.g. "blue" "green" "red"
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Backend & Integration",
    color: "blue",
    skills: ["C#", ".NET 8", "Python", "FastAPI", "EDI Processing", "REST APIs"],
  },
  {
    name: "AI & Data",
    color: "purple",
    skills: ["RAG Pipelines", "Knowledge Graphs", "PyTorch", "PostgreSQL", "ETL"],
  },
  {
    name: "Engineering & DevOps",
    color: "amber",
    skills: ["Linux/UNIX", "Bash", "Docker", "AWS", "Azure DevOps", "Git"],
  },
  {
    name: "Frontend",
    color: "emerald",
    skills: ["React", "Next.js", "JavaScript", "TypeScript"],
  },
];
```

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add data layer for projects, experience, and skills"
```

---

### Task 3: Global styles and layout update

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update globals.css for dark-only theme**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --background: #0a0a0a;
  --foreground: #ededed;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
}

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 2: Update layout.tsx with metadata and dark class**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jonathan Grossman — Data Engineer & Backend Developer",
  description:
    "Portfolio of Jonathan Grossman. Data pipelines, RAG systems, and backend infrastructure. MS in Data Science from NJIT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#0a0a0a] text-[#ededed] antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build**

Run:
```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: configure dark theme and update site metadata"
```

---

### Task 4: Section reveal animation wrapper

**Files:**
- Create: `src/components/section-reveal.tsx`

- [ ] **Step 1: Create the section-reveal component**

This is a reusable Framer Motion wrapper that fades sections in on scroll.

Create `src/components/section-reveal.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify build**

Run:
```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/section-reveal.tsx
git commit -m "feat: add section-reveal scroll animation wrapper"
```

---

### Task 5: Navigation component

**Files:**
- Create: `src/components/nav.tsx`
- Create: `src/components/mobile-nav.tsx`

- [ ] **Step 1: Create the nav component**

Create `src/components/nav.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { MobileNav } from "./mobile-nav";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-semibold tracking-tight">
          Jonathan Grossman
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <MobileNav links={links} />
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create the mobile nav component**

Create `src/components/mobile-nav.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  links: { label: string; href: string }[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-zinc-400 hover:text-white p-2"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/5"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run:
```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/nav.tsx src/components/mobile-nav.tsx
git commit -m "feat: add navigation with mobile hamburger menu"
```

---

### Task 6: Hero section with Three.js background

**Files:**
- Create: `src/components/hero.tsx`
- Create: `src/components/hero-background.tsx`

- [ ] **Step 1: Create the Three.js hero background**

This renders a subtle animated network graph using React Three Fiber. Lazy-loaded via `next/dynamic`.

Create `src/components/hero-background.tsx`:

```tsx
"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NetworkGraph() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const { positions, linePositions } = useMemo(() => {
    const count = 80;
    const pos = new Float32Array(count * 3);
    const spread = 8;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;
    }

    // Connect nearby points
    const lines: number[] = [];
    const threshold = 2.5;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < threshold) {
          lines.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(lines),
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.1;
    const mx = mouse.current.x;
    const my = mouse.current.y;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t + mx;
      pointsRef.current.rotation.x = t * 0.3 + my;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t + mx;
      linesRef.current.rotation.x = t * 0.3 + my;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#444" size={0.04} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#222" transparent opacity={0.4} />
      </lineSegments>
    </>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <NetworkGraph />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Create the hero section**

Create `src/components/hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroBackground = dynamic(
  () => import("./hero-background").then((mod) => mod.HeroBackground),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="about"
      className="relative flex items-center justify-center min-h-screen px-6"
    >
      <HeroBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
          Jonathan Grossman
        </h1>
        <p className="text-xl sm:text-2xl text-zinc-400 mb-6">
          Data Engineer & Backend Developer
        </p>
        <p className="text-zinc-500 mb-8 max-w-lg mx-auto leading-relaxed">
          I build data pipelines, RAG systems, and backend infrastructure.
          MS in Data Science from NJIT.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="/Jonathan_Grossman_Resume.pdf"
            className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors"
          >
            Resume
          </a>
          <a
            href="https://github.com/jgwentworth92"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jonathan-grossman"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

Run:
```bash
npm run build
```
Expected: Build succeeds (Three.js is lazy-loaded so SSR should work fine).

- [ ] **Step 4: Commit**

```bash
git add src/components/hero.tsx src/components/hero-background.tsx
git commit -m "feat: add hero section with Three.js network graph background"
```

---

### Task 7: Skills section

**Files:**
- Create: `src/components/skills.tsx`

- [ ] **Step 1: Create skills component**

Create `src/components/skills.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "./section-reveal";
import { skillCategories } from "@/data/skills";

const colorMap: Record<string, string> = {
  blue: "bg-blue-950/50 text-blue-400",
  purple: "bg-purple-950/50 text-purple-400",
  amber: "bg-amber-950/50 text-amber-400",
  emerald: "bg-emerald-950/50 text-emerald-400",
};

export function Skills() {
  return (
    <SectionReveal>
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold mb-10">Skills</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {skillCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                        colorMap[category.color] ?? "bg-zinc-800 text-zinc-300"
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
```

- [ ] **Step 2: Verify build**

Run:
```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/skills.tsx
git commit -m "feat: add skills section with staggered badge animations"
```

---

### Task 8: Experience section

**Files:**
- Create: `src/components/experience.tsx`

- [ ] **Step 1: Create experience component**

Create `src/components/experience.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "./section-reveal";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <SectionReveal>
      <section id="experience" className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold mb-10">Experience</h2>
          <div className="space-y-8">
            {experience.map((entry, i) => (
              <motion.div
                key={entry.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-2 sm:gap-6"
              >
                <span className="text-sm text-zinc-600 sm:min-w-[140px] shrink-0 pt-0.5">
                  {entry.period}
                </span>
                <div>
                  <h3 className="font-semibold">{entry.role}</h3>
                  <p className="text-sm text-zinc-500">{entry.company}</p>
                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
```

- [ ] **Step 2: Verify build**

Run:
```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/experience.tsx
git commit -m "feat: add experience timeline section"
```

---

### Task 9: Project card and projects grid

**Files:**
- Create: `src/components/project-card.tsx`
- Create: `src/components/projects.tsx`

- [ ] **Step 1: Create project card component**

Create `src/components/project-card.tsx`:

```tsx
import Link from "next/link";
import type { Project } from "@/data/projects";

const tagColors = [
  "bg-blue-950/50 text-blue-400",
  "bg-emerald-950/50 text-emerald-400",
  "bg-amber-950/50 text-amber-400",
  "bg-purple-950/50 text-purple-400",
];

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 hover:bg-zinc-900 transition-all"
    >
      <h3 className="font-semibold text-lg mb-2 group-hover:text-white transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
        {project.summary}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech, i) => (
          <span
            key={tech}
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              tagColors[i % tagColors.length]
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
      <span className="text-sm text-zinc-600 group-hover:text-zinc-400 transition-colors">
        View details →
      </span>
    </Link>
  );
}
```

- [ ] **Step 2: Create projects grid component**

Create `src/components/projects.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "./section-reveal";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function Projects() {
  return (
    <SectionReveal>
      <section id="projects" className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold mb-10">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
```

- [ ] **Step 3: Verify build**

Run:
```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/project-card.tsx src/components/projects.tsx
git commit -m "feat: add project cards grid section"
```

---

### Task 10: Contact section

**Files:**
- Create: `src/components/contact.tsx`

- [ ] **Step 1: Create contact component**

Create `src/components/contact.tsx`:

```tsx
import { SectionReveal } from "./section-reveal";

export function Contact() {
  return (
    <SectionReveal>
      <section id="contact" className="py-20 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-zinc-400 mb-8">
            Open to opportunities — feel free to reach out.
          </p>
          <a
            href="mailto:jonathangrossman716@gmail.com"
            className="text-lg text-zinc-300 hover:text-white transition-colors underline underline-offset-4"
          >
            jonathangrossman716@gmail.com
          </a>
          <div className="flex gap-6 justify-center mt-8">
            <a
              href="https://github.com/jgwentworth92"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/jonathan-grossman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="mailto:jonathangrossman716@gmail.com"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              Email
            </a>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
```

- [ ] **Step 2: Verify build**

Run:
```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/contact.tsx
git commit -m "feat: add contact section"
```

---

### Task 11: Compose main page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx with composed sections**

Replace `src/app/page.tsx` with:

```tsx
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run:
```bash
npm run build
```
Expected: Build succeeds, `out/index.html` generated.

- [ ] **Step 3: Verify dev server**

Run:
```bash
npm run dev
```
Open `http://localhost:3000` — verify all sections render, nav links scroll to sections, Three.js background renders.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: compose main page with all sections"
```

---

### Task 12: Project detail page

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/components/project-detail-content.tsx`

- [ ] **Step 1: Create the project detail page**

Create `src/app/projects/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectDetailContent } from "@/components/project-detail-content";

// Generate static paths for all projects
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Jonathan Grossman`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Jonathan Grossman
          </Link>
          <Link
            href="/"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <ProjectDetailContent project={project} />
    </>
  );
}
```

- [ ] **Step 2: Create the animated project detail content component**

Create `src/components/project-detail-content.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export function ProjectDetailContent({ project }: { project: Project }) {
  const sections = [
    { label: "The Problem", content: project.problem, color: "text-blue-400" },
    { label: "The Approach", content: project.approach, color: "text-emerald-400" },
    { label: "Results", content: project.results, color: "text-amber-400" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pt-24 pb-20 px-6"
    >
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md text-sm font-medium bg-zinc-800 text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors text-sm mb-12"
          >
            View on GitHub
          </a>
        )}

        <hr className="border-zinc-800 mb-12" />

        {/* Problem / Approach / Results */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.label}>
              <h2 className={`font-semibold text-lg mb-3 ${section.color}`}>
                {section.label}
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Highlights */}
        {project.highlights.length > 0 && (
          <div className="mt-12">
            <h2 className="font-semibold text-lg mb-4">
              Technical Highlights
            </h2>
            <ul className="space-y-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="text-zinc-400 flex items-start gap-2"
                >
                  <span className="text-zinc-600 mt-1.5 shrink-0">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.main>
  );
}
```

- [ ] **Step 2: Verify build**

Run:
```bash
npm run build
```
Expected: Build succeeds. `out/projects/academic-graph-mining/index.html`, `out/projects/gutenberg-etl-pipeline/index.html`, and `out/projects/text-embedding-clustering/index.html` are generated.

- [ ] **Step 3: Verify dev server**

Run:
```bash
npm run dev
```
Navigate to `http://localhost:3000/projects/academic-graph-mining` — verify the detail page renders with all sections.

- [ ] **Step 4: Commit**

```bash
git add src/app/projects/ src/components/project-detail-content.tsx
git commit -m "feat: add project detail pages with static generation and page transition"
```

---

### Task 13: Resume PDF and .gitignore cleanup

**Files:**
- Move/rename: resume PDF to `public/Jonathan_Grossman_Resume.pdf`
- Modify: `.gitignore`

- [ ] **Step 1: Copy resume to public directory with clean name**

```bash
cp "Jonathan_Grossman_Resume_Final (1).pdf" public/Jonathan_Grossman_Resume.pdf
```

- [ ] **Step 2: Add .superpowers to .gitignore**

Append to `.gitignore`:
```
# Superpowers brainstorm sessions
.superpowers/
```

- [ ] **Step 3: Remove original resume from repo root**

```bash
rm "Jonathan_Grossman_Resume_Final (1).pdf"
```

- [ ] **Step 4: Verify build**

Run:
```bash
npm run build
```
Expected: Build succeeds. `out/Jonathan_Grossman_Resume.pdf` exists.

- [ ] **Step 5: Commit**

```bash
git add public/Jonathan_Grossman_Resume.pdf .gitignore
git rm "Jonathan_Grossman_Resume_Final (1).pdf"
git commit -m "feat: add resume PDF to public, clean up gitignore"
```

---

### Task 14: Final build verification and deploy

- [ ] **Step 1: Full production build**

Run:
```bash
npm run build
```
Expected: Clean build, no warnings. All routes generated in `out/`.

- [ ] **Step 2: Verify output structure**

```bash
ls out/
ls out/projects/
```
Expected: `index.html` at root, plus `projects/academic-graph-mining/index.html`, etc.

- [ ] **Step 3: Test locally with a static server**

```bash
npx serve out
```
Open `http://localhost:3000` — walk through all sections and project pages.

- [ ] **Step 4: Push to deploy**

```bash
git push origin main
```
Expected: GitHub Actions workflow triggers and deploys to jgwentworth92.github.io.

- [ ] **Step 5: Verify live site**

Check `https://jgwentworth92.github.io/` after the Actions workflow completes (~2 min).

```bash
gh run watch --exit-status
```
