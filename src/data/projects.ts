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
