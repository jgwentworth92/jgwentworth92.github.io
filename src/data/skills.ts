export interface SkillCategory {
  name: string;
  color: string;
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
