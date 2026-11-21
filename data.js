/**
 * =========================================================================
 * 🚀 RUSHI KOLLA - PORTFOLIO CONFIGURATION DATA
 * =========================================================================
 * 
 * HOW TO MODIFY YOUR PORTFOLIO:
 * 1. To edit your bio, titles, or contact info -> Update `PROFILE_DATA`.
 * 2. To ADD A NEW PROJECT -> Simply copy the template inside `PROJECTS_DATA` 
 *    and fill in your details.
 * 3. To edit Experience, Publications, Skills, or Education -> Edit the
 *    respective sections below.
 * 
 * Everything is rendered automatically by the website!
 * NO HTML or CSS editing is needed.
 * =========================================================================
 */

const PROFILE_DATA = {
    name: "Kolla Rushikesh",
    title: "AI Engineer & Machine Learning Specialist",
    tagline: "Computer Science undergraduate (B.Tech 2027) building production-ready AI applications, multi-agent debate platforms, and edge-distilled neural pipelines. Skilled in PyTorch, Knowledge Distillation, and rapid prototyping.",
    location: "Bengaluru, India",
    email: "kollarushi2006@gmail.com",
    phone: "+91-8074323965",
    statusBadge: "Available for ML / AI Internships (Summer & Fall 2026)",
    resumeUrl: "./resume.pdf",
    socials: {
        github: "https://github.com/RUSHI-KOLLA",
        linkedin: "https://www.linkedin.com/in/kolla-rushikesh-4176232bb/",
        email: "mailto:kollarushi2006@gmail.com",
        whatsapp: "https://wa.me/918074323965",
        phone: "tel:+918074323965"
    },
    aboutParagraphs: [
        "Computer Science undergraduate (B.Tech, 2027) with deep, hands-on experience building and shipping end-to-end AI applications, high-throughput machine learning pipelines, and multi-agent systems.",
        "Specialized in knowledge distillation for computer vision (YOLO architectures) and LLM pipeline optimizations (RAG caching, semantic grounding, convergence detection). Experienced in turning raw algorithmic research into ultra-fast, production-ready software deployed on resource-constrained edge devices and cloud infrastructure.",
        "Published author on IEEE Xplore for nano-architecture time-series anomaly detection, and rapid prototyper capable of building and shipping full multi-agent platforms in under 15 days."
    ],
    corePrinciples: [
        {
            title: "Efficiency First",
            description: "Architectural distillation, intermediate feature matching, and FP16 TensorRT quantization to enable heavy deep learning at edge FPS.",
            highlightClass: "highlight-purple"
        },
        {
            title: "Agentic Reasoning",
            description: "Orchestrating multi-agent dialectical consensus networks with historical doctrines, semantic caching, and automated hallucination filters.",
            highlightClass: "highlight-blue"
        },
        {
            title: "Full-Stack Velocity",
            description: "Coupling heavy ML backends with robust database schemas (PostgreSQL, PLpgSQL) and high-speed reactive interfaces.",
            highlightClass: "highlight-cyan"
        },
        {
            title: "Rapid Prototyping",
            description: "Leveraging cutting-edge AI-assisted workflows to accelerate development, focusing maximum engineering effort on novel architecture and edge optimization.",
            highlightClass: "highlight-gold"
        }
    ]
};

/**
 * Hero counters shown at the top of the portfolio.
 * Suffix can be "%", " FPS", "+", etc.
 */
const HERO_STATS = [
    {
        value: 231,
        suffix: " FPS",
        label: "TensorRT Weed Detection",
        accent: "ml-accent",
        description: "Edge inference with zero accuracy loss"
    },
    {
        value: 10,
        suffix: " Agents",
        label: "Debate & Consensus Core",
        accent: "agent-accent",
        description: "Autonomous historical & analytical personas"
    },
    {
        value: 56,
        suffix: "% Token",
        label: "RAG Pipeline Reduction",
        accent: "compression-accent",
        description: "Semantic caching & early convergence"
    },
    {
        value: 1,
        suffix: " IEEE Paper",
        label: "IEEE Xplore Publication",
        accent: "ieee-accent",
        description: "Nano CNN-LSTM anomaly localisation"
    }
];

