# Kolla Rushikesh — Personal Website & Portfolio

[![Live Site](https://img.shields.io/badge/Live_Portfolio-GitHub_Pages-2563eb?style=for-the-badge)](https://rushi-kolla.github.io/portfolio/)

Clean, minimalist academic & engineering portfolio.

👉 **Live Site:** [https://rushi-kolla.github.io/portfolio/](https://rushi-kolla.github.io/portfolio/)

---

## 🛠️ How to Add or Modify Projects (Zero HTML Required)

All content is configured in **[`data.js`](data.js)**:
- Profile picture: `assets/me.jpg`
- Bio and subtitle: `PROFILE_DATA`
- Timeline entries: `TIMELINE_DATA`
- Projects and software: `PROJECTS_DATA`
- Publications: `PUBLICATIONS_DATA`
- Skills and certifications: `SKILLS_DATA`, `CERTIFICATIONS_DATA`

### Adding a New Project
Just add an object to the `PROJECTS_DATA` array in `data.js`:

```javascript
{
    title: "New Project Name",
    subtitle: "Short tagline or problem statement",
    desc: "Description of what it does and key technical metrics.",
    links: [
        { label: "Live Demo", url: "https://..." },
        { label: "GitHub", url: "https://github.com/..." }
    ],
    tags: ["PyTorch", "FastAPI"]
}
```
The website will automatically render the new project cleanly on the page!
