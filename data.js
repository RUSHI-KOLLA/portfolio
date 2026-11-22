/**
 * =========================================================================
 * 🚀 RUSHI KOLLA - PORTFOLIO CONFIGURATION DATA (Karpathy Minimalist Style)
 * =========================================================================
 * 
 * HOW TO MODIFY:
 * Simply edit the text and arrays in this file. 
 * Any changes here will automatically update the website.
 * No HTML or CSS changes needed!
 * =========================================================================
 */

const PROFILE_DATA = {
    name: "Kolla Rushikesh",
    subtitle: "I build production-ready AI applications, multi-agent systems, and edge-distilled neural models 🧠🤖⚡",
    photo: "assets/me.jpg",
    location: "Bengaluru, India",
    email: "kollarushi2006@gmail.com",
    phone: "+91-8074323965",
    resumeUrl: "./resume.pdf",
    socials: {
        github: "https://github.com/RUSHI-KOLLA",
        linkedin: "https://www.linkedin.com/in/kolla-rushikesh-4176232bb/",
        email: "mailto:kollarushi2006@gmail.com",
        whatsapp: "https://wa.me/918074323965"
    },
    bio: "I am a Computer Science undergraduate (B.Tech 2027) at Reva University, Bengaluru. I work at the intersection of deep learning model compression (knowledge distillation, TensorRT quantization) and autonomous multi-agent LLM systems. I published research in IEEE Xplore on lightweight Nano CNN-LSTM architectures for smart grids, and I love building high-throughput systems that turn research into fast, edge-deployable software."
};

const TIMELINE_DATA = [
    {
        timespan: "2026 -",
        role: "Multi-Agent & Edge AI Researcher",
        desc: `Building and shipping production AI systems:
        <ul>
          <li><b><a href="https://huggingface.co/spaces/kollarushi/vg" target="_blank">VG Intelligence</a></b>: Built an autonomous multi-agent political forecasting platform orchestrating 10 AI agents in 15 days. Implemented a 7-stage optimization pipeline (semantic caching, intent classification, hybrid RAG with ChromaDB, convergence detection) cutting token usage by 56% and latency by 38%. Deployed live on Hugging Face Spaces.</li>
          <li><b><a href="https://ieeexplore.ieee.org/" target="_blank">IEEE Publication</a></b>: First author of <i>HEAL: High-Efficiency Anomaly Localisation for Electricity Theft Detection via Nano CNN-LSTM Architectures</i>, presented at the 4th IEEE International Conference on Networks, Multimedia and Information Technology (NMITCON-2026).</li>
        </ul>`
    },
    {
        timespan: "Feb - Apr 2026",
        role: "Machine Learning Intern at Suvidha Foundation",
        desc: `Worked on computer vision distillation for precision agriculture:
        <ul>
          <li>Developed <b><a href="https://github.com/RUSHI-KOLLA/AgroOJS" target="_blank">AgroOJS</a></b>, a lightweight multi-scale feature distillation framework for real-time weed detection on agricultural drones and smart sprayers.</li>
          <li>Distilled a YOLOv8l teacher into a compact YOLOv8s student via intermediate feature distillation at backbone layers 4, 6, and 9. Student surpassed teacher mAP50 by <b>4.1 pp</b> (78.8% vs 74.7%) while shrinking model size by 5.9x.</li>
          <li>Achieved <b>231 FPS</b> at 22.7 MB with TensorRT FP16 export — an 11x combined compression factor with zero measurable accuracy loss.</li>
          <li>Constructed <b>Weed-19</b>, a unified 19-class benchmark merging CottonWeedDet12 and MH-Weed16 with bounding-box filtering and minority oversampling.</li>
        </ul>`
    },
    {
        timespan: "2023 - 2027",
        role: "B.Tech in Computer Science and Engineering",
        desc: `<b>Reva University</b>, Bengaluru, India. Focus on Deep Learning, Multi-Agent Systems, Data Structures, and Algorithmic Optimization.`
    },
    {
        timespan: "2021 - 2023",
        role: "Intermediate (Class XII)",
        desc: `<b>Sri Chaitanya Junior College</b>, Andhra Pradesh, India. Mathematics, Physics, Chemistry (MPC). Final Score: <b>83.4%</b>.`
    }
];