/**
 * =========================================================================
 * 🛠️ PROJECTS DATA
 * =========================================================================
 * TO ADD A NEW PROJECT:
 * Copy and paste this template at the top of the array:
 * 
 * {
 *     title: "Your Project Title",
 *     category: "agents", // Choose: "agents" | "ml" | "fullstack"
 *     status: "Live",     // e.g. "Live" | "Open Source" | "Research" | "Demo"
 *     date: "Month 2026",
 *     description: "One or two sentences describing what the project does and its core value.",
 *     highlights: [
 *         { value: "X%", label: "Metric 1" },
 *         { value: "Yx", label: "Metric 2" }
 *     ],
 *     bullets: [
 *         "Key technical accomplishment 1.",
 *         "Key technical accomplishment 2."
 *     ],
 *     tags: ["Python", "PyTorch", "Docker"],
 *     liveUrl: "https://your-demo.com",      // Optional: set to null or "" if no demo
 *     githubUrl: "https://github.com/..."    // Optional: set to null or "" if private
 * },
 * =========================================================================
 */
const PROJECTS_DATA = [
    {
        title: "VG Intelligence — Multi-Agent Geopolitical Platform",
        category: "agents",
        status: "Live",
        date: "May 2026",
        description: "Shipped in 15 days: An autonomous multi-agent political forecasting platform orchestrating 10 AI agents (5 historical personas & 5 analytical roles) that engage in iterative dialectical debates to synthesize high-confidence strategic insights.",
        highlights: [
            { value: "56% Token", label: "Reduction" },
            { value: "38% Lower", label: "Latency" }
        ],
        bullets: [
            "Engineered a 7-stage optimized pipeline: semantic caching, intent classification, pattern grounding, hybrid RAG, shadow round, hallucination detector, and judge synthesis.",
            "Built hybrid retrieval (dense, sparse BM25, and recency) using ChromaDB and early convergence detection (exits early when 8/10 agents agree), cutting debate rounds by 50–70%.",
            "Deployed live as a containerized Bring-Your-Own-Key (BYOK) SaaS on Hugging Face Spaces & Railway."
        ],
        tags: ["Python", "Groq LLM", "ChromaDB", "FastAPI", "Tavily", "RAG", "Multi-Agent"],
        liveUrl: "https://huggingface.co/spaces/kollarushi/vg",
        githubUrl: "https://github.com/RUSHI-KOLLA/vg"
    },
    {
        title: "AgroOJS — Multi-Scale Feature Distillation Framework",
        category: "ml",
        status: "Research",
        date: "Feb – Apr 2026",
        description: "A lightweight multi-scale knowledge distillation framework for real-time weed detection, purpose-built for edge deployment on agricultural drones and smart sprayers.",
        highlights: [
            { value: "231 FPS", label: "TensorRT FP16" },
            { value: "+4.1 pp", label: "Student over Teacher" }
        ],
        bullets: [
            "Trained a YOLOv8l teacher and distilled intermediate feature representations into a compact YOLOv8s student at backbone layers 4, 6, and 9 with learnable 1x1 channel-alignment adapters.",
            "Student model surpassed teacher mAP50 by 4.1 percentage points (78.8% vs 74.7%) while reducing parameter count by 5.9x.",
            "Constructed Weed-19: a unified 19-class benchmark merging CottonWeedDet12 and MH-Weed16 with bounding-box verification and minority oversampling to 500 instances/class.",
            "Achieved 231 FPS at 22.7 MB using TensorRT FP16 export — an 11x combined compression factor with zero accuracy loss."
        ],
        tags: ["PyTorch", "YOLOv8", "Knowledge Distillation", "TensorRT", "Edge AI", "Computer Vision"],
        liveUrl: null,
        githubUrl: "https://github.com/RUSHI-KOLLA/AgroOJS"
    },
    {
        title: "HEAL — Nano CNN-LSTM for Electricity Theft Detection",
        category: "ml",
        status: "IEEE Published",
        date: "2026",
        description: "High-Efficiency Anomaly Localisation architecture published in IEEE Xplore. Designed specifically for smart-grid consumption time-series data to detect electricity theft in resource-constrained edge smart meters.",
        highlights: [
            { value: "IEEE Xplore", label: "NMITCON-2026" },
            { value: "Nano Arch", label: "Edge-Ready" }
        ],
        bullets: [
            "Published in the Proceedings of the 4th IEEE International Conference on Networks, Multimedia and Information Technology (NMITCON-2026), co-sponsored by IEEE Bangalore Section.",
            "Engineered a novel lightweight hybrid Nano CNN-LSTM network that captures local temporal spikes while maintaining long-range consumption dependencies.",
            "Ultra-small parameter footprint optimized to execute directly on low-power smart meter hardware with minimal latency."
        ],
        tags: ["PyTorch", "CNN-LSTM", "Time-Series", "Anomaly Detection", "Smart Grids", "IEEE Xplore"],
        liveUrl: "https://ieeexplore.ieee.org/",
        githubUrl: "https://github.com/RUSHI-KOLLA"
    },
    {
        title: "Health Nutrition Advisor Agent",
        category: "agents",
        status: "Live Demo",
        date: "Dec 2025",
        description: "AI-powered clinical health nutrition assistant built using Google Agent Development Kit (ADK) and Gemini models to provide grounded dietary suggestions tailored to user symptoms and physiological needs.",
        highlights: [
            { value: "Google ADK", label: "Agent Engine" },
            { value: "Real-time", label: "Custom Search" }
        ],
        bullets: [
            "Provides tailored nutritional guidance for health conditions like fever, acidity, digestion disorders, iron deficiency, and electrolyte imbalance.",
            "Integrates Google Programmable Search Engine (Google CSE) via ADK's Search Tool to ground LLM dietary advice against verified clinical databases.",
            "Maintains multi-turn conversational session memory and supports both interactive terminal CLI and web UI modes."
        ],
        tags: ["Google ADK", "Gemini API", "Python", "Google CSE", "Agent Memory"],
        liveUrl: null,
        githubUrl: "https://github.com/RUSHI-KOLLA/Health-Nutrition-Agent"
    },
    {
        title: "VYUHA — Master Timetable Constraint Solver",
        category: "fullstack",
        status: "Live",
        date: "Apr 2026",
        description: "A full-stack master academic timetable and resource allocation solver resolving complex multi-departmental constraints (faculty availability, room capacities, and course overlaps).",
        highlights: [
            { value: "PLpgSQL", label: "Core Solver" },
            { value: "Instant", label: "Lock Validation" }
        ],
        bullets: [
            "Engineered procedural database rules with PostgreSQL PLpgSQL to execute instant clash detection and atomic resource locking.",
            "Responsive administrative dashboard built with modern JavaScript communicating with an asynchronous Python backend.",
            "Deployed live on Vercel with zero cold-start penalty for administrative schedules."
        ],
        tags: ["Python", "JavaScript", "PostgreSQL", "PLpgSQL", "Vercel"],
        liveUrl: "https://vyuha-five.vercel.app",
        githubUrl: "https://github.com/RUSHI-KOLLA/VYUHA"
    },
    {
        title: "Neusort — Intelligent Allocation Engine",
        category: "fullstack",
        status: "Open Source",
        date: "2026",
        description: "Automated candidate and resource sorting algorithm with deterministic matching rules, dynamic priority weighting, and exportable analytics.",
        highlights: [
            { value: "TypeScript", label: "Type-Safe" },
            { value: "Deterministic", label: "Matching" }
        ],
        bullets: [
            "Implemented greedy and constraint-satisfaction allocation algorithms for large cohort sorting.",
            "Full end-to-end typing with modular configuration files for rapid institutional customization."
        ],
        tags: ["TypeScript", "Node.js", "Algorithms", "Optimization"],
        liveUrl: null,
        githubUrl: "https://github.com/RUSHI-KOLLA/Neusort-Allocation-Engine"
    }
];

