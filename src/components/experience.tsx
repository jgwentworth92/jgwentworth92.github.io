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
