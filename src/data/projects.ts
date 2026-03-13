// src/data/projects.ts
export interface Project {
  title: string;
  shortDescription: string;
  fullDescription: string;
  tech: string[];
  github?: string;
  demo?: string;
  image: string;
  isFeatured?: boolean;
}

export const projects: Project[] = [
  {
    title: "TMJ-OA Anomaly Detection (Medical AI)",
    shortDescription:
      "End-to-end Deep Learning pipeline for TMJ radiograph classification achieving 94.92% accuracy with ConvNeXt-Tiny.",
    fullDescription:
      "Designed and implemented a complete Computer Vision pipeline for Temporomandibular Joint Osteoarthritis (TMJ-OA) detection from radiographic images. Trained and benchmarked multiple CNN architectures (ResNet, EfficientNet, ConvNeXt), selecting ConvNeXt-Tiny as the best-performing model (94.92% accuracy). Integrated the model into a Flask-based web application for real-time medical image inference and automated diagnostic assistance.",
    tech: ["Python", "PyTorch", "ConvNeXt-Tiny", "Deep Learning", "Computer Vision", "Flask"],
    github: "",
    image: "/projects/tmj.png",
    isFeatured: true,
  },
  {
    title: "Stock Price Prediction System (Apple Inc.)",
    shortDescription:
      "Time Series forecasting pipeline combining Machine Learning and Deep Learning for stock price prediction.",
    fullDescription:
      "Built a complete financial forecasting pipeline for Apple Inc., covering data collection, preprocessing, feature engineering, and time-series modeling. Implemented Machine Learning (Random Forest, XGBoost) and Deep Learning (LSTM) models to predict stock closing prices. Developed an interactive Flask-based web application enabling real-time stock prediction and visualization.",
    tech: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "LSTM", "Time Series", "Flask"],
    github: "",
    image: "/projects/stock.png",
    isFeatured: true,
  },
  {
    title: "AI Career Assistant & Job Hunter (GenAI + RAG)",
    shortDescription:
      "Microservices-based intelligent career assistant with RAG chatbot and autonomous job scraping agent.",
    fullDescription:
      "Designed and deployed a microservices-based AI Career Assistant using Streamlit, Docker, and n8n. Integrated a Retrieval-Augmented Generation (RAG) chatbot for CV analysis and personalized career recommendations. Built an autonomous multi-country job scraping and filtering agent powered by SerpApi, enabling automated job discovery and smart ranking of opportunities.",
    tech: ["LLMs", "RAG", "Streamlit", "Docker", "n8n", "SerpApi", "Python"],
    github: "",
    image: "/projects/assistant.png",
    isFeatured: true,
  },
  {
    title: "AI Legal Assistant — Moroccan Traffic Law",
    shortDescription:
      "Telegram bot answering legal questions on Moroccan traffic laws with text and Arabic voice responses using RAG.",
    fullDescription:
      "Built a Telegram bot providing legal guidance on Moroccan traffic laws 52.05 and 116.14 using RAG (Pinecone vector store + Gemini 2.0 Flash). Architected a dual-branch n8n workflow: a text branch with AI agent, RAG context retrieval, and session memory; and a voice branch with audio transcription, LLM processing, and Arabic TTS via ElevenLabs. Integrated Supabase for conversation logging and user session tracking. Fully containerized with Docker.",
    tech: ["Python", "RAG", "Pinecone", "Gemini", "n8n", "ElevenLabs", "Supabase", "Docker", "Telegram API"],
    github: "",
    image: "/projects/legal.png",
    isFeatured: true,
  },
  {
    title: "Multi-Agent Technical Documentation Generator",
    shortDescription:
      "Agentic system that automatically analyzes a software project and generates complete structured technical documentation.",
    fullDescription:
      "Developed a multi-agent AI system capable of analyzing a software repository and generating full technical documentation automatically. The agent extracts information from source code, produces UML diagrams (class, sequence, architecture, ER) using Mermaid, and generates structured sections including project overview, tech stack, architecture, installation, and usage. Features an interactive Streamlit interface where users submit a repository URL and receive up-to-date documentation — eliminating manual effort and code-documentation inconsistencies.",
    tech: ["Python", "LLMs", "Agentic AI", "Streamlit", "Mermaid", "Code Analysis"],
    github: "",
    image: "/projects/docgen.png",
    isFeatured: true,
  },
  {
    title: "Real-Time Obstacle Detection for Visually Impaired",
    shortDescription:
      "Assistive mobility system using YOLOv8 for real-time obstacle detection and distance estimation.",
    fullDescription:
      "Developed an AI-powered assistive mobility system for visually impaired individuals using YOLOv8 and OpenCV. Implemented real-time obstacle detection, distance estimation, and intelligent audio alerts to enhance environmental awareness. Optimized inference speed for real-time performance and edge-device compatibility.",
    tech: ["Python", "OpenCV", "YOLOv8", "Computer Vision", "Deep Learning"],
    github: "",
    image: "/projects/yolo.png",
    isFeatured: true,
  },
];