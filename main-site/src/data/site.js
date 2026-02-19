/**
 * Site content – Collin Martin portfolio
 */

export const hero = {
  name: "Collin Martin",
  role: "Data Science & Engineering Student @ UC3M",
  tagline:
    "Building + Learning all things data. Always looking to collaborate and learn new things in all technical domains \n'If you want to get faster, run with people who are faster than you'",
  scrollCta: "Scroll to explore",
};

export const about = {
  intro: `I'm a Data Science and Data Engineering student at Universidad Carlos III de Madrid, the best Polytechnic University in Madrid — expected to graduate in May 2027.

Before that, I spent years operating heavy machinery on wheat farms in Odessa, Washington, where I developed a strong work ethic through frequent 14-hour harvest days. That resilience carries into everything I do.

Now I build end-to-end data pipelines, machine learning models, and automation systems. My recent internship at Agops360 had me designing cloud-native pipelines for agricultural data, IoT telemetry, and regulatory compliance.

I'm looking to return to my roots and establish a career in Washington.`,
  topics: [
    {
      title: "Data Engineering",
      description:
        "Building end-to-end pipelines, cloud data synchronization, and structured data extraction at scale",
    },
    {
      title: "Machine Learning",
      description:
        "Statistical modeling, predictive analytics, classification, and unsupervised learning techniques",
    },
    {
      title: "Agricultural Tech",
      description:
        "IoT irrigation systems, farm management APIs, and pesticide regulatory data pipelines",
    },
    {
      title: "Automation",
      description:
        "OCR processing, serverless workflows, API integration, and cron-based data enrichment",
    },
  ],
};

export const projects = [
  {
    title: "AI-Driven Pesticide Data Pipeline",
    description:
      "Created an end-to-end data pipeline for the U.S. EPA's pesticide registration dataset (PPIS). Automated data extraction, cleaning, and synchronization with cloud databases, while employing an LLM agent to extract REI, PHI, and PPE data from PDF pesticide labels in Python.",
    category: "Data Engineering",
    status: "Live",
    link: null,
    image: null,
  },
  {
    title: "Farm Management API Integration",
    description:
      "Developed event-driven data pipelines for an agricultural equipment manufacturer's API to fetch and manage field boundaries, crop types, work plans, and equipment activity. Implemented secure OAuth2 token handling and refresh logic.",
    category: "APIs",
    status: "Live",
    link: null,
    image: null,
  },
  {
    title: "Irrigation Control System Integration",
    description:
      "Built a data ingestion system connecting an IoT-enabled irrigation network using serverless edge functions, cloud functions, and pub/sub messaging. Captured telemetry data such as pressure, pivot angles, fault states, and communication health.",
    category: "IoT",
    status: "Live",
    link: null,
    image: null,
  },
  {
    title: "OCR Document Processing Pipeline",
    description:
      "Designed a fully automated OCR pipeline leveraging cloud-based text extraction services within serverless functions to process PDF irrigation design documents. Parsed and transformed tabular data into CSVs for analytical use.",
    category: "Automation",
    status: "Live",
    link: null,
    image: null,
  },
  {
    title: "E-Commerce Purchase Prediction",
    description:
      "Led development of machine learning models achieving 89.7% accuracy in predicting e-commerce purchase behavior. Engineered and optimized five classification models (Gradient Boosting, Random Forest, Neural Networks, LDA/QDA) and implemented a risk analysis framework combining PageValues and purchase probabilities.",
    category: "Machine Learning",
    status: "Published",
    link: null,
    image: null,
  },
];

export const skills = {
  languagesAndFrameworks: [
    { name: "Python", icon: "python", color: "#3776AB" },
    { name: "TensorFlow", icon: "tensorflow", color: "#FF6F00" },
    { name: "FastAPI", icon: "fastapi", color: "#009688" },
    { name: "scikit-learn", icon: "scikitlearn", color: "#F7931E" },
    { name: "Claude", icon: "anthropic", color: "#191919" },
    { name: "Streamlit", icon: "streamlit", color: "#FF4B4B" },
    { name: "SQL", icon: "postgresql", color: "#336791" },
    { name: "Jupyter", icon: "jupyter", color: "#F37626" },
    { name: "R", icon: "r", color: "#276DC3" },
  ],
  toolsAndPlatforms: [
    { name: "Docker", icon: "docker", color: "#2496ED" },
    { name: "Neo4j", icon: "neo4j", color: "#008CC1" },
    { name: "Figma", icon: "figma", color: "#F24E1E" },
    { name: "Hugging Face", icon: "huggingface", color: "#FFD21E" },
  ],
};

/**
 * Notes – links to your Quartz blog and notes (built from quartz/content/).
 * href = where the nav "Notes" link goes (Quartz blog index showing all notes).
 * links = dynamically generated from Quartz contentIndex at build time.
 */
import { notesLinks } from './notes-links.generated.js';

export const notes = {
  label: "Notes",
  href: "/content/notes.html",
  description: "Writing and notes on data engineering, ML, and whatever I'm learning.",
  links: notesLinks.length > 0 ? notesLinks : [{ label: "All notes", href: "/content/notes.html" }],
};

export const connect = {
  cta: "Follow along on my journey, reach out for collaborations, or just say hi.",
  links: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "GitHub", href: "https://github.com/CollinMartin12", icon: "github" },
    { label: "Email", href: "mailto:Collinmartin4p@gmail.com", icon: "email" },
  ],
};
