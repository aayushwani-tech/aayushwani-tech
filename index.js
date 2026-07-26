document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     CYBERPUNK HACKING ACCESS INTERFACE CONTROLLER (3D DNA HELIX THEME)
     ========================================================================== */
  const hackingAccess = document.getElementById('hackingAccess');
  const visitorInput = document.getElementById('visitorKeyInput');
  const visitorSapInput = document.getElementById('visitorSapInput');
  const decryptBtn = document.getElementById('decryptBtn');
  const consoleLogs = document.getElementById('consoleLogs');
  const matrixCanvas = document.getElementById('matrixCanvas');
  const canvas3D = document.getElementById('preloaderCanvas3D');

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
      ctx.fillStyle = 'rgba(6, 6, 9, 0.12)';
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      ctx.font = `bold ${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        ctx.fillStyle = 'rgba(255, 220, 180, 0.98)'; // Cyberpunk orange matrix rain
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgb(255, 106, 43)';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        ctx.fillStyle = Math.random() > 0.25 ? 'rgba(255, 90, 95, 0.55)' : 'rgba(255, 45, 122, 0.4)';
        ctx.shadowBlur = 2;
        ctx.fillText(text, i * fontSize, (drops[i] - 1) * fontSize);
        
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.972) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      ctx.shadowBlur = 0;
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

  // 2. 3D Holographic DNA Helix Preloader
  let autoRotateSpeed = 0.015;
  let isExploding = false;
  const points = [];
  const links = [];

  if (canvas3D) {
    document.body.classList.add('preloader-active');
    const ctx = canvas3D.getContext('2d');
    let rect = canvas3D.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas3D.width = (rect.width || 140) * dpr;
    canvas3D.height = (rect.height || 140) * dpr;
    ctx.scale(dpr, dpr);
    
    let cssCw = rect.width || 140;
    let cssCh = rect.height || 140;
    
    window.addEventListener('resize', () => {
      rect = canvas3D.getBoundingClientRect();
      const rDpr = window.devicePixelRatio || 1;
      canvas3D.width = (rect.width || 140) * rDpr;
      canvas3D.height = (rect.height || 140) * rDpr;
      const rCtx = canvas3D.getContext('2d');
      rCtx.scale(rDpr, rDpr);
      cssCw = rect.width || 140;
      cssCh = rect.height || 140;
    });

    let angleX = -0.15;
    let angleY = 0.3;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let autoRotate = true;

    // Generate 3D DNA Helix strands
    const numPoints = 26; // number of rungs along the helix
    const helixHeight = 110;
    const helixRadius = 24;
    
    for (let i = 0; i < numPoints; i++) {
      const ratio = i / (numPoints - 1);
      const y = ratio * helixHeight - (helixHeight / 2);
      const angle = ratio * Math.PI * 3.5; // 1.75 full rotations
      
      // Strand A (Purple)
      const xa = Math.cos(angle) * helixRadius;
      const za = Math.sin(angle) * helixRadius;
      points.push({
        x: xa, y: y, z: za,
        type: 'strandA',
        vx: 0, vy: 0, vz: 0,
        color: 'rgba(255, 106, 43, 0.95)'
      });
      
      // Strand B (Pink)
      const xb = Math.cos(angle + Math.PI) * helixRadius;
      const zb = Math.sin(angle + Math.PI) * helixRadius;
      points.push({
        x: xb, y: y, z: zb,
        type: 'strandB',
        vx: 0, vy: 0, vz: 0,
        color: 'rgba(255, 45, 122, 0.95)'
      });
      
      const idxA = points.length - 2;
      const idxB = points.length - 1;
      
      // Connect base rungs (horizontal ladders)
      links.push({ p1: idxA, p2: idxB, type: 'rung' });
      
      // Connect vertical backbone strands
      if (i > 0) {
        const prevIdxA = idxA - 2;
        const prevIdxB = idxB - 2;
        links.push({ p1: prevIdxA, p2: idxA, type: 'backboneA' });
        links.push({ p1: prevIdxB, p2: idxB, type: 'backboneB' });
      }
    }

    // Projection calculation
    const project = (x, y, z) => {
      const x1 = x * Math.cos(angleY) - z * Math.sin(angleY);
      const z1 = x * Math.sin(angleY) + z * Math.cos(angleY);
      const y2 = y * Math.cos(angleX) - z1 * Math.sin(angleX);
      const z2 = y * Math.sin(angleX) + z1 * Math.cos(angleX);
      
      const fov = 180;
      const cameraDist = 200;
      const scale = fov / (cameraDist + z2);
      
      return {
        x: cssCw / 2 + x1 * scale,
        y: cssCh / 2 + y2 * scale,
        scale: scale,
        z: z2
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, cssCw, cssCh);
      
      if (autoRotate && !isDragging && !isExploding) {
        angleY += autoRotateSpeed;
        angleX = Math.sin(angleY * 0.3) * 0.1 - 0.05;
      }

      if (isExploding) {
        points.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          p.vx *= 1.02;
          p.vy *= 1.02;
          p.vz *= 1.02;
        });
      }

      const projected = points.map(p => ({
        proj: project(p.x, p.y, p.z),
        orig: p
      }));

      // Sort nodes back-to-front
      projected.sort((a, b) => b.proj.z - a.proj.z);

      // Render wireframe links
      links.forEach(link => {
        const pt1 = points[link.p1];
        const pt2 = points[link.p2];
        const p1 = project(pt1.x, pt1.y, pt1.z);
        const p2 = project(pt2.x, pt2.y, pt2.z);
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        
        const avgScale = (p1.scale + p2.scale) / 2;
        const alpha = Math.max(0.06, 0.45 * (avgScale / 1.15));
        
        if (link.type === 'rung') {
          // base rungs connect A (purple) and B (pink)
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, `rgba(255, 106, 43, ${alpha * 0.55})`);
          grad.addColorStop(1, `rgba(255, 45, 122, ${alpha * 0.55})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.1;
        } else if (link.type === 'backboneA') {
          ctx.strokeStyle = `rgba(255, 90, 95, ${alpha * 1.5})`;
          ctx.lineWidth = 1.35;
        } else {
          ctx.strokeStyle = `rgba(255, 90, 95, ${alpha * 1.5})`;
          ctx.lineWidth = 1.35;
        }
        ctx.stroke();
      });

      // Render nodes
      projected.forEach(item => {
        const { x, y, scale } = item.proj;
        const p = item.orig;
        
        ctx.beginPath();
        const size = Math.max(0.8, 2.5 * scale);
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        if (scale > 1.1) {
          ctx.beginPath();
          ctx.arc(x, y, size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace('0.95', '0.15');
          ctx.fill();
        }
      });

      requestAnimationFrame(render);
    };

    render();
  }

  // 3. Run Decryption Logging Sequence
  const runDecryptionSequence = () => {
    let name = visitorInput ? visitorInput.value.trim() : '';
    let sapId = visitorSapInput ? visitorSapInput.value.trim() : '';
    
    if (!name) {
      playSound('error');
      const nameWrapper = visitorInput ? visitorInput.closest('.terminal-command-line') : null;
      if (nameWrapper) {
        nameWrapper.style.borderColor = '#ef4444';
        nameWrapper.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.4)';
        
        const consoleCard = document.querySelector('.hacking-console-card');
        if (consoleCard) {
          consoleCard.classList.remove('shake-animation');
          void consoleCard.offsetWidth; // Trigger reflow to restart animation
          consoleCard.classList.add('shake-animation');
        }
        
        setTimeout(() => {
          nameWrapper.style.borderColor = '';
          nameWrapper.style.boxShadow = '';
        }, 1500);
      }
      if (visitorInput) visitorInput.focus();
      return; // Stop access when name is blank
    }
    
    if (!sapId) sapId = 'Not Provided';
    
    visitorName = name;
    localStorage.setItem('aayush_portfolio_visitor', visitorName);
    
    // Trigger Discord Webhook Notification with both fields (Optional)
    const discordWebhookUrl = 'YOUR_DISCORD_WEBHOOK_URL';
    if (discordWebhookUrl && discordWebhookUrl !== 'YOUR_DISCORD_WEBHOOK_URL') {
      fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: "🎯 New Portfolio Visitor",
            color: 16738304,
            fields: [
              { name: "Name", value: visitorName, inline: true },
              { name: "SAP ID", value: sapId, inline: true },
              { name: "Time", value: new Date().toLocaleString(), inline: true }
            ],
            footer: { text: "Wani-Sec Authentication System" }
          }]
        })
      }).catch(err => console.error('Webhook notification failed:', err));
    }

    if (visitorInput) visitorInput.disabled = true;
    if (visitorSapInput) visitorSapInput.disabled = true;
    if (decryptBtn) decryptBtn.disabled = true;
    
    if (consoleLogs) {
      consoleLogs.style.display = 'block';
    }
    
    // Speed up the 3D core spin speed dynamically!
    autoRotateSpeed = 0.08;

    const logRows = [
      { text: `guest@wani-sec:~$ ./decrypt --user="${name}" --sap="${sapId}"`, type: 'cmd' },
      { text: `[GENETICS] Initiating biometric DNA sequence check...`, type: 'info' },
      { text: `[BIOMETRIC] Verifying sequence matching for user: ${name}...`, type: 'alert' },
      { text: `[DATABASE] Reading credential metadata keys... [SUCCESS]`, type: 'info' },
      { text: `[SUCCESS] Decrypted core portfolio. Biometrics verified.`, type: 'success' }
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
        
        setTimeout(printNextLogRow, 220 + Math.random() * 120);
      } else {
        // Trigger preloader particle explosion (split DNA strands!)
        isExploding = true;
        points.forEach(p => {
          if (p.type === 'strandA') {
            p.vx = 6.8;
            p.vy = (Math.random() - 0.5) * 4;
            p.vz = (Math.random() - 0.5) * 4;
          } else {
            p.vx = -6.8;
            p.vy = (Math.random() - 0.5) * 4;
            p.vz = (Math.random() - 0.5) * 4;
          }
        });

        setTimeout(() => {
          playSound('success');
          if (hackingAccess) {
            hackingAccess.classList.add('fade-out');
          }
          
          const visitorNameBadge = document.getElementById('visitorNameBadge');
          if (visitorNameBadge) {
            visitorNameBadge.textContent = visitorName;
          }
          const arcVisitorName = document.getElementById('arcVisitorName');
          if (arcVisitorName) {
            arcVisitorName.textContent = visitorName;
          }
          const terminalVisitorName = document.getElementById('terminalVisitorName');
          if (terminalVisitorName) {
            terminalVisitorName.textContent = visitorName;
          }
          
          const heroReveals = document.querySelectorAll('.hero-section .reveal-on-scroll');
          heroReveals.forEach(el => el.classList.add('revealed'));
          
          setTimeout(() => {
            if (hackingAccess) {
              hackingAccess.remove();
              document.body.classList.remove('preloader-active');
            }
          }, 1200);
        }, 550);
      }
    };
    
    printNextLogRow();
  };

  const savedVisitor = localStorage.getItem('aayush_portfolio_visitor');
  if (savedVisitor) {
    if (visitorInput) visitorInput.value = savedVisitor;
    
    const visitorNameBadge = document.getElementById('visitorNameBadge');
    if (visitorNameBadge) visitorNameBadge.textContent = savedVisitor;
    
    const arcVisitorName = document.getElementById('arcVisitorName');
    if (arcVisitorName) arcVisitorName.textContent = savedVisitor;
    
    const terminalVisitorName = document.getElementById('terminalVisitorName');
    if (terminalVisitorName) terminalVisitorName.textContent = savedVisitor;
  }
  
  if (decryptBtn) {
    decryptBtn.addEventListener('click', runDecryptionSequence);
  }
  
  if (visitorInput) {
    visitorInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runDecryptionSequence();
      }
    });
  }

  if (visitorSapInput) {
    visitorSapInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runDecryptionSequence();
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
  const contactConsole = document.getElementById('contactConsole');
  const contactConsoleLogs = document.getElementById('contactConsoleLogs');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const message = document.getElementById('formMessage').value;

    // Basic validation check
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      alert('Please fill out all fields.');
      return;
    }

    // Hide standard form, reveal security console
    contactForm.style.display = 'none';
    contactConsole.classList.remove('hidden');
    contactConsoleLogs.innerHTML = '';

    const logRows = [
      { text: `guest@wani-sec:~$ send_message --auth --user="${name}"`, type: 'cmd' },
      { text: `[INFO] Initializing secure handshake with relay...`, type: 'info' },
      { text: `[INFO] Authenticating sender client: <${email}>`, type: 'info' },
      { text: `[SECURITY] Packaging stream data with RSA-4096 encryption... [OK]`, type: 'alert' },
      { text: `[TRANSMISSION] Routing data packet through secure stack layers...`, type: 'info' },
      { text: `[SUCCESS] Message successfully delivered to Aayush Wani!`, type: 'success' },
      { text: `[INFO] Secure log node offline. Connection terminated.`, type: 'info' }
    ];

    let currentLogIndex = 0;
    const printNextLogRow = () => {
      if (currentLogIndex < logRows.length) {
        const log = logRows[currentLogIndex];
        const logEl = document.createElement('div');
        logEl.className = `log-row ${log.type}`;
        logEl.textContent = log.text;
        contactConsoleLogs.appendChild(logEl);
        contactConsoleLogs.scrollTop = contactConsoleLogs.scrollHeight;
        currentLogIndex++;
        
        setTimeout(printNextLogRow, 300 + Math.random() * 200);
      } else {
        // Show button to reset form and write another message
        setTimeout(() => {
          const resetBtn = document.createElement('button');
          resetBtn.className = 'btn btn-secondary btn-small mt-4';
          resetBtn.style.alignSelf = 'flex-start';
          resetBtn.innerHTML = '<span>Send Another Message</span>';
          resetBtn.addEventListener('click', () => {
            contactConsole.classList.add('hidden');
            contactForm.reset();
            contactForm.style.display = 'block';
          });
          contactConsoleLogs.appendChild(resetBtn);
          contactConsoleLogs.scrollTop = contactConsoleLogs.scrollHeight;
        }, 600);
      }
    };

    printNextLogRow();
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
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.5 + 1;
    }
    
    update() {
      // Magnetic pull to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180) {
          const force = (180 - dist) / 180;
          const angle = Math.atan2(dy, dx);
          
          // Pull particles gently towards cursor
          this.x += Math.cos(angle) * force * 0.75;
          this.y += Math.sin(angle) * force * 0.75;
        }
      }

      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }
    
    draw() {
      ctx.beginPath();
      
      // Proximity visual swell and pink color morph
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 140) {
          const ratio = 1 - dist / 140;
          ctx.arc(this.x, this.y, this.radius * (1 + ratio * 0.6), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 0, 102, ${0.45 + ratio * 0.45})`;
          ctx.fill();
          return;
        }
      }
      
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 106, 43, 0.45)';
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
          ctx.strokeStyle = `rgba(255, 106, 43, ${0.15 * (1 - dist / 100)})`;
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

  /* ==========================================================================
     3D INTERACTIVE TILT FOR SKILL CARDS
     ========================================================================== */
  const skillCards = document.querySelectorAll('.skill-card, .interest-card');
  
  skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  /* ==========================================================================
     WEB AUDIO SYNTH ENGINE (SAHIL STYLE HUD SOUND EFFECTS)
     ========================================================================== */
  const playSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const audioCtx = new AudioContext();
      
      if (type === 'hover') {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1900, audioCtx.currentTime);
        
        gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
      } else if (type === 'click') {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(950, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1450, audioCtx.currentTime + 0.08);
        
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } else if (type === 'success') {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(780, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1650, audioCtx.currentTime + 0.18);
        
        gainNode.gain.setValueAtTime(0.045, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.18);
      } else if (type === 'error') {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, audioCtx.currentTime);
        
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.28);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.28);
      }
    } catch (err) {
      console.warn('Audio play failure:', err);
    }
  };
  window.playSound = playSound;

  // Bind global hover and click sound generators to document elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, input, textarea, select, .glass-card, .btn, .decrypt-btn, .nav-link, .logo');
    if (target && target !== window.lastHoveredElement) {
      playSound('hover');
      window.lastHoveredElement = target;
    }
    if (!target) {
      window.lastHoveredElement = null;
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, input, textarea, select, .glass-card, .btn, .decrypt-btn, .nav-link, .logo');
    if (target) {
      playSound('click');
    }
  });

  /* ==========================================================================
     CUSTOM CYBER CURSOR MOUSE MOVEMENT
     ========================================================================== */
  const customCursor = document.getElementById('customCursor');
  if (customCursor) {
    document.addEventListener('mousemove', (e) => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
      customCursor.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
      customCursor.classList.remove('active');
    });

    // Shrink/expand state on hover elements
    const updateInteractiveListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, select, .glass-card, .btn, .decrypt-btn, .nav-link, .logo');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'));
      });
    };
    updateInteractiveListeners();
    // Re-check periodically for dynamically injected elements
    setInterval(updateInteractiveListeners, 2000);
  }

  /* ==========================================================================
     SCROLL PROGRESS BAR SYNC
     ========================================================================== */
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = scrolled + '%';
    });
  }

});