/**
 * =========================================================================
 * 💼 PROFESSIONAL EXPERIENCE
 * =========================================================================
 */
const EXPERIENCE_DATA = [
    {
        role: "Machine Learning Intern",
        company: "Suvidha Foundation",
        location: "Remote",
        period: "Feb 2026 – Apr 2026",
        type: "Internship",
        description: "Engineered computer vision distillation pipelines for precision agriculture, specializing in edge deployment and multi-scale intermediate layer feature matching.",
        bullets: [
            "Developed AgroOJS: a multi-scale feature distillation framework for real-time weed detection on resource-constrained agricultural hardware (drones, smart sprayers).",
            "Trained a YOLOv8l teacher and distilled knowledge into a compact YOLOv8s student via intermediate feature distillation at backbone layers 4, 6, and 9; student surpassed teacher mAP50 by 4.1 pp (78.8% vs 74.7%).",
            "Achieved 231 FPS at 22.7 MB with TensorRT FP16 export — 11x combined compression (5.9x architectural + approx 1.9x FP16) with no measurable accuracy loss.",
            "Constructed Weed-19: a unified 19-class benchmark by merging CottonWeedDet12 and MH-Weed16; applied bounding-box filtering, class deduplication, and minority-class oversampling to 500 instances per class.",
            "Debugged gradient conflict: identified that combining feature-level distillation with KL-divergence caused interference; disabled KL (gamma=0) to stabilize multi-loss convergence."
        ],
        skills: ["PyTorch", "YOLOv8", "Knowledge Distillation", "TensorRT", "Computer Vision", "Dataset Engineering"]
    }
];

