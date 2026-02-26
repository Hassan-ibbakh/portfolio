// src/data/skills.ts
import {
  Code,
  Database,
  BrainCircuit,
  BarChart,
  Cloud,
  Globe,
  Server,
} from "lucide-react";

export const skillCategories = [
  {
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing (NLP)",
      "RAG (Retrieval-Augmented Generation)",
      "LLMs & Generative AI",
      "Recommender Systems",
      "Time Series Forecasting",
    ],
  },
  {
    title: "Programming & Development",
    icon: Code,
    skills: [
      "Python",
      "JavaScript",
      "SQL",
      "PHP",
      "HTML/CSS",
      "Laravel",
      "React",
      "Flask",
      "FastAPI",
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
      "OpenCV",
      "YOLOv8",
      "Pandas",
      "NumPy",
      "Matplotlib",
    ],
  },
  {
    title: "Data & Databases",
    icon: Database,
    skills: [
      "MySQL",
      "MongoDB",
      "NoSQL",
      "Database Design",
      "Data Preprocessing",
      "Feature Engineering",
      "Model Evaluation",
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Cloud,
    skills: [
      "Git & GitHub",
      "Docker",
      "Linux",
      "n8n",
      "Workflow Automation",
      "API Development",
      "Microservices Architecture",
    ],
  },
];

export const certifications = [
  {
    title: "Machine Learning & Deep Learning Projects",
    issuer: "Academic & Personal Projects",
  },
  {
    title: "Computer Vision & Medical Imaging",
    issuer: "University Projects",
  },
  {
    title: "Generative AI & RAG Systems",
    issuer: "Personal Research & Implementation",
  },
];