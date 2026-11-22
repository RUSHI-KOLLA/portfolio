// ==========================================================================
// Kolla Rushikesh — Minimalist Engine (karpathy.ai style)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Profile details
    if (typeof PROFILE_DATA !== 'undefined') {
        const nameEl = document.getElementById('p-name');
        const subEl = document.getElementById('p-sub');
        const bioEl = document.getElementById('bio-content');
        
        if (nameEl && PROFILE_DATA.name) nameEl.textContent = PROFILE_DATA.name;
        if (subEl && PROFILE_DATA.subtitle) subEl.textContent = PROFILE_DATA.subtitle;
        if (bioEl && PROFILE_DATA.bio) bioEl.textContent = PROFILE_DATA.bio;
        
        // Email reveal handler (Karpathy style click-to-reveal)
        const iemail = document.getElementById('iemail');
        const demail = document.getElementById('demail');
        if (iemail && demail) {
            iemail.addEventListener('click', () => {
                if (demail.style.display === 'none' || !demail.style.display) {
                    demail.textContent = PROFILE_DATA.email;
                    demail.style.display = 'block';
                } else {
                    demail.style.display = 'none';
                }
            });
        }
    }

    // 2. Timeline rendering
    const historyContainer = document.getElementById('history-container');
    if (historyContainer && typeof TIMELINE_DATA !== 'undefined') {
        historyContainer.innerHTML = TIMELINE_DATA.map(item => `
            <div class="entry">
                <div class="timespan">${item.timespan}</div>
                <div class="ico">
                    <div class="entry-dot"></div>
                </div>
                <div class="desc">
                    ${item.role ? `<b>${item.role}</b><br>` : ''}
                    ${item.desc}
                </div>
            </div>
        `).join('');
    }

    // 3. Projects rendering
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer && typeof PROJECTS_DATA !== 'undefined') {
        projectsContainer.innerHTML = PROJECTS_DATA.map(p => `
            <div class="project-item">
                <div class="project-title-row">
                    ${p.links && p.links.length > 0 
                        ? `<a href="${p.links[0].url}" target="_blank" rel="noopener noreferrer" class="project-title-link">${p.title}</a>`
                        : `<span class="project-title-link">${p.title}</span>`
                    }
                    ${p.subtitle ? `<span class="project-subtitle">— ${p.subtitle}</span>` : ''}
                </div>
                <div class="project-desc">${p.desc}</div>
                <div class="project-footer">
                    ${p.links && p.links.length > 0 ? `
                        <div class="project-links">
                            ${p.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">[${l.label}]</a>`).join(' ')}
                        </div>
                    ` : ''}
                    ${p.tags ? `
                        <div class="project-tags">Stack: ${p.tags.join(', ')}</div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    // 4. Publications rendering
    const pubContainer = document.getElementById('publications-container');
    if (pubContainer && typeof PUBLICATIONS_DATA !== 'undefined') {
        pubContainer.innerHTML = PUBLICATIONS_DATA.map(pub => `
            <div class="pub">
                <a href="${pub.url}" target="_blank" rel="noopener noreferrer" class="pub-title">${pub.title}</a>
                <span class="pub-authors">${pub.authors}</span>
                <span class="pub-venue">${pub.venue} (${pub.year})</span>
                ${pub.notes ? `<div class="pub-notes">${pub.notes}</div>` : ''}
            </div>
        `).join('');
    }

    // 5. Skills rendering
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer && typeof SKILLS_DATA !== 'undefined') {
        skillsContainer.innerHTML = SKILLS_DATA.map(s => `
            <div class="skill-group">
                <span class="skill-category">${s.category}:</span>
                <span class="skill-items">${s.items}</span>
            </div>
        `).join('');
    }

    // 6. Certifications rendering
    const certContainer = document.getElementById('certifications-container');
    if (certContainer && typeof CERTIFICATIONS_DATA !== 'undefined') {
        certContainer.innerHTML = `
            <ul class="cert-list">
                ${CERTIFICATIONS_DATA.map(c => `
                    <li><b>${c.name}</b> — ${c.issuer} (${c.date})</li>
                `).join('')}
            </ul>
        `;
    }
});