/**
 * =========================================================================
 * 📚 PUBLICATIONS
 * =========================================================================
 */
const PUBLICATIONS_DATA = [
    {
        title: "HEAL: High-Efficiency Anomaly Localisation for Electricity Theft Detection via Nano CNN-LSTM Architectures",
        authors: "Kolla Rushikesh, et al.",
        venue: "Proceedings of the 4th IEEE International Conference on Networks, Multimedia and Information Technology (NMITCON-2026)",
        publisher: "IEEE Xplore",
        year: "2026",
        badge: "IEEE Xplore Published",
        coSponsor: "Technically co-sponsored by IEEE Bangalore Section",
        abstract: "Addresses the challenge of detecting unauthorized electricity consumption patterns on edge smart meters with limited compute budgets. Proposed a hybrid Nano CNN-LSTM network that localizes sudden spikes and subtle persistent consumption deviations while cutting parameter overhead for direct on-chip inference.",
        tags: ["IEEE Xplore", "CNN-LSTM", "Smart Grids", "Time-Series Anomaly Detection", "Edge AI"],
        url: "https://ieeexplore.ieee.org/"
    }
];

/**
 * =========================================================================
 * ⚡ TECHNICAL SKILLS
 * =========================================================================
 */
const SKILLS_DATA = [
    {
        category: "Machine Learning & Deep Learning",
        icon: "brain",
        skills: [
            { name: "Python", level: 95 },
            { name: "PyTorch & TorchScript", level: 92 },
            { name: "Knowledge Distillation", level: 94 },
            { name: "YOLOv8 & Computer Vision", level: 90 },
            { name: "TensorRT FP16 Quantization", level: 86 },
            { name: "Scikit-Learn, Pandas, NumPy", level: 92 }
        ]
    },
    {
        category: "Multi-Agent Systems & LLMs",
        icon: "cpu",
        skills: [
            { name: "Multi-Agent Debate Architectures", level: 92 },
            { name: "Hybrid RAG (Dense, Sparse, Recency)", level: 90 },
            { name: "ChromaDB & Vector Stores", level: 88 },
            { name: "Semantic Caching & Optimization", level: 94 },
            { name: "Google ADK & Gemini API", level: 88 },
            { name: "Groq LLM Acceleration", level: 90 }
        ]
    },
    {
        category: "Software Engineering & Tools",
        icon: "terminal",
        skills: [
            { name: "FastAPI & RESTful APIs", level: 88 },
            { name: "PostgreSQL & PLpgSQL", level: 84 },
            { name: "Docker & Containerization", level: 85 },
            { name: "Git, GitHub & GitHub Pages", level: 92 },
            { name: "Linux & Bash Scripting", level: 86 },
            { name: "JavaScript & Modern Web Tech", level: 82 }
        ]
    }
];

/**
 * =========================================================================
 * 🎓 EDUCATION
 * =========================================================================
 */
const EDUCATION_DATA = [
    {
        degree: "B.Tech in Computer Science and Engineering",
        institution: "Reva University",
        location: "Bengaluru, India",
        period: "Expected: 2027",
        details: "Specializing in Deep Learning, Multi-Agent Systems, Data Structures, and Algorithmic Optimization.",
        score: null
    },
    {
        degree: "Intermediate (Class XII)",
        institution: "Sri Chaitanya Junior College",
        location: "Andhra Pradesh, India",
        period: "2023",
        details: "Mathematics, Physics, Chemistry (MPC)",
        score: "Score: 83.4%"
    }
];

/**
 * =========================================================================
 * 🏆 CERTIFICATIONS
 * =========================================================================
 */
const CERTIFICATIONS_DATA = [
    {
        title: "5-Day AI Agents Intensive Course",
        issuer: "Google & Kaggle",
        date: "Dec 2025",
        badge: "Google & Kaggle Certified",
        description: "Hands-on mastery of autonomous AI agents, tool use, memory architectures, and multi-agent coordination."
    },
    {
        title: "Design Pattern Classification & Architectural Patterns",
        issuer: "Infosys Springboard",
        date: "Oct 2025",
        badge: "Architectural Patterns",
        description: "Comprehensive study of object-oriented structural, behavioral, and creational design patterns for scalable enterprise software."
    }
];
