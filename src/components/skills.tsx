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
