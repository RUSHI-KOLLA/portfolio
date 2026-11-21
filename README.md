# Kolla Rushikesh — Personal Engineering Portfolio

[![Live Site](https://img.shields.io/badge/Live_Portfolio-GitHub_Pages-00f2fe?style=for-the-badge)](https://rushi-kolla.github.io/portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Interactive, high-performance portfolio showcasing multi-agent architectures, computer vision knowledge distillation pipelines, and published research.

👉 **Live URL:** [https://rushi-kolla.github.io/portfolio/](https://rushi-kolla.github.io/portfolio/)

---

## 🛠️ How to Add or Modify Projects (Zero HTML Required!)

All portfolio content is driven by **`data.js`**. You never need to touch `index.html` or `styles.css` to add or modify projects!

### Adding a New Project
Open `data.js` and add a new object to the `PROJECTS_DATA` array:

```javascript
{
    title: "Your Project Name",
    category: "agents", // Options: "agents" | "ml" | "fullstack"
    status: "Live",     // e.g. "Live" | "Research" | "Demo"
    date: "Month 2026",
    description: "Brief summary of what the project does.",
    highlights: [
        { value: "99%", label: "Accuracy" },
        { value: "10x", label: "Speedup" }
    ],
    bullets: [
        "Key accomplishment 1",
        "Key accomplishment 2"
    ],
    tags: ["PyTorch", "FastAPI", "Docker"],
    liveUrl: "https://your-live-demo.com", // or null
    githubUrl: "https://github.com/RUSHI-KOLLA/your-repo"
}
```

The website will automatically render the new project card, apply 3D tilt effects, enable filtering, and integrate it into the terminal console and `Ctrl + K` search palette!

---

## 🚀 Features

- **Dynamic Data Engine (`data.js`):** Modular data configuration.
- **Interactive Neural Background:** Physics-based particle graph canvas with cursor interaction.
- **Interactive Terminal Console:** Full-featured bash simulation (`help`, `projects`, `publications`, `skills`, `cat resume.pdf`).
- **Command Palette (`Ctrl + K`):** Instant spotlight search across all projects, publications, and actions.
- **Resume Modal & Direct Download:** Embedded viewer for `resume.pdf` with single-click download.
- **Publications Spotlight:** Dedicated IEEE Xplore showcase with citation copying.
- **Theme Switcher:** Cyberpunk Glow, Slate Minimalist, and Light Orchid with `localStorage` persistence.
