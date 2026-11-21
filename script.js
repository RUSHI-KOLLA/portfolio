document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // Core Layout, Navigation & Menu
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when links are clicked on mobile
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // Dynamic Theme Selector
    // ==========================================================================
    const themeMenuBtn = document.getElementById('theme-menu-btn');
    const themeDropdown = document.getElementById('theme-dropdown');
    const themeOptions = document.querySelectorAll('.theme-opt');
    const bodyElement = document.body;

    if (themeMenuBtn && themeDropdown) {
        themeMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            themeDropdown.classList.remove('show');
        });

        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const selectedTheme = option.getAttribute('data-theme');
                
                bodyElement.className = '';
                bodyElement.classList.add(`theme-${selectedTheme}`);
                
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                localStorage.setItem('portfolio-theme', selectedTheme);
                updateCanvasColors(selectedTheme);
            });
        });

        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            bodyElement.className = '';
            bodyElement.classList.add(`theme-${savedTheme}`);
            
            themeOptions.forEach(opt => {
                if (opt.getAttribute('data-theme') === savedTheme) {
                    opt.classList.add('active');
                } else {
                    opt.classList.remove('active');
                }
            });
        }
    }

    // ==========================================================================
    // Interactive Canvas Neural Network Background
    // ==========================================================================
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let particleCount = 65;
    let connectionDistance = 110;
    let mouse = { x: null, y: null, radius: 150 };
    
    let particleColor = 'rgba(0, 242, 254, 0.45)';
    let lineColor = 'rgba(0, 242, 254, 0.08)';

    function updateCanvasColors(theme) {
        if (theme === 'cyber') {
            particleColor = 'rgba(0, 242, 254, 0.45)';
            lineColor = 'rgba(0, 242, 254, 0.08)';
            particleCount = 65;
        } else if (theme === 'slate') {
            particleColor = 'rgba(99, 102, 241, 0.35)';
            lineColor = 'rgba(99, 102, 241, 0.06)';
            particleCount = 50;
        } else if (theme === 'orchid') {
            particleColor = 'rgba(124, 58, 237, 0.2)';
            lineColor = 'rgba(124, 58, 237, 0.04)';
            particleCount = 40;
        }
        initParticles();
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        if (canvas.width < 768) {
            particleCount = 30;
            connectionDistance = 80;
        } else {
            const currentTheme = bodyElement.className.replace('theme-', '') || 'cyber';
            updateCanvasColors(currentTheme);
        }
    }
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2.2 + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
        }

        update() {
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            
            this.x += this.vx;
            this.y += this.vy;
            
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = (dx / distance) * force * 3;
                    const directionY = (dy / distance) * force * 3;
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
            this.draw();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 1 - (distance / connectionDistance);
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        connectParticles();
        requestAnimationFrame(animateCanvas);
    }

    const currentTheme = bodyElement.className.replace('theme-', '') || 'cyber';
    resizeCanvas();
    updateCanvasColors(currentTheme);
    animateCanvas();

    // ==========================================================================
    // Toast Notification System
    // ==========================================================================
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    let toastTimeout = null;

    function showToast(message) {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = message;
        toast.classList.add('show');
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    }

    // ==========================================================================
    // Dynamic Rendering from data.js
    // ==========================================================================
    
    // 1. Render Hero Stats with Count-Up Animation
    function renderHeroStats() {
        const container = document.getElementById('hero-stats-container');
        if (!container || typeof HERO_STATS === 'undefined') return;

        container.innerHTML = HERO_STATS.map((stat, idx) => `
            <div class="stat-card glass-panel" data-target="${stat.value}" data-suffix="${stat.suffix}">
                <div class="stat-icon-wrapper ${stat.accent}">
                    <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <div class="stat-info">
                    <h3 class="stat-value"><span class="counter-number">0</span>${stat.suffix}</h3>
                    <p class="stat-label">${stat.label}</p>
                </div>
            </div>
        `).join('');

        // Count-up animation
        const statCards = container.querySelectorAll('.stat-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const target = parseInt(card.getAttribute('data-target'), 10);
                    const counterSpan = card.querySelector('.counter-number');
                    animateCounter(counterSpan, target, 1400);
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.3 });

        statCards.forEach(c => observer.observe(c));
    }

    function animateCounter(element, target, duration) {
        if (!element) return;
        let start = 0;
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * target);
            element.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        requestAnimationFrame(update);
    }

    // 2. Render About Section
    function renderAboutSection() {
        if (typeof PROFILE_DATA === 'undefined') return;
        
        const pContainer = document.getElementById('about-paragraphs-container');
        if (pContainer && PROFILE_DATA.aboutParagraphs) {
            pContainer.innerHTML = PROFILE_DATA.aboutParagraphs.map((p, idx) => `
                <p class="${idx === 0 ? 'paragraphhighlight' : ''}">${p}</p>
            `).join('');
        }

        const principlesContainer = document.getElementById('core-principles-container');
        if (principlesContainer && PROFILE_DATA.corePrinciples) {
            principlesContainer.innerHTML = PROFILE_DATA.corePrinciples.map(item => `
                <li>
                    <strong class="${item.highlightClass}">${item.title}:</strong> ${item.description}
                </li>
            `).join('');
        }
    }

    // 3. Render Experience Section
    function renderExperience() {
        const container = document.getElementById('experience-container');
        if (!container || typeof EXPERIENCE_DATA === 'undefined') return;

        container.innerHTML = EXPERIENCE_DATA.map(exp => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content glass-panel">
                    <div class="timeline-header">
                        <div>
                            <span class="timeline-tag">${exp.type}</span>
                            <h3 class="timeline-role">${exp.role}</h3>
                            <h4 class="timeline-company">${exp.company}</h4>
                        </div>
                        <div class="timeline-meta">
                            <span class="timeline-date">${exp.period}</span>
                            <span class="timeline-location">${exp.location}</span>
                        </div>
                    </div>
                    <div class="timeline-details">
                        <p class="timeline-desc">${exp.description}</p>
                        <ul class="timeline-bullets">
                            ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
                        </ul>
                        <div class="project-tags" style="margin-top: 1.25rem;">
                            ${exp.skills.map(s => `<span class="tag">${s}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 4. Render Projects Grid
    function renderProjects(filter = 'all') {
        const grid = document.getElementById('projects-grid');
        if (!grid || typeof PROJECTS_DATA === 'undefined') return;

        const filtered = filter === 'all' 
            ? PROJECTS_DATA 
            : PROJECTS_DATA.filter(p => p.category === filter);

        grid.innerHTML = filtered.map(p => `
            <div class="project-card glass-panel" data-category="${p.category}">
                <div class="project-header">
                    <div class="project-title-wrapper">
                        <h3 class="project-title">${p.title}</h3>
                        ${p.status ? `<span class="project-status">${p.status}</span>` : ''}
                    </div>
                    <span class="project-date">${p.date}</span>
                </div>
                <p class="project-description">${p.description}</p>
                
                ${p.highlights && p.highlights.length ? `
                    <div class="project-highlights">
                        ${p.highlights.map(h => `
                            <div class="highlight-item">
                                <span class="highlight-val">${h.value}</span>
                                <span class="highlight-lbl">${h.label}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <ul class="project-bullets-small">
                    ${p.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>

                <div class="project-tags">
                    ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>

                <div class="project-links">
                    ${p.liveUrl ? `
                        <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
                            Visit Live
                            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                        </a>
                    ` : ''}
                    ${p.githubUrl ? `
                        <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
                            GitHub Repository
                            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                        </a>
                    ` : ''}
                </div>
            </div>
        `).join('') + `
            <!-- GitHub Discovery Card -->
            <div class="project-card glass-panel git-cta-card">
                <div class="git-cta-content">
                    <div class="git-icon-wrapper">
                        <svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                    </div>
                    <h3>Explore More Repositories</h3>
                    <p>View my complete GitHub profile with open-source experiments and architectures.</p>
                    <a href="https://github.com/RUSHI-KOLLA?tab=repositories" target="_blank" rel="noopener noreferrer" class="btn btn-primary git-cta-btn">
                        Visit My GitHub
                        <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M5 13h11.86l-5.43 5.43 1.42 1.42L21 12l-8.15-8.15-1.42 1.42 5.43 5.43H5v2z"/></svg>
                    </a>
                </div>
            </div>
        `;

        setupTiltEffect();
    }

    // 5. 3D Tilt Effect on Project Cards
    function setupTiltEffect() {
        const cards = document.querySelectorAll('.project-card:not(.git-cta-card)');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            });
        });
    }

    // 6. Project Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            renderProjects(filterValue);
        });
    });

    // 7. Render Publications Section
    function renderPublications() {
        const container = document.getElementById('publications-container');
        if (!container || typeof PUBLICATIONS_DATA === 'undefined') return;

        container.innerHTML = PUBLICATIONS_DATA.map(pub => `
            <div class="publication-card glass-panel">
                <div class="pub-top-meta">
                    <span class="pub-badge-ieee">
                        <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10A10 10 0 0 0 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                        ${pub.badge}
                    </span>
                    <span class="pub-year">${pub.year}</span>
                </div>
                <h3 class="pub-title">${pub.title}</h3>
                <div class="pub-venue">${pub.venue}</div>
                <div class="pub-cosponsor">${pub.coSponsor}</div>
                
                <p class="pub-abstract">
                    <strong>Abstract Overview:</strong> ${pub.abstract}
                </p>

                <div class="project-tags" style="margin-bottom: 1.5rem;">
                    ${pub.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>

                <div class="pub-actions">
                    <a href="${pub.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        Access on IEEE Xplore
                        <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                    </a>
                    <button class="btn btn-secondary copy-citation-btn" data-citation="${pub.title}. In: ${pub.venue}, ${pub.year}.">
                        <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                        Copy Citation
                    </button>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.copy-citation-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const citation = btn.getAttribute('data-citation');
                navigator.clipboard.writeText(citation).then(() => {
                    showToast('Citation copied to clipboard!');
                }).catch(() => {
                    showToast('Citation copied!');
                });
            });
        });
    }

    // 8. Render Skills Matrix
    function renderSkills() {
        const grid = document.getElementById('skills-grid');
        if (!grid || typeof SKILLS_DATA === 'undefined') return;

        grid.innerHTML = SKILLS_DATA.map(cat => `
            <div class="skills-category glass-panel">
                <h3 class="category-title">
                    <svg class="cat-icon" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
                    ${cat.category}
                </h3>
                <div class="skills-list">
                    ${cat.skills.map(s => `
                        <div class="skill-item-card">
                            <div style="display:flex; justify-content:space-between; margin-bottom: 0.25rem;">
                                <span class="skill-name">${s.name}</span>
                                <span class="skill-pct" style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${s.level}%</span>
                            </div>
                            <div class="skill-bar"><div class="skill-progress" style="width: ${s.level}%;"></div></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // 9. Render Education & Certifications
    function renderEducationAndCerts() {
        const eduContainer = document.getElementById('education-container');
        if (eduContainer && typeof EDUCATION_DATA !== 'undefined') {
            eduContainer.innerHTML = EDUCATION_DATA.map(edu => `
                <div class="edu-card glass-panel">
                    <div class="edu-header">
                        <h4 class="edu-degree">${edu.degree}</h4>
                        <span class="edu-period">${edu.period}</span>
                    </div>
                    <h5 class="edu-inst">${edu.institution}, ${edu.location}</h5>
                    ${edu.score ? `<p class="edu-score" style="color:var(--primary); font-weight:700;">${edu.score}</p>` : ''}
                    <p class="edu-coursework">${edu.details}</p>
                </div>
            `).join('');
        }

        const certContainer = document.getElementById('certifications-container');
        if (certContainer && typeof CERTIFICATIONS_DATA !== 'undefined') {
            certContainer.innerHTML = CERTIFICATIONS_DATA.map(cert => `
                <div class="cert-card glass-panel">
                    <div class="cert-icon-wrapper">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                    </div>
                    <div class="cert-details">
                        <h4 class="cert-title">${cert.title}</h4>
                        <h5 class="cert-issuer">${cert.issuer}</h5>
                        <span class="cert-date">${cert.date}</span>
                        <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.35rem;">${cert.description}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    // Call all initial dynamic rendering
    renderHeroStats();
    renderAboutSection();
    renderExperience();
    renderProjects();
    renderPublications();
    renderSkills();
    renderEducationAndCerts();

    // ==========================================================================
    // Resume Modal Handler
    // ==========================================================================
    const resumeModal = document.getElementById('resume-modal');
    const resumeOpenBtn = document.getElementById('resume-open-btn');
    const resumeCloseBtn = document.getElementById('resume-close-btn');
    const resumeIframe = document.getElementById('resume-iframe');

    function openResumeModal() {
        if (!resumeModal) return;
        if (resumeIframe && !resumeIframe.getAttribute('src')) {
            resumeIframe.setAttribute('src', './resume.pdf');
        }
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (resumeOpenBtn) resumeOpenBtn.addEventListener('click', openResumeModal);
    if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResumeModal);
    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) closeResumeModal();
        });
    }

    // ==========================================================================
    // Quick Copy Handlers (Email, Phone)
    // ==========================================================================
    const quickEmailBtn = document.getElementById('quick-copy-email');
    if (quickEmailBtn) {
        quickEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText('kollarushi2006@gmail.com').then(() => {
                showToast('Email address copied: kollarushi2006@gmail.com');
            });
        });
    }

    document.querySelectorAll('.copyable-text').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const text = el.getAttribute('data-copy');
            if (text) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast(`Copied to clipboard: ${text}`);
                });
            }
        });
    });

    // ==========================================================================
    // Command Palette (Ctrl + K)
    // ==========================================================================
    const palette = document.getElementById('command-palette');
    const paletteBtn = document.getElementById('palette-btn');
    const paletteInput = document.getElementById('palette-search-input');
    const paletteResults = document.getElementById('palette-results');

    function openPalette() {
        if (!palette) return;
        palette.classList.add('active');
        if (paletteInput) {
            paletteInput.value = '';
            paletteInput.focus();
            renderPaletteResults('');
        }
    }

    function closePalette() {
        if (!palette) return;
        palette.classList.remove('active');
    }

    if (paletteBtn) paletteBtn.addEventListener('click', openPalette);
    if (palette) {
        palette.addEventListener('click', (e) => {
            if (e.target === palette) closePalette();
        });
    }

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (palette.classList.contains('active')) {
                closePalette();
            } else {
                openPalette();
            }
        } else if (e.key === 'Escape') {
            closePalette();
            closeResumeModal();
        }
    });

    function getSearchIndex() {
        const items = [
            { title: "View Resume (PDF)", desc: "Open resume viewer modal", type: "action", action: () => openResumeModal() },
            { title: "Download Resume", desc: "Download Kolla_Rushikesh_Resume.pdf", type: "download", href: "./resume.pdf" },
            { title: "Jump to Projects", desc: "Browse multi-agent & ML projects", type: "nav", href: "#projects" },
            { title: "Jump to Experience", desc: "Suvidha Foundation deep learning internship", type: "nav", href: "#experience" },
            { title: "Jump to Publications", desc: "IEEE Xplore NMITCON-2026 Paper (HEAL)", type: "nav", href: "#publications" },
            { title: "Jump to Terminal", desc: "Interactive command console", type: "nav", href: "#terminal" },
            { title: "Jump to Skills", desc: "PyTorch, YOLOv8, Knowledge Distillation, RAG", type: "nav", href: "#skills" },
            { title: "Contact via WhatsApp", desc: "Chat directly with Rushikesh", type: "external", href: "https://wa.me/918074323965" },
            { title: "GitHub Profile", desc: "github.com/RUSHI-KOLLA", type: "external", href: "https://github.com/RUSHI-KOLLA" },
            { title: "LinkedIn Profile", desc: "linkedin.com/in/kolla-rushikesh-4176232bb", type: "external", href: "https://www.linkedin.com/in/kolla-rushikesh-4176232bb/" }
        ];

        // Add dynamic projects
        if (typeof PROJECTS_DATA !== 'undefined') {
            PROJECTS_DATA.forEach(p => {
                items.push({
                    title: p.title,
                    desc: p.description.slice(0, 90) + '...',
                    type: "project",
                    href: p.liveUrl || p.githubUrl || "#projects"
                });
            });
        }

        // Add publications
        if (typeof PUBLICATIONS_DATA !== 'undefined') {
            PUBLICATIONS_DATA.forEach(pub => {
                items.push({
                    title: pub.title,
                    desc: `Published in ${pub.publisher} (${pub.year})`,
                    type: "publication",
                    href: pub.url
                });
            });
        }

        return items;
    }

    function renderPaletteResults(query) {
        if (!paletteResults) return;
        const allItems = getSearchIndex();
        const q = query.toLowerCase().trim();

        const filtered = q === '' 
            ? allItems.slice(0, 7)
            : allItems.filter(item => item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q));

        if (filtered.length === 0) {
            paletteResults.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">No matching items found for "${query}"</div>`;
            return;
        }

        paletteResults.innerHTML = filtered.map(item => `
            <div class="palette-item" data-type="${item.type}" data-href="${item.href || ''}">
                <div class="palette-item-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                </div>
                <div class="palette-item-text">
                    <div class="palette-item-title">${item.title}</div>
                    <div class="palette-item-desc">${item.desc}</div>
                </div>
                <span class="palette-item-badge">${item.type.toUpperCase()}</span>
            </div>
        `).join('');

        paletteResults.querySelectorAll('.palette-item').forEach((row, idx) => {
            row.addEventListener('click', () => {
                const item = filtered[idx];
                closePalette();
                if (item.action) {
                    item.action();
                } else if (item.href) {
                    if (item.href.startsWith('#')) {
                        const target = document.querySelector(item.href);
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        window.open(item.href, '_blank');
                    }
                }
            });
        });
    }

    if (paletteInput) {
        paletteInput.addEventListener('input', (e) => {
            renderPaletteResults(e.target.value);
        });
    }

    // ==========================================================================
    // Interactive Terminal Console (Synchronized with data.js)
    // ==========================================================================
    const termBox = document.getElementById('terminal-box');
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    const terminalCommands = {
        help: `Available commands:
  <span class="cmd-text">about</span>         - Engineering philosophy & background
  <span class="cmd-text">projects</span>      - List all live & research projects from data.js
  <span class="cmd-text">experience</span>    - Details on Deep Learning internship at Suvidha Foundation
  <span class="cmd-text">publications</span>  - Peer-reviewed paper on IEEE Xplore (NMITCON-2026)
  <span class="cmd-text">skills</span>        - Technical skills matrix & proficiencies
  <span class="cmd-text">education</span>     - University, degree, and intermediate records
  <span class="cmd-text">certifications</span>- Google & Kaggle AI Agents, Infosys credentials
  <span class="cmd-text">resume</span>        - View & download resume PDF
  <span class="cmd-text">contact</span>       - Coordinates (email, phone, LinkedIn, WhatsApp)
  <span class="cmd-text">matrix</span>        - Trigger digital codefall
  <span class="cmd-text">clear</span>         - Clear the screen buffer`,

        about: () => `<b>Kolla Rushikesh — AI Engineer & ML Specialist</b>
-------------------------------------------------------------------
Computer Science undergraduate (B.Tech 2027) building production-ready AI applications, 
multi-agent debate platforms, and edge-distilled neural pipelines.
Published author in IEEE Xplore for nano-architecture time-series anomaly detection.
Status: <span style="color:#10b981">Available for ML / AI Internships (Summer & Fall 2026)</span>`,

        projects: () => {
            if (typeof PROJECTS_DATA === 'undefined') return "No project data available.";
            return `<b>PROJECT DIRECTORY (Configured via data.js):</b>
-------------------------------------------------------------------` + PROJECTS_DATA.map((p, i) => `
${i + 1}. <b>${p.title}</b> [${p.status || 'Active'}]
   * ${p.description}
   * Stack: ${p.tags.join(', ')}
   ${p.liveUrl ? `* Live: ${p.liveUrl}\n` : ''}   ${p.githubUrl ? `* Repo: ${p.githubUrl}\n` : ''}`).join('');
        },

        experience: () => `<b>PROFESSIONAL EXPERIENCE RECORD:</b>
-------------------------------------------------------------------
<b>Machine Learning Intern | Suvidha Foundation (Feb 2026 – Apr 2026)</b>
* Developed <b>AgroOJS</b>: Multi-scale feature distillation framework for weed detection.
* Distilled YOLOv8l teacher into YOLOv8s student; student surpassed teacher mAP50 by <b>4.1 pp</b> (78.8% vs 74.7%).
* Integrated TensorRT FP16 exports reaching <b>231 FPS</b> at 22.7 MB on edge devices (11x compression).
* Built <b>Weed-19</b>: Unified 19-class benchmark merging CottonWeedDet12 and MH-Weed16.
* Fixed gradient interference: disabled KL divergence (gamma=0) to stabilize feature MSE convergence.`,

        publications: () => `<b>PEER-REVIEWED RESEARCH PUBLICATIONS:</b>
-------------------------------------------------------------------
<b>HEAL: High-Efficiency Anomaly Localisation for Electricity Theft Detection via Nano CNN-LSTM Architectures</b>
* <b>Venue:</b> Proceedings of the 4th IEEE International Conference on Networks, Multimedia and Information Technology (NMITCON-2026)
* <b>Co-sponsor:</b> IEEE Bangalore Section
* <b>Index:</b> Published in <b>IEEE Xplore</b> (2026)
* <b>Focus:</b> Lightweight Nano CNN-LSTM hybrid capturing temporal spikes and persistent electricity theft on edge smart meters.
* <b>Link:</b> https://ieeexplore.ieee.org/`,

        papers: () => terminalCommands.publications(),

        skills: () => `<b>TECHNICAL COMPETENCY MATRIX:</b>
-------------------------------------------------------------------
* <b>ML / Deep Learning:</b> PyTorch, Knowledge Distillation, YOLOv8, TensorRT FP16, Hugging Face, Scikit-learn
* <b>Multi-Agent & LLMs:</b> Multi-Agent Debate, Hybrid RAG, ChromaDB, FastEmbed, Semantic Caching, Google ADK, Gemini API
* <b>Engineering & Ops:</b> Python, FastAPI, PostgreSQL, PLpgSQL, Docker, Git/GitHub, Linux/Bash`,

        education: () => `<b>ACADEMIC CREDENTIALS:</b>
-------------------------------------------------------------------
* <b>B.Tech in Computer Science and Engineering</b> (Expected 2027)
  Reva University, Bengaluru, India
* <b>Intermediate (Class XII)</b> (2023)
  Sri Chaitanya Junior College, Andhra Pradesh | Score: 83.4%`,

        certifications: () => `<b>VERIFIED CERTIFICATIONS:</b>
-------------------------------------------------------------------
* <b>5-Day AI Agents Intensive Course</b> — Google & Kaggle (Dec 2025)
* <b>Design Pattern Classification & Architectural Patterns</b> — Infosys Springboard (Oct 2025)`,

        resume: () => {
            openResumeModal();
            return `Opening interactive resume viewer modal... (PDF also available at <a href="./resume.pdf" target="_blank" style="color:#00f2fe">./resume.pdf</a>)`;
        },

        "cat resume.pdf": () => terminalCommands.resume(),

        contact: () => `<b>CONTACT & CHANNELS:</b>
-------------------------------------------------------------------
* <b>Email:</b> kollarushi2006@gmail.com
* <b>Phone:</b> +91-8074323965
* <b>Location:</b> Bengaluru, Karnataka, India
* <b>WhatsApp:</b> https://wa.me/918074323965
* <b>LinkedIn:</b> https://www.linkedin.com/in/kolla-rushikesh-4176232bb/
* <b>GitHub:</b> https://github.com/RUSHI-KOLLA`,

        github: () => {
            window.open('https://github.com/RUSHI-KOLLA', '_blank');
            return "Opening https://github.com/RUSHI-KOLLA in a new browser tab...";
        },

        matrix: () => {
            return `<span style="color:#39ff14">Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇</span>`;
        },

        sudo: `<span style="color:#ff5f56">Permission denied: You are not in the sudoers file. This incident will be reported to Rushikesh.</span>`,

        whoami: () => "visitor@rushi-core — Welcome to Rushikesh's interactive AI portfolio."
    };

    if (termBox && termInput && termOutput) {
        termBox.addEventListener('click', () => {
            termInput.focus();
        });

        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const inputValue = termInput.value.trim();
                const cleanCmd = inputValue.toLowerCase();
                
                const promptLine = document.createElement('div');
                promptLine.className = 'terminal-line';
                promptLine.innerHTML = `<span class="terminal-prompt">visitor@rushi-core:~$</span> ${inputValue}`;
                termOutput.appendChild(promptLine);
                
                if (cleanCmd !== '') {
                    executeCommand(cleanCmd);
                }
                
                termInput.value = '';
                termOutput.scrollTop = termOutput.scrollHeight;
            }
        });
    }

    function executeCommand(cmd) {
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-line';
        
        if (cmd === 'clear') {
            termOutput.innerHTML = '';
            return;
        }
        
        if (terminalCommands.hasOwnProperty(cmd)) {
            const result = terminalCommands[cmd];
            responseLine.innerHTML = typeof result === 'function' ? result() : result;
        } else {
            responseLine.innerHTML = `<span style="color:#ff5f56">bash: command not found: ${cmd}</span>. Type <span class="cmd-text">help</span> to view available operations.`;
        }
        
        termOutput.appendChild(responseLine);
    }

    // ==========================================================================
    // Scroll Reveal Intersection Observer
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
