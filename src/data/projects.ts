export interface Project {
  title: string;
  shortDescription: string;
  fullDescription: string;
  tech: string[];
  github?: string; // rendre optionnel si tu veux
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
    tech: [
      "Python",
      "PyTorch",
      "ConvNeXt-Tiny",
      "Deep Learning",
      "Computer Vision",
      "Flask",
    ],
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
    tech: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "TensorFlow (LSTM)",
      "Time Series Forecasting",
      "Flask",
    ],
    github: "",
    image: "/projects/stock.png",
    isFeatured: true,
  },

  {
    title: "AI Career Assistant & Job Hunter (GenAI + RAG)",
    shortDescription:
      "Microservices-based intelligent career assistant with RAG chatbot and autonomous job scraping agent.",
    fullDescription:
      "Designed and deployed a microservices-based AI Career Assistant using Streamlit, Docker, and n8n. Integrated a Retrieval-Augmented Generation (RAG) chatbot for CV analysis and personalized career recommendations. Built an autonomous job scraping and filtering agent (multi-country) powered by SerpApi, enabling automated job discovery and smart ranking of opportunities.",
    tech: [
      "LLMs",
      "RAG",
      "Streamlit",
      "Docker",
      "n8n",
      "SerpApi",
      "Automation",
    ],
    github: "",
    image: "/projects/assistant.png",
    isFeatured: true,
  },

  {
    title: "Real-Time Obstacle Detection for Visually Impaired",
    shortDescription:
      "Assistive mobility system using YOLOv8 for real-time obstacle detection and distance estimation.",
    fullDescription:
      "Developed an AI-powered assistive mobility system for visually impaired individuals using YOLOv8 and OpenCV. Implemented real-time obstacle detection, distance estimation, and intelligent audio alerts to enhance environmental awareness. Optimized inference speed for real-time performance and edge-device compatibility.",
    tech: [
      "Python",
      "OpenCV",
      "YOLOv8",
      "Computer Vision",
      "Deep Learning",
      "Real-Time Systems",
    ],
    github: "",
    image: "/projects/yolo.png",
  },
];