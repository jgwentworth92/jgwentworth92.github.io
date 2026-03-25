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
