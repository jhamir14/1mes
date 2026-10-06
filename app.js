/* ==========================================================================
   Dedicatoria Dulce - Romantic Pink & Red Love Engine
   ========================================================================== */

(function () {
  'use strict';

  // Config & Start Date (Default: 1 Year Ago, customizable)
  const DULCE_CONFIG = {
    name: 'Para Dulce ❤️',
    subtitle: 'Feliz Aniversario Mi Amor 🌹',
    message: 'Gracias por este hermoso tiempo juntos. Cada estrella en el universo brilla solo para ti ✨',
    startDate: new Date('2026-09-06T00:00:00') // Relationship anniversary start date (06/09/2026)
  };

  const PINK_RED_PALETTE = {
    primary: '#ff0054',   // Hot Pink
    secondary: '#ff4d6d', // Rose Pink
    glow: '#ff758f',      // Pink Glow
    accent: 'rgba(255, 0, 84, 0.88)',
    soft: 'rgba(255, 77, 109, 0.35)',
    deepRed: '#c9184a'
  };

  // Romantic Phrases for Orbit Animation around Central Heart
  const ROMANTIC_PHRASES = [
    "Eres mi lugar favorito ❤️",
    "Feliz Aniversario Dulce 🌹",
    "Te amo hoy y siempre ✨",
    "Mi persona favorita 🥰",
    "Siempre juntos 💫",
    "Tú y yo por siempre 💖",
    "Eres mi universo 🌌",
    "Mi pedacito de cielo 🌸",
    "Gracias por existir 💌",
    "Mi dulce amor 💕",
    "Amor de mi vida 💘",
    "Cada segundo contigo es mágico ⏱️"
  ];

  // Compliments for Compliment Generator
  const REASONS_LIST = [
    "Eres mi lugar favorito en todo el universo ❤️",
    "Amo la forma en que sonríes y haces que mi día sea perfecto 🌹",
    "Cada segundo a tu lado es un regalo inolvidable ✨",
    "Tus abrazos son mi refugio más cálido y seguro 🥰",
    "Eres la persona más hermosa por dentro y por fuera 💖",
    "Gracias por llenar mi vida de amor y risas incondicionales 🌸",
    "Si me dieran a elegir mil veces, mil veces te elegiría a ti 💫",
    "Eres mi sueño hecho realidad todos los días de mi vida 💘",
    "Me haces la persona más feliz con solo mirar tus hermosos ojos 💌",
    "Tenerte a mi lado es la mayor bendición de mi mundo 🥂"
  ];

  // Canvas & Physics Variables
  const canvas = document.getElementById('space-canvas');
  const ctx = canvas.getContext('2d');
  let width, height, centerX, centerY;
  let heartPoints = [];
  let particlesOnHeart = [];
  let animTime = 0;
  let animationFrameId = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    centerX = width / 2;
    centerY = height / 2 - 10;
    generateHeartPoints();
  }

  // Calculate coordinates for heart curve equation
  function getHeartPos(t, scaleMult = 1.0) {
    const scale = (Math.min(width, height) / 34) * scaleMult;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return {
      x: centerX + x * scale,
      y: centerY + y * scale
    };
  }

  // Generate Points forming a Heart outline and path particles
  function generateHeartPoints() {
    heartPoints = [];
    const pointsCount = 100;

    for (let i = 0; i < pointsCount; i++) {
      const t = (i / pointsCount) * Math.PI * 2;
      heartPoints.push(getHeartPos(t));
    }

    // Initialize light particles traveling along the heart path
    particlesOnHeart = [];
    for (let i = 0; i < 30; i++) {
      particlesOnHeart.push({
        progress: Math.random(),
        speed: 0.0012 + Math.random() * 0.0018,
        size: 2 + Math.random() * 2.5,
        alpha: 0.6 + Math.random() * 0.4
      });
    }
  }

  // Helper to trace explicit heart path for fill and stroke layers
  function traceHeartPath(scaleMult) {
    ctx.beginPath();
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const pos = getHeartPos(t, scaleMult);
      if (i === 0) ctx.moveTo(pos.x, pos.y);
      else ctx.lineTo(pos.x, pos.y);
    }
    ctx.closePath();
  }

  // Draw romantic animated glowing heart shape and ambient starfield
  function renderScene() {
    ctx.clearRect(0, 0, width, height);
    animTime += 0.02;

    const pulseScale = 1.0 + Math.sin(animTime * 1.8) * 0.025; // Subtle heartbeat pulse

    // 1. Static ambient stars with gentle twinkling
    ctx.shadowBlur = 0;
    for (let i = 0; i < 40; i++) {
      const sx = (Math.sin(i * 77) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 41) * 0.5 + 0.5) * height;
      const twinkle = Math.sin(animTime * 1.5 + i) * 0.3 + 0.7;
      const size = (i % 3 === 0) ? 2.2 : 1.2;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? PINK_RED_PALETTE.secondary : 'rgba(255, 255, 255, 0.8)';
      ctx.globalAlpha = 0.45 * twinkle;
      ctx.fill();
    }

    // 2. Soft Inner Heart Fill Glow
    ctx.globalAlpha = 1.0;
    traceHeartPath(pulseScale);
    const heartFillGrad = ctx.createRadialGradient(centerX, centerY - 15, 10, centerX, centerY - 15, Math.min(width, height) * 0.38);
    heartFillGrad.addColorStop(0, 'rgba(255, 0, 84, 0.22)');
    heartFillGrad.addColorStop(0.5, 'rgba(201, 24, 74, 0.12)');
    heartFillGrad.addColorStop(1, 'rgba(13, 2, 8, 0)');
    ctx.fillStyle = heartFillGrad;
    ctx.fill();

    // 3. Thick Neon Glow Stroke (Layer 1 - Wide Outer Glow)
    ctx.shadowColor = '#ff0054';
    ctx.shadowBlur = 24;
    ctx.strokeStyle = '#ff0054';
    ctx.lineWidth = 6;
    traceHeartPath(pulseScale);
    ctx.stroke();

    // 4. Bright Rose Pink Main Line (Layer 2 - Connecting line)
    ctx.shadowColor = '#ff758f';
    ctx.shadowBlur = 12;
    ctx.strokeStyle = '#ff4d6d';
    ctx.lineWidth = 3.5;
    traceHeartPath(pulseScale);
    ctx.stroke();

    // 5. Bright Core White Line (Layer 3 - High Contrast Sharp Line)
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 6;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.8;
    traceHeartPath(pulseScale);
    ctx.stroke();

    // 6. Glowing Node Points along the Connected Line
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#ff0054';
    const pointCount = 36;
    for (let i = 0; i < pointCount; i++) {
      const t = (i / pointCount) * Math.PI * 2;
      const pos = getHeartPos(t, pulseScale);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? '#ffffff' : '#ff4d6d';
      ctx.globalAlpha = 1.0;
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(renderScene);
  }

  function initParticles() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    renderScene();
  }

  // Live Counter Update Engine
  function updateLiveCounter() {
    const now = new Date();
    const diff = Math.max(0, now - DULCE_CONFIG.startDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    const heroPillText = `⏱️ ${days} Días, ${hours}h ${mins}m ${secs}s Juntos ❤️`;
    const heroPillEl = document.getElementById('hero-time-string');
    if (heroPillEl) heroPillEl.innerText = heroPillText;

    const cntDays = document.getElementById('cnt-days');
    const cntHours = document.getElementById('cnt-hours');
    const cntMins = document.getElementById('cnt-mins');
    const cntSecs = document.getElementById('cnt-secs');

    if (cntDays) cntDays.innerText = days;
    if (cntHours) cntHours.innerText = String(hours).padStart(2, '0');
    if (cntMins) cntMins.innerText = String(mins).padStart(2, '0');
    if (cntSecs) cntSecs.innerText = String(secs).padStart(2, '0');
  }

  // Instant Clean Text Display
  function typeWriterMessage(text) {
    const msgElement = document.getElementById('display-message');
    if (msgElement) msgElement.innerText = text;
  }

  // Advanced Romantic Audio Engine
  let audioCtx = null;
  let audioPlaying = false;
  let arpeggioTimer = null;
  let beatCount = 0;

  const ROMANTIC_CHORDS = [
    [174.61, 220.00, 261.63, 329.63, 440.00, 523.25], // Fmaj7
    [130.81, 196.00, 261.63, 329.63, 392.00, 493.88], // Cmaj7
    [110.00, 164.81, 220.00, 261.63, 329.63, 440.00], // Am7
    [98.00,  146.83, 196.00, 246.94, 293.66, 392.00]  // G6
  ];

  function playPianoNote(freq, duration = 2.2, volume = 0.07) {
    if (!audioCtx || audioCtx.state !== 'running') return;
    try {
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(freq * 2, audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, audioCtx.currentTime);

      const now = audioCtx.currentTime;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(volume, now + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) {
      console.warn('Piano note synthesis error:', e);
    }
  }

  function toggleAudio() {
    const btn = document.getElementById('audio-toggle');
    if (!audioPlaying) {
      startRomanticAudio();
      audioPlaying = true;
      if (btn) {
        btn.innerHTML = '<i class="fas fa-compact-disc fa-spin"></i>';
        btn.classList.add('playing');
      }
    } else {
      stopRomanticAudio();
      audioPlaying = false;
      if (btn) {
        btn.innerHTML = '<i class="fas fa-music"></i>';
        btn.classList.remove('playing');
      }
    }
  }

  function startRomanticAudio() {
    try {
      const bgAudio = document.getElementById('bg-romantic-audio');
      let mp3Playing = false;

      if (bgAudio) {
        bgAudio.volume = 0.65;
        const promise = bgAudio.play();
        if (promise !== undefined) {
          promise.then(() => {
            mp3Playing = true;
          }).catch(err => {
            console.log('Procedural romantic piano fallback active:', err);
          });
        }
      }

      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      beatCount = 0;
      if (arpeggioTimer) clearInterval(arpeggioTimer);

      arpeggioTimer = setInterval(() => {
        const chordIndex = Math.floor(beatCount / 8) % ROMANTIC_CHORDS.length;
        const chord = ROMANTIC_CHORDS[chordIndex];
        const noteIndex = beatCount % chord.length;
        const freq = chord[noteIndex];

        playPianoNote(freq, 2.0, mp3Playing ? 0.015 : 0.06);

        if (beatCount % 4 === 0) {
          const highFreq = chord[Math.floor(Math.random() * chord.length)] * 2;
          playPianoNote(highFreq, 2.8, mp3Playing ? 0.01 : 0.035);
        }

        beatCount++;
      }, 400);

    } catch (e) {
      console.warn('Audio start error:', e);
    }
  }

  function stopRomanticAudio() {
    const bgAudio = document.getElementById('bg-romantic-audio');
    if (bgAudio) bgAudio.pause();
    if (arpeggioTimer) {
      clearInterval(arpeggioTimer);
      arpeggioTimer = null;
    }
    if (audioCtx && audioCtx.state === 'running') {
      audioCtx.suspend();
    }
  }

  // Modals Controller Setup
  function setupModals() {
    const bindModal = (triggerId, modalId, closeId) => {
      const trigger = document.getElementById(triggerId);
      const modal = document.getElementById(modalId);
      const close = document.getElementById(closeId);

      if (trigger && modal) {
        trigger.addEventListener('click', () => {
          modal.classList.add('active');
        });

        const closeModal = () => {
          modal.classList.remove('active');
        };

        if (close) close.addEventListener('click', closeModal);
        modal.addEventListener('click', e => {
          if (e.target === modal) closeModal();
        });
      }
    };

    bindModal('note-toggle', 'note-modal', 'close-note-btn');
    bindModal('coupons-toggle', 'coupons-modal', 'close-coupons-btn');
    bindModal('gallery-toggle', 'gallery-modal', 'close-gallery-btn');
    bindModal('counter-toggle', 'counter-modal', 'close-counter-btn');
    bindModal('hero-live-pill', 'counter-modal', 'close-counter-btn');
  }

  // Tabs Controller inside Carta Modal
  function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const activeContent = document.getElementById(targetTab);
        if (activeContent) activeContent.classList.add('active');
      });
    });
  }

  // NTFY Public Topic for Silent Notifications
  const NTFY_TOPIC = 'aniversario-dulce-jhamir';

  // Romantic Kiss Messages
  const KISS_MESSAGES = [
    "¡Un beso para mi dulce amor! 💋",
    "¡Beso robado con todo mi corazón! 🥰",
    "¡Un beso apasionado e infinito para ti! 💖",
    "¡Beso dulce para alegrarte el día! 🌸",
    "¡Un beso que dura para siempre, te amo! 🌹",
    "¡Beso de nuestro primer mesecito juntos! 🥂",
    "¡Muuaaack! Eres el amor de mi vida 💕",
    "¡Miles de besos virtuales directo a tus labios! 💘",
    "¡Un besito suave que te recuerde cuánto te amo! ✨"
  ];

  let kissToastTimer = null;

  // Coupons Action Setup with Ticket Generation & Silent Notification
  function setupCoupons() {
    const couponBtns = document.querySelectorAll('.redeem-btn');
    const ticketModal = document.getElementById('ticket-modal');
    const closeTicketBtn = document.getElementById('close-ticket-btn');
    const ticketDoneBtn = document.getElementById('ticket-done-btn');

    const closeTicket = () => {
      if (ticketModal) ticketModal.classList.remove('active');
    };
    if (closeTicketBtn) closeTicketBtn.addEventListener('click', closeTicket);
    if (ticketDoneBtn) ticketDoneBtn.addEventListener('click', closeTicket);
    if (ticketModal) {
      ticketModal.addEventListener('click', e => {
        if (e.target === ticketModal) closeTicket();
      });
    }

    // Wipe any previous test data so all coupons start 100% active and unredeemed
    try {
      localStorage.removeItem('dulce_redeemed_coupons');
    } catch (e) {}

    const STORAGE_KEY = 'dulce_coupons_v1';
    const savedRedeemed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    couponBtns.forEach((btn, index) => {
      const card = btn.closest('.coupon-card');
      const title = card ? card.querySelector('h4').innerText : `Cupón #${index + 1}`;
      const desc = card ? card.querySelector('p').innerText : '';

      if (savedRedeemed.includes(title)) {
        btn.classList.add('redeemed');
        btn.innerText = '¡Canjeado con Amor! ❤️';
      }

      btn.addEventListener('click', () => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
        const fullDateStr = `${dateStr} a las ${timeStr}`;
        const randomCode = `#AMOR-${now.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

        // Populate Ticket Modal
        const ticketNameEl = document.getElementById('ticket-coupon-name');
        const ticketDescEl = document.getElementById('ticket-coupon-detail');
        const ticketDateEl = document.getElementById('ticket-date');
        const ticketCodeEl = document.getElementById('ticket-code');

        if (ticketNameEl) ticketNameEl.innerText = title;
        if (ticketDescEl) ticketDescEl.innerText = desc;
        if (ticketDateEl) ticketDateEl.innerText = fullDateStr;
        if (ticketCodeEl) ticketCodeEl.innerText = randomCode;

        if (!btn.classList.contains('redeemed')) {
          btn.classList.add('redeemed');
          btn.innerText = '¡Canjeado con Amor! ❤️';
          if (!savedRedeemed.includes(title)) {
            savedRedeemed.push(title);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRedeemed));
          }
        }

        // Open Ticket Modal
        if (ticketModal) ticketModal.classList.add('active');

        // Silent Notification via NTFY (push to Jhamir's phone)
        try {
          fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
            method: 'POST',
            body: `🎟️ ¡Dulce canjeó un cupón!\nCupón: "${title}"\nFecha: ${fullDateStr}\nCódigo: ${randomCode}`,
            headers: {
              'Title': '🎟️ ¡Nuevo Cupón de Amor Canjeado por Dulce!',
              'Priority': 'high',
              'Tags': 'ticket,heart,tada'
            }
          }).catch(() => {});
        } catch (e) {}
      });
    });
  }

  // Compliment Generator Setup
  function setupCompliments() {
    const reasonBtn = document.getElementById('reason-btn');
    if (reasonBtn) {
      reasonBtn.addEventListener('click', () => {
        const randomReason = REASONS_LIST[Math.floor(Math.random() * REASONS_LIST.length)];
        typeWriterMessage(randomReason);
      });
    }
  }

  // Spawn Kiss & Heart Particle Rain
  function spawnKissRain() {
    const emojis = ['💋', '💖', '💕', '❤️', '🌹', '✨', '🥰', '💋', '💘'];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-kiss-particle';
      particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];

      const startX = Math.random() * window.innerWidth;
      const startY = window.innerHeight - 30 + Math.random() * 20;
      const driftX = (Math.random() - 0.5) * 200;
      const rot = (Math.random() - 0.5) * 60;
      const size = 1.3 + Math.random() * 1.4;
      const delay = Math.random() * 0.4;

      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.fontSize = `${size}rem`;
      particle.style.setProperty('--drift-x', `${driftX}px`);
      particle.style.setProperty('--rot', `${rot}deg`);
      particle.style.animationDelay = `${delay}s`;

      document.body.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, 2600);
    }
  }

  // Kiss Virtual Action Button Setup
  function setupKissAction() {
    const kissBtn = document.getElementById('kiss-btn');
    const toast = document.getElementById('kiss-toast');
    const toastMsg = document.getElementById('kiss-toast-msg');
    const toastCount = document.getElementById('kiss-toast-count');

    // Reset previous test kiss count so it starts fresh at 0
    try {
      localStorage.removeItem('dulce_kiss_count');
    } catch (e) {}

    const KISS_STORAGE_KEY = 'dulce_kisses_v1';
    let count = parseInt(localStorage.getItem(KISS_STORAGE_KEY) || '0', 10);

    if (kissBtn) {
      kissBtn.addEventListener('click', () => {
        count++;
        localStorage.setItem(KISS_STORAGE_KEY, count);

        // Spawn kiss and heart rain
        spawnKissRain();

        // Rotate through sweet kiss messages
        const randomMsg = KISS_MESSAGES[Math.floor(Math.random() * KISS_MESSAGES.length)];
        if (toastMsg) toastMsg.innerText = randomMsg;
        if (toastCount) toastCount.innerText = `Besos enviados de Jhamir: ${count} 💋`;

        // Display Kiss Toast Banner
        if (toast) {
          toast.classList.add('active');
          if (kissToastTimer) clearTimeout(kissToastTimer);
          kissToastTimer = setTimeout(() => {
            toast.classList.remove('active');
          }, 3200);
        }
      });
    }
  }

  // Romantic Background Audio Controller
  const bgAudio = document.getElementById('bg-romantic-audio');
  const audioBtn = document.getElementById('audio-toggle');
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const welcomeStartBtn = document.getElementById('welcome-start-btn');
  let audioInteractionBound = false;

  function updateAudioUI(isPlaying) {
    if (!audioBtn) return;
    if (isPlaying) {
      audioBtn.classList.add('playing');
      audioBtn.innerHTML = '<i class="fas fa-compact-disc fa-spin"></i>';
      audioBtn.setAttribute('title', 'Pausar música: Until I Found You');
    } else {
      audioBtn.classList.remove('playing');
      audioBtn.innerHTML = '<i class="fas fa-music"></i>';
      audioBtn.setAttribute('title', 'Reproducir música: Until I Found You');
    }
  }

  function dismissWelcomeOverlay() {
    if (welcomeOverlay && !welcomeOverlay.classList.contains('hidden')) {
      welcomeOverlay.classList.add('hidden');
      setTimeout(() => {
        welcomeOverlay.style.display = 'none';
      }, 700);
    }
  }

  function toggleAudio() {
    if (!bgAudio) return;
    if (bgAudio.paused) {
      bgAudio.volume = 0.85;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          updateAudioUI(true);
        }).catch(err => {
          console.warn("No se pudo iniciar el audio:", err);
        });
      }
    } else {
      bgAudio.pause();
      updateAudioUI(false);
    }
  }

  function initRomanticAutoplay() {
    if (!bgAudio) return;

    bgAudio.volume = 0.85;

    // Helper: start playback
    const startAudio = () => {
      bgAudio.volume = 0.85;
      const promise = bgAudio.play();
      if (promise !== undefined) {
        promise.then(() => {
          updateAudioUI(true);
          dismissWelcomeOverlay();
          detachAutoplayFallback();
        }).catch(() => {
          // Browser prevented unmuted autoplay without prior interaction
          updateAudioUI(false);
        });
      }
    };

    // User gesture fallback for mobile/strict browser autoplay policies
    const onUserInteraction = () => {
      if (bgAudio.paused) {
        startAudio();
      } else {
        dismissWelcomeOverlay();
      }
      detachAutoplayFallback();
    };

    const interactionEvents = ['touchstart', 'touchend', 'click', 'pointerdown'];

    function detachAutoplayFallback() {
      if (!audioInteractionBound) return;
      interactionEvents.forEach(evt => {
        window.removeEventListener(evt, onUserInteraction, true);
        document.removeEventListener(evt, onUserInteraction, true);
      });
      audioInteractionBound = false;
    }

    interactionEvents.forEach(evt => {
      window.addEventListener(evt, onUserInteraction, { once: true, passive: true, capture: true });
      document.addEventListener(evt, onUserInteraction, { once: true, passive: true, capture: true });
    });
    audioInteractionBound = true;

    // Welcome overlay interactions
    if (welcomeStartBtn) {
      welcomeStartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        onUserInteraction();
      });
    }
    if (welcomeOverlay) {
      welcomeOverlay.addEventListener('click', () => {
        onUserInteraction();
      });
    }

    // Keep UI in sync with audio state
    bgAudio.addEventListener('play', () => {
      updateAudioUI(true);
      dismissWelcomeOverlay();
    });
    bgAudio.addEventListener('pause', () => updateAudioUI(false));

    // Try immediate unmuted autoplay on load
    startAudio();
  }

  // Pointer Interaction
  function setupInteractions() {
    window.addEventListener('resize', resize);
  }

  // Document Ready Initialization
  window.addEventListener('DOMContentLoaded', () => {
    resize();
    initParticles();
    setupModals();
    setupTabs();
    setupCoupons();
    setupCompliments();
    setupKissAction();
    setupInteractions();

    typeWriterMessage(DULCE_CONFIG.message);

    if (audioBtn) {
      audioBtn.addEventListener('click', toggleAudio);
    }

    // Always start romantic background music on page load
    initRomanticAutoplay();

    // Start Live Counter interval (tick every 1000ms)
    updateLiveCounter();
    setInterval(updateLiveCounter, 1000);
  });

})();
