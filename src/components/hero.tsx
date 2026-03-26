"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

const HeroBackground = dynamic(
  () => import("./hero-background").then((mod) => mod.HeroBackground),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="about"
      className="relative flex items-end justify-center min-h-[60vh] px-6 pb-16 pt-24"
    >
      <HeroBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        {/* Headshot */}
        <div className="mb-6">
          <Image
            src="/headshot.jpg"
            alt="Jonathan Grossman"
            width={120}
            height={120}
            className="rounded-full mx-auto border-2 border-zinc-700 object-cover"
            priority
          />
        </div>

        <p className="font-mono text-sm text-zinc-500 mb-3 tracking-wider">
          Hey, I&apos;m
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
          Jonathan Grossman
          <span className="inline-block w-[3px] h-[0.9em] bg-zinc-500 ml-2 animate-pulse align-middle" />
        </h1>
        <p className="font-mono text-sm sm:text-base text-zinc-400 mb-6 tracking-wide">
          Data Engineer{" "}
          <span className="text-zinc-600">·</span> Backend Developer{" "}
          <span className="text-zinc-600">·</span> AI Builder
        </p>
        <p className="text-zinc-500 mb-8 max-w-lg mx-auto leading-relaxed">
          I love turning messy data into systems that actually work — from
          RAG pipelines and knowledge graphs to production ETL and backend
          APIs. MS in Data Science from NJIT.
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
