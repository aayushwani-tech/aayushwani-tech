document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     CYBERPUNK HACKING ACCESS INTERFACE CONTROLLER
     ========================================================================== */
  const hackingAccess = document.getElementById('hackingAccess');
  const visitorInput = document.getElementById('visitorKeyInput');
  const decryptBtn = document.getElementById('decryptBtn');
  const consoleLogs = document.getElementById('consoleLogs');
  const holoCore = document.getElementById('holoCore');
  const matrixCanvas = document.getElementById('matrixCanvas');
  
  let visitorName = '';
  
  // 1. Matrix Code Rain Backdrop Animation
  if (matrixCanvas) {
    const ctx = matrixCanvas.getContext('2d');
    
    const resizeCanvas = () => {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = "0101010101110010100101010111110001011C_C++_BINARY_NMIMS_SECURITY_OVERRIDE";
    const charArray = chars.split("");
    const fontSize = 13;
    let columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.15)';
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      
      ctx.fillStyle = 'rgba(255, 90, 0, 0.35)'; // Amber glowing code rain
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const matrixInterval = setInterval(drawMatrix, 35);
    
    if (hackingAccess) {
      hackingAccess.addEventListener('transitionend', () => {
        if (hackingAccess.classList.contains('fade-out')) {
          clearInterval(matrixInterval);
        }
      });
    }
  }

  // 2. Run Decryption Logging Sequence
  const runDecryptionSequence = (name) => {
    visitorName = name.trim();
    if (!visitorName) visitorName = 'Guest';
    
    localStorage.setItem('aayush_portfolio_visitor', visitorName);
    
    if (visitorInput) visitorInput.disabled = true;
    if (decryptBtn) decryptBtn.disabled = true;
    
    // Speed up the 3D hologram spin rotation
    if (holoCore) {
      holoCore.style.animation = 'spinHoloCore 1.5s infinite cubic-bezier(0.55, 0.085, 0.68, 0.53)';
    }
    
    
    
    const logRows = [
      { text: `guest@wani-sec:~$ ./decrypt --auth --user="${visitorName}"`, type: 'cmd' },
      { text: `[FIREWALL] Requesting node override clearance...`, type: 'info' },
      { text: `[SECURITY] Decrypting database hashes: NMIMS_SHIRPUR... [SUCCESS]`, type: 'alert' },
      { text: `[INFO] Parsing CS fundamentals, pointer arrays & logic units...`, type: 'info' },
      { text: `[BYPASS] Disabling secondary stack filtration filters...`, type: 'alert' },
      { text: `[SUCCESS] Decrypted core portfolio. Connection secure.`, type: 'success' }
    ];
    
    let currentLogIndex = 0;
    if (consoleLogs) {
      consoleLogs.innerHTML = '';
    }
    
    const printNextLogRow = () => {
      if (currentLogIndex < logRows.length) {
        const log = logRows[currentLogIndex];
        const logEl = document.createElement('div');
        logEl.className = `log-row ${log.type}`;
        logEl.textContent = log.text;
        if (consoleLogs) {
          consoleLogs.appendChild(logEl);
          consoleLogs.scrollTop = consoleLogs.scrollHeight;
        }
        currentLogIndex++;
        
        setTimeout(printNextLogRow, 300 + Math.random() * 200);
      } else {
        setTimeout(() => {
          if (hackingAccess) {
            hackingAccess.classList.add('fade-out');
          }
          
          const badgeText = document.getElementById('heroBadgeText');
          if (badgeText) {
            badgeText.textContent = `Welcome, ${visitorName}! Available for projects & learning`;
          }
          
          const heroReveals = document.querySelectorAll('.hero-section .reveal-on-scroll');
          heroReveals.forEach(el => el.classList.add('revealed'));
          
          setTimeout(() => {
            if (hackingAccess) {
              hackingAccess.remove();
            }
          }, 1200);
        }, 500);
      }
    };
    
    printNextLogRow();
  };
  
  const savedVisitor = localStorage.getItem('aayush_portfolio_visitor');
  if (savedVisitor && visitorInput) {
    visitorInput.value = savedVisitor;
  }
  
  if (decryptBtn) {
    decryptBtn.addEventListener('click', () => {
      const val = visitorInput ? visitorInput.value : '';
      runDecryptionSequence(val);
    });
  }
  
  if (visitorInput) {
    visitorInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runDecryptionSequence(visitorInput.value);
      }
    });
  }


  
  /* ==========================================================================
     SCROLL PROGRESS & HEADER SCROLL EFFECT
     ========================================================================== */
  const header = document.querySelector('.header');
  const scrollProgress = document.getElementById('scrollProgress');
  
  const handleScroll = () => {
    // Header Compact Transition
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Scroll Progress Bar Update
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const percentage = (window.scrollY / totalScroll) * 100;
      scrollProgress.style.width = `${percentage}%`;
    } else {
      scrollProgress.style.width = '0%';
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger immediately to check initial state

  /* ==========================================================================
     TYPEWRITER ROTATOR FOR HERO SUBTITLE
     ========================================================================== */
  const typewriterText = document.getElementById('typewriterText');
  const words = ['CS Fundamentals', 'C Programming'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  const type = () => {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typewriterText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  };
  
  setTimeout(type, 1000);

  /* ==========================================================================
     SIMULATED TERMINAL SERVER LOGS
     ========================================================================== */
  const terminalLogs = document.getElementById('terminalLogs');
  const logLines = [
    { type: 'command', text: '> python -m venv env' },
    { type: 'info', text: '> Virtual environment path initialised.' },
    { type: 'command', text: '> pip install -r requirements.txt' },
    { type: 'output', text: 'Collecting packages... [numpy, pandas, request]' },
    { type: 'output', text: 'Installing collected packages... [OK]' },
    { type: 'info', text: '> System dependencies setup: successful.' },
    { type: 'command', text: '> gcc main.c -o app' },
    { type: 'output', text: 'Compiling main.c with low-level pointer checks...' },
    { type: 'info', text: '> Compilation finished. Build: successful.' },
    { type: 'command', text: '> ./app' },
    { type: 'output', text: 'Hello, NMIMS Shirpur! App active.' },
    { type: 'info', text: '> Network connection rate: 142ms' },
    { type: 'info', text: '> System uptime status: 99.99%' },
    { type: 'command', text: '> git push origin main' },
    { type: 'output', text: 'Everything up-to-date.' }
  ];
  
  let logIndex = 0;
  
  const addTerminalLog = () => {
    if (logIndex >= logLines.length) {
      terminalLogs.innerHTML = `
        <div class="log-line output">> System boot successful. [OK]</div>
        <div class="log-line info">> NMIMS Shirpur Server connection status: active</div>
        <div class="log-line command">> npm run dev</div>
      `;
      logIndex = 0;
    }
    
    const log = logLines[logIndex];
    if (terminalLogs) {
      const logEl = document.createElement('div');
      logEl.className = `log-line ${log.type}`;
      logEl.textContent = log.text;
      terminalLogs.appendChild(logEl);
      terminalLogs.scrollTop = terminalLogs.scrollHeight;
    }
    logIndex++;
    
    const nextDelay = Math.random() * 2000 + 1500;
    setTimeout(addTerminalLog, nextDelay);
  };
  
  setTimeout(addTerminalLog, 2500);

  /* ==========================================================================
     MOBILE NAVIGATION MENU
     ========================================================================== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const iconMenu = navToggle.querySelector('.icon-menu');
  const iconClose = navToggle.querySelector('.icon-close');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    if (isOpen) {
      iconMenu.classList.add('hidden');
      iconClose.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Disable scroll when menu is open
    } else {
      iconMenu.classList.remove('hidden');
      iconClose.classList.add('hidden');
      document.body.style.overflow = ''; // Re-enable scroll
    }
  };

  const closeMenu = () => {
    navMenu.classList.remove('open');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', toggleMenu);
  
  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ==========================================================================
     INTERSECTION OBSERVER FOR SCROLL REVEAL
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after revealing to prevent repetitive animation triggers
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is in full view
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     ACTIVE NAVIGATION LINK TRACKER
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  const navLinksTracker = document.querySelectorAll('.nav-link');

  const updateActiveNavLink = () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // Offset for fixed nav header
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinksTracker.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}` || (currentSectionId === 'top' && href === '#top')) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  /* ==========================================================================
     SIMULATED RESUME DOWNLOAD
     ========================================================================== */
  const resumeDownload = document.getElementById('resumeDownload');
  resumeDownload.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Thank you for your interest! In the live environment, your CV/Resume will begin downloading here.");
  });

  /* ==========================================================================
     CONTACT FORM HANDLING
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = contactForm.querySelector('.submit-btn');
  const submitBtnText = submitBtn.querySelector('span');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtnText.textContent = 'Sending Message...';
    formStatus.className = 'form-status hidden';

    // Get form data
    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const message = document.getElementById('formMessage').value;

    // Simulate sending email (async delay of 1.5s)
    setTimeout(() => {
      // Basic validation check
      if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        formStatus.textContent = 'Please fill out all fields.';
        formStatus.className = 'form-status error';
        submitBtn.disabled = false;
        submitBtnText.textContent = 'Send Message';
        return;
      }

      // Success feedback
      formStatus.textContent = `Thanks, ${name}! Your message was simulated successfully. You can also reach me directly at aayushwani136@gmail.com!`;
      formStatus.className = 'form-status success';
      
      // Reset form fields
      contactForm.reset();
      
      // Reset button state
      submitBtn.disabled = false;
      submitBtnText.textContent = 'Send Message';

      // Automatically hide status after 6 seconds
      setTimeout(() => {
        formStatus.className = 'form-status hidden';
      }, 6000);

    }, 1500);
  });

  /* ==========================================================================
     3D TILT EFFECT FOR GLASS CARDS
     ========================================================================== */
  const cards = document.querySelectorAll('.glass-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      card.style.transition = 'transform 0.1s ease-out, border-color 0.4s ease, box-shadow 0.4s ease';
      
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      const mouseX = e.clientX - cardRect.left - cardWidth / 2;
      const mouseY = e.clientY - cardRect.top - cardHeight / 2;
      
      const rotateX = -(mouseY / (cardHeight / 2)) * 10;
      const rotateY = (mouseX / (cardWidth / 2)) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.01)`;
      
      const shineX = (e.clientX - cardRect.left) / cardWidth * 100;
      const shineY = (e.clientY - cardRect.top) / cardHeight * 100;
      card.style.setProperty('--shine-x', `${shineX}%`);
      card.style.setProperty('--shine-y', `${shineY}%`);
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    });
  });

  /* ==========================================================================
     DYNAMIC CURSOR BACKDROP GLOW ANIMATION
     ========================================================================== */
  const cursorGlow = document.getElementById('cursorGlow');
  
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  /* ==========================================================================
     INTERACTIVE CODE TABS (ABOUT SECTION)
     ========================================================================== */
  const codeTabs = document.querySelectorAll('.code-tab');
  
  codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      
      // Deactivate all tabs
      codeTabs.forEach(t => t.classList.remove('active'));
      // Activate clicked tab
      tab.classList.add('active');
      
      // Hide all panes
      const panes = document.querySelectorAll('.tab-pane');
      panes.forEach(pane => pane.classList.remove('active'));
      
      // Show targeted pane
      const targetPane = document.getElementById(`tab-${tabName}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     INTERACTIVE PARTICLES CANVAS SYSTEM
     ========================================================================== */
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  const particles = [];
  const particleCount = 45;
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 1;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 90, 0, 0.45)';
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  let mouse = { x: null, y: null };
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  document.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  const animateParticles = () => {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    // Connect particles with lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 90, 0, ${0.15 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      
      // Connect to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 0, 102, ${0.25 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animateParticles);
  };
  
  animateParticles();

  /* ==========================================================================
     TEXT SCRAMBLE DECODE EFFECT
     ========================================================================== */
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameId);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="scramble-char" style="color:var(--primary); font-family:monospace; font-weight:700;">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameId = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  const scrambleElements = document.querySelectorAll('.scramble-text');
  scrambleElements.forEach(el => {
    const originalText = el.innerText;
    const fx = new TextScramble(el);
    let isScrambling = false;
    
    el.addEventListener('mouseenter', () => {
      if (isScrambling) return;
      isScrambling = true;
      fx.setText(originalText).then(() => {
        isScrambling = false;
      });
    });
  });

});