const PROJECTS_DATA = [
    {
        title: "VG Intelligence",
        subtitle: "Multi-Agent Geopolitical Pattern & Predictive Intelligence Platform",
        desc: "Autonomous multi-agent political analysis and forecasting system orchestrating 10 specialized AI agents (5 historical personas and 5 analytical roles) in dialectical debate rounds. Features semantic caching, hybrid RAG with ChromaDB, early convergence detection, and BYOK SaaS hosting.",
        links: [
            { label: "Live Space", url: "https://huggingface.co/spaces/kollarushi/vg" },
            { label: "GitHub", url: "https://github.com/RUSHI-KOLLA/vg" }
        ],
        tags: ["Python", "Groq LLM", "ChromaDB", "FastAPI", "RAG", "Multi-Agent"]
    },
    {
        title: "AgroOJS",
        subtitle: "Multi-Scale Feature Distillation for Real-Time Edge Weed Detection",
        desc: "Teacher-student knowledge distillation pipeline compressing YOLOv8l into YOLOv8s using learnable 1x1 channel-alignment adapters at intermediate backbone layers. Achieved 231 FPS on edge hardware via TensorRT FP16 export (11x compression) with student mAP50 outperforming teacher by 4.1 pp.",
        links: [
            { label: "GitHub", url: "https://github.com/RUSHI-KOLLA/AgroOJS" }
        ],
        tags: ["PyTorch", "YOLOv8", "Knowledge Distillation", "TensorRT", "Edge AI"]
    },
    {
        title: "HEAL (IEEE Publication)",
        subtitle: "Nano CNN-LSTM Anomaly Localisation for Smart Grids",
        desc: "Novel ultralightweight CNN-LSTM hybrid architecture for detecting unauthorized electricity theft and consumption spikes directly on edge smart meters with constrained memory budgets. Published in IEEE Xplore.",
        links: [
            { label: "IEEE Xplore", url: "https://ieeexplore.ieee.org/" },
            { label: "GitHub", url: "https://github.com/RUSHI-KOLLA" }
        ],
        tags: ["PyTorch", "CNN-LSTM", "Time-Series", "Anomaly Detection", "IEEE Xplore"]
    },
    {
        title: "Health Nutrition Advisor Agent",
        subtitle: "Clinical Nutrition Assistant built with Google ADK & Gemini",
        desc: "Conversational health nutrition agent utilizing Google Agent Development Kit (ADK) and Gemini LLMs. Integrates Google Programmable Search Engine (Google CSE) via ADK tools to ground dietary guidelines against verified nutritional sources.",
        links: [
            { label: "GitHub", url: "https://github.com/RUSHI-KOLLA/Health-Nutrition-Agent" }
        ],
        tags: ["Google ADK", "Gemini API", "Python", "Google CSE", "Agent Memory"]
    },
    {
        title: "VYUHA",
        subtitle: "Master Academic Timetable & Multi-Departmental Constraint Solver",
        desc: "Full-stack institutional resource allocation system with dynamic PostgreSQL PLpgSQL rules for clash detection, atomic slot locking, and instant validation. Frontend in pure modern JavaScript with asynchronous Python backend.",
        links: [
            { label: "Live Demo", url: "https://vyuha-five.vercel.app" },
            { label: "GitHub", url: "https://github.com/RUSHI-KOLLA/VYUHA" }
        ],
        tags: ["Python", "PostgreSQL", "PLpgSQL", "JavaScript", "Vercel"]
    },
    {
        title: "Neusort Allocation Engine",
        subtitle: "Deterministic Multi-Constraint Candidate Matching",
        desc: "Greedy and constraint-satisfaction cohort sorting engine built with complete end-to-end type safety in TypeScript for institutional allocation.",
        links: [
            { label: "GitHub", url: "https://github.com/RUSHI-KOLLA/Neusort-Allocation-Engine" }
        ],
        tags: ["TypeScript", "Node.js", "Algorithms"]
    }
];

const PUBLICATIONS_DATA = [
    {
        title: "HEAL: High-Efficiency Anomaly Localisation for Electricity Theft Detection via Nano CNN-LSTM Architectures",
        authors: "Kolla Rushikesh, et al.",
        venue: "Proceedings of the 4th IEEE International Conference on Networks, Multimedia and Information Technology (NMITCON-2026)",
        publisher: "IEEE Xplore",
        year: "2026",
        notes: "Technically co-sponsored by IEEE Bangalore Section",
        url: "https://ieeexplore.ieee.org/"
    }
];

const SKILLS_DATA = [
    {
        category: "Deep Learning & Computer Vision",
        items: "Python, PyTorch, TorchScript, Knowledge Distillation, YOLOv8, TensorRT FP16 Quantization, OpenCV, Hugging Face Transformers, Scikit-learn, Pandas, NumPy"
    },
    {
        category: "Multi-Agent Systems & LLMs",
        items: "Multi-Agent Architectures, Hybrid RAG (Dense, Sparse BM25, Recency), ChromaDB, FastEmbed, Semantic Caching, Google ADK, Gemini API, Groq LLM Acceleration"
    },
    {
        category: "Engineering & Infrastructure",
        items: "FastAPI, PostgreSQL, PLpgSQL, Docker, Git/GitHub, Linux/Bash, VS Code, Google Colab, Kaggle"
    }
];

const CERTIFICATIONS_DATA = [
    {
        name: "5-Day AI Agents Intensive Course",
        issuer: "Google & Kaggle",
        date: "Dec 2025"
    },
    {
        name: "Design Pattern Classification & Architectural Patterns",
        issuer: "Infosys Springboard",
        date: "Oct 2025"
    }
];
