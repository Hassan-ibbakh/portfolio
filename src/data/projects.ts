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
    image: "/projects/tmj.png",
    isFeatured: true,
  },
  {
    title: "AI WhatsApp Enrollment Assistant — MySchool Maroc",
    shortDescription:
      "Assistant d'inscription WhatsApp multilingue (RAG) automatisant les demandes et l'enregistrement des étudiants.",
    fullDescription:
      "Conçu et déployé un assistant IA WhatsApp autonome pour MySchool Maroc : conversations multilingues (Français, Darija, Anglais), support de messages vocaux, pipeline RAG indexant les documents officiels (Pinecone), et capture automatique des inscriptions dans Google Sheets. Déployé en production sur VPS avec Docker, Nginx et monitoring.",
    tech: [
      "n8n",
      "Groq / LLaMA 3.3",
      "Pinecone",
      "Evolution API (WhatsApp)",
      "Google Drive",
      "Google Sheets",
      "Docker",
      "Nginx",
      "Gemini (transcription)",
    ],
    image: "/projects/myschool.png",
    isFeatured: false,
  },
  {
    title: "Stock Price Prediction System (Apple Inc.)",
    shortDescription:
      "Time Series forecasting pipeline combining Machine Learning and Deep Learning for stock price prediction.",
    fullDescription:
      "Built a complete financial forecasting pipeline for Apple Inc., covering data collection, preprocessing, feature engineering, and time-series modeling. Implemented Machine Learning (Random Forest, XGBoost) and Deep Learning (LSTM) models to predict stock closing prices. Developed an interactive Flask-based web application enabling real-time stock prediction and visualization.",
    tech: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "LSTM", "Time Series", "Flask"],
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
    image: "/projects/yolo.png",
    isFeatured: true,
  },
  {
    title: "Moroccan Pastry Classification System (AI + Web)",
    shortDescription:
      "Deep Learning web application classifying 10 traditional Moroccan pastries with 96.53% accuracy using ResNet50 and AI-generated recipes.",
    fullDescription:
      "Built an end-to-end Computer Vision solution for classifying traditional Moroccan pastries from images. Collected and curated a dataset of 2,007 images across 10 pastry categories (Briouat, Chebakia, Fekkas, Ghriiba, Kaab el ghazal, Kaek, Makrout, Rkhama, Sellou, Zlabia). Trained and compared multiple CNN architectures including custom CNN (69.98%), EfficientNetB0 (94.29%), and ResNet50 (96.53% accuracy, 100% Top-3 accuracy). Developed a Flask-based web application with real-time image classification, AI-generated recipe descriptions via Groq API (LLM), automatic YouTube tutorial search, and cultural context enrichment. Features elegant Moroccan-inspired UI design and comprehensive recipe generation including ingredients, steps, cooking tips, and difficulty levels.",
    tech: ["Python", "TensorFlow", "ResNet50", "EfficientNetB0", "Deep Learning", "Computer Vision", "Flask", "Groq API", "LLM"],
    image: "/projects/pastry.png",
    isFeatured: true,
  },
  {
    title: "AgriVision — Système Intelligent de Diagnostic des Maladies Végétales",
    shortDescription:
      "Plateforme web complète pour la détection et le diagnostic automatisé des maladies des plantes (classification, détection temps réel, Grad-CAM).",
    fullDescription:
      "AgriVision est une plateforme web de diagnostic des maladies végétales combinant des modèles de deep learning et des outils de vision par ordinateur. Fonctions clés : upload d'images pour classification (11 classes), détection temps réel via webcam avec YOLOv8, analyse de vidéos et génération de frames annotés, visualisation Grad-CAM pour l'explicabilité, et assistant agricole IA (LLM) fournissant des conseils de traitement et prévention. Architecture : backend Flask, classification TensorFlow/Keras (EfficientNetV2B0), détection Ultralytics YOLOv8, traitement d'images avec OpenCV, et persistance simple pour l'historique des analyses.",
    tech: [
      "Python",
      "Flask",
      "TensorFlow",
      "Keras",
      "EfficientNetV2B0",
      "YOLOv8",
      "Ultralytics",
      "OpenCV",
      "Grad-CAM",
      "LLMs",
    ],
    image: "/projects/plantguard.png",
    isFeatured: true,
  },
];