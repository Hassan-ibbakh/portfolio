// src/data/skills.ts
import {
  Code,
  Database,
  BrainCircuit,
  BarChart,
  Cloud,
  Server,
  Workflow,
} from "lucide-react";

export const skillCategories = [
  {
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "RAG",
      "LLMs & Generative AI",
      "Agentic AI / Multi-Agent Systems",
      "Recommender Systems",
      "Time Series Forecasting",
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: Server,
    skills: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "LangChain",
      "OpenCV",
      "YOLOv8",
      "Pandas",
      "NumPy",
      "Matplotlib",
    ],
  },
  {
    title: "Development",
    icon: Code,
    skills: [
      "Python",
      "JavaScript",
      "SQL",
      "FastAPI",
      "Flask",
      "React",
      "Next.js",
      "Laravel",
      "REST APIs",
    ],
  },
  {
    title: "Data & Databases",
    icon: Database,
    skills: [
      "MySQL",
      "MongoDB",
      "Supabase (PostgreSQL)",
      "Pinecone (Vector DB)",
      "Data Preprocessing",
      "Feature Engineering",
    ],
  },
  {
    title: "Tools & Automation",
    icon: Workflow,
    skills: [
      "n8n",
      "Docker",
      "Git & GitHub",
      "Linux",
      "Workflow Automation",
      "Microservices Architecture",
    ],
  },
];

export const certifications = [];