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
    githubUrl: "https://github.com/jgwentworth92/ds677final",
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
    slug: "healmate",
    title: "HealMate — AI Virtual Therapist",
    summary:
      "AI-powered mental health platform with an interactive 3D virtual therapist, built at HackNJIT 2024.",
    techStack: ["FastAPI", "LangChain", "LangGraph", "WebSockets", "Docker"],
    githubUrl: "https://github.com/tabrezdn1/hacknjit24-fe",
    problem:
      "Mental health support is often inaccessible or impersonal. Existing chatbot solutions lack engagement and don't feel like real conversations with a therapist.",
    approach:
      "Built the backend with FastAPI and LangChain/LangGraph to power AI-driven therapeutic conversations. Used WebSockets for real-time communication and integrated external knowledge bases via Wikipedia and Tavily APIs. The frontend featured a customizable 3D avatar built with Three.js.",
    results:
      "Delivered a working prototype at HackNJIT 2024 with real-time AI conversations, customizable 3D therapist avatar, and full CI/CD pipeline with Docker and Terraform.",
    highlights: [
      "LangChain + LangGraph multi-agent conversation pipeline",
      "Real-time WebSocket communication",
      "Dockerized backend with Terraform IaC",
      "External knowledge retrieval via Tavily and Wikipedia",
    ],
  },
  {
    slug: "discofy",
    title: "Discofy — AI Music Discovery",
    summary:
      "AI-powered music discovery app that curates personalized playlists based on mood, energy, and lyrical preferences. Built at GirlHacks 2024.",
    techStack: ["FastAPI", "LangChain", "MongoDB", "Qdrant", "Docker"],
    githubUrl: "https://github.com/tabrezdn1/girlhacks24-fe",
    problem:
      "Finding new music that matches a specific mood or vibe requires endless manual browsing through playlists. Existing recommendation engines rely on listening history, not how you feel right now.",
    approach:
      "Built the backend with FastAPI and a two-stage LangChain pipeline: first retrieves matching songs using Qdrant vector search, then fetches YouTube and Spotify links. MongoDB stores playlists and user data. Deployed on AWS with Docker.",
    results:
      "Delivered at GirlHacks 2024. Users describe their mood and preferences, and the app returns curated song recommendations with embedded Spotify and YouTube players.",
    highlights: [
      "Two-stage LangChain pipeline for song discovery",
      "Qdrant vector store for semantic song matching",
      "MongoDB async operations with Motor driver",
      "LangSmith observability for LLM pipeline monitoring",
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
