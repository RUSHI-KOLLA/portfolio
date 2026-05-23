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
        // Toggle dropdown
        themeMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            themeDropdown.classList.remove('show');
        });

        // Change themes
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const selectedTheme = option.getAttribute('data-theme');
                
                // Remove all theme classes and add the selected one
                bodyElement.className = '';
                bodyElement.classList.add(`theme-${selectedTheme}`);
                
                // Update active class on options
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // Store choice in local storage
                localStorage.setItem('portfolio-theme', selectedTheme);
                
                // Update canvas colors based on theme
                updateCanvasColors(selectedTheme);
            });
        });

        // Restore saved theme from local storage
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
    
    // Theme-specific colors
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

    // Setup sizes
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Responsive particle densities
        if (canvas.width < 768) {
            particleCount = 30;
            connectionDistance = 80;
        } else {
            const currentTheme = bodyElement.className.replace('theme-', '');
            updateCanvasColors(currentTheme);
        }
    }
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
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
            this.radius = Math.random() * 2.5 + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
        }

        update() {
            // Screen boundaries reflection
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            
            this.x += this.vx;
            this.y += this.vy;
            
            // Mouse push effect (subtle)
            if (mouse.x != null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    let angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 0.8;
                    this.y += Math.sin(angle) * force * 0.8;
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
                let dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < connectionDistance) {
                    // Line opacity maps to distance
                    let alpha = (1 - dist / connectionDistance) * 0.85;
                    ctx.strokeStyle = lineColor.replace('0.08', (alpha * 0.08).toString()).replace('0.06', (alpha * 0.06).toString()).replace('0.04', (alpha * 0.04).toString());
                    ctx.lineWidth = 1;
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

    // Init canvas
    const currentTheme = bodyElement.className.replace('theme-', '');
    resizeCanvas();
    updateCanvasColors(currentTheme);
    animateCanvas();



    // ==========================================================================
    // Interactive Terminal Console
    // ==========================================================================
    const termBox = document.getElementById('terminal-box');
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    const terminalCommands = {
        help: `Available commands:
  <span class="cmd-text">about</span>       - Brief overview of my engineering philosophy
  <span class="cmd-text">skills</span>      - Display core machine learning & tool competencies
  <span class="cmd-text">projects</span>    - Showcase key projects & structural details
  <span class="cmd-text">experience</span>  - Detail my Deep Learning Internship at Suvidha Foundation
  <span class="cmd-text">education</span>   - Outline academic institutions & benchmarks
  <span class="cmd-text">contact</span>     - Show contact coordinates (email, phone, etc.)
  <span class="cmd-text">github</span>      - Launch my repositories directly in a new tab
  <span class="cmd-text">matrix</span>      - Run the standard digital codefall script
  <span class="cmd-text">clear</span>       - Wipe the terminal buffer`,
        
        about: `<b>Kolla Rushikesh - Machine Learning Engineer</b>
-------------------------------------------------------------------
A specialist in structuring neural architectures, designing lightweight feature 
distillation systems (YOLOv8s/l), and building multi-agent LLM systems.
I combine mathematical model training with fast, scalable backends to deploy
production-ready AI agents.`,
        
        skills: `<b>TECHNICAL SKILL MATRIX:</b>
-------------------------------------------------------------------
* <b>ML & Deep Learning:</b> Python, Scikit-learn, TensorFlow, Keras, TensorRT, NumPy, Pandas
* <b>Concepts:</b> Object-Oriented Programming (OOPs), Data Structures, Prompt Engineering, AI-Assisted Development
* <b>Tools & Backends:</b> Git/GitHub, FastAPI, PostgreSQL, PLpgSQL, VS Code, Jupyter`,
        
        projects: `<b>FEATURED SCHEMATIC PROJECTS:</b>
-------------------------------------------------------------------
1. <b>VG Intelligence:</b> Multi-agent debate platform (10 AI agents). Live at: https://vg-production-1df6.up.railway.app
2. <b>VYUHA Master Timetable:</b> Relational database scheduling platform. Live at: https://vyuha-five.vercel.app
3. <b>morgous:</b> YOLOv8 knowledge distillation weed detection pipeline. Repo: https://github.com/RUSHI-KOLLA/morgous
4. <b>Health Nutrition Advisor Agent:</b> Google ADK & Gemini diet advisor. Repo: https://github.com/RUSHI-KOLLA/Health-Nutrition-Agent`,
        
        experience: `<b>PROFESSIONAL EXPERIENCE RECORD:</b>
-------------------------------------------------------------------
<b>Deep Learning Intern | Suvidha Foundation (Feb 2026 - Apr 2026)</b>
* Developed <b>AgroOJS</b>: Multi-scale feature distillation framework for weed detection.
* Distilled YOLOv8l teacher into YOLOv8s student; student surpassed teacher mAP50 by <b>4.1 pp</b>.
* Integrated TensorRT FP16 exports reaching <b>231 FPS</b> at 22.7 MB on edge devices.
* Standardized normalisation scaling and fixed gradient interference bugs.`,
        
        education: `<b>ACADEMIC SUMMARY:</b>
-------------------------------------------------------------------
* <b>B.Tech in Computer Science & Engineering</b> (Expected 2027)
  Reva University, Bengaluru, India
  Coursework: Machine Learning, Data Structures, DBMS, Pattern Recognition
* <b>Intermediate (Class XII)</b> (Passed 2023)
  Narayana Junior College, Andhra Pradesh, India | Score: 81.6%`,
        
        contact: `<b>CONNECT METADATA:</b>
-------------------------------------------------------------------
* <b>Email:</b> kollarushi2006@gmail.com
* <b>Phone:</b> +91-8074323965
* <b>Location:</b> Bengaluru, Karnataka, India
* <b>LinkedIn:</b> linkedin.com/in/kolla-rushikesh-4176232bb/
* <b>GitHub:</b> github.com/RUSHI-KOLLA`,
        
        sudo: `<span style="color:#ff5f56">Permission denied: You are not in the sudoers file. This incident will be reported.</span>`
    };

    if (termBox && termInput && termOutput) {
        // Focus input on terminal box click
        termBox.addEventListener('click', () => {
            termInput.focus();
        });

        // Listen to commands
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const inputValue = termInput.value.trim();
                const command = inputValue.toLowerCase().split(' ')[0];
                
                // Add typed line to output
                const promptLine = document.createElement('div');
                promptLine.className = 'terminal-line';
                promptLine.innerHTML = `<span class="terminal-prompt">visitor@rushi-core:~$</span> ${inputValue}`;
                termOutput.appendChild(promptLine);
                
                // Handle command execution
                if (command !== '') {
                    executeCommand(command);
                }
                
                // Reset input
                termInput.value = '';
                
                // Scroll terminal to bottom
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
        
        if (cmd === 'github' || cmd === 'repos') {
            responseLine.innerHTML = `Opening GitHub profile in a new tab...`;
            termOutput.appendChild(responseLine);
            window.open('https://github.com/RUSHI-KOLLA?tab=repositories', '_blank');
            return;
        }

        if (cmd === 'matrix') {
            runMatrixEffect();
            return;
        }
        
        if (terminalCommands.hasOwnProperty(cmd)) {
            responseLine.innerHTML = terminalCommands[cmd];
        } else {
            responseLine.innerHTML = `<span style="color:#ff5f56">bash: command not found: ${cmd}</span>. Type <span class="cmd-text">help</span> to view lists.`;
        }
        
        termOutput.appendChild(responseLine);
    }

    function runMatrixEffect() {
        termOutput.innerHTML = '';
        const matrixLines = [
            "SYSTEM: INIT CORE CONSOLE RUNNING MATRIX SIMULATION",
            "Loading digital matrix streams...",
            "01001011 01001111 01001100 01001100 01000001 (K O L L A)",
            "01010010 01010101 01010011 01001000 01001001 (R U S H I)",
            "Model parameters load: TensorFlow Core loaded.",
            "Distillation adapters: 1x1 conv dimensions aligned.",
            "AgroOJS: 231 frames per second validated at edge.",
            "VG Intelligence: Debating network convergence: SUCCESS.",
            "VYUHA Relational integrity check: PLpgSQL operational.",
            "STATUS: Connection stable. Rushikesh digital core online."
        ];
        
        let delay = 0;
        matrixLines.forEach(line => {
            setTimeout(() => {
                const ml = document.createElement('div');
                ml.className = 'terminal-line';
                ml.style.color = '#39ff14'; // Matrix Green
                ml.style.textShadow = '0 0 5px rgba(57, 255, 20, 0.4)';
                ml.innerHTML = `&gt;&gt; ${line}`;
                termOutput.appendChild(ml);
                termOutput.scrollTop = termOutput.scrollHeight;
            }, delay);
            delay += 250;
        });
        
        setTimeout(() => {
            const promptReturn = document.createElement('div');
            promptReturn.className = 'terminal-line text-muted';
            promptReturn.innerHTML = `Matrix simulation complete. Core console reset.`;
            termOutput.appendChild(promptReturn);
            termOutput.scrollTop = termOutput.scrollHeight;
        }, delay + 200);
    }


    // ==========================================================================
    // Project Grid Filtering
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active filter styling
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    // Direct layout toggles
                    const cardCat = card.getAttribute('data-category');
                    const categories = cardCat ? cardCat.split(' ') : [];
                    if (filterValue === 'all' || categories.includes(filterValue) || card.classList.contains('git-cta-card')) {
                        card.classList.remove('hidden');
                        // Small micro-fade in
                        card.style.opacity = 0;
                        setTimeout(() => { card.style.opacity = 1; }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }


    // ==========================================================================
    // Scroll Reveal Intersection Observer
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // If this is the skills section, animate progress bars
                    if (entry.target.id === 'skills') {
                        animateSkillsProgress(entry.target);
                    }
                    
                    observer.unobserve(entry.target); // Trigger once
                }
            });
        }, {
            root: null,
            threshold: 0.12, // Trigger when 12% is visible
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }

    function animateSkillsProgress(skillsSection) {
        const bars = skillsSection.querySelectorAll('.skill-progress');
        bars.forEach(bar => {
            const width = bar.style.width; // Grab static width from style tag
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Fallback: If intersection observer is not active, trigger animations manually
    setTimeout(() => {
        const heroSection = document.getElementById('hero');
        if (heroSection) heroSection.classList.add('revealed');
    }, 100);


    // ==========================================================================
    // Contact Form Submission & Mock Backend
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const formStatus = document.getElementById('form-status-msg');

    if (contactForm && submitBtn && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get inputs
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();
            
            // Reset status styles
            formStatus.className = 'form-status';
            formStatus.textContent = '';
            
            // Change button state to loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending Core Transmission... <span class="blink">.</span><span class="blink" style="animation-delay: 0.2s">.</span><span class="blink" style="animation-delay: 0.4s">.</span>';
            
            // Simulate API Request (1.8s latency)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';
                
                // Form response simulation
                formStatus.classList.add('success');
                formStatus.textContent = `Transmission received! Thank you, ${name}. I will contact you shortly.`;
                
                // Clear fields
                contactForm.reset();
            }, 1800);
        });
    }
});
