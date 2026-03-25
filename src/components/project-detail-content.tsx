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
