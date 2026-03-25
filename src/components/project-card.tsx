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
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-600 group-hover:text-zinc-400 transition-colors">
          View details →
        </span>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-zinc-600 hover:text-white transition-colors"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </Link>
  );
}
