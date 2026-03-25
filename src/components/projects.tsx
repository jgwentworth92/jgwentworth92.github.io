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
