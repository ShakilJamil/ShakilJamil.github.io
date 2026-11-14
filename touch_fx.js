/**
 * Touch & Pointer Interactive Particle Response Engine
 * Provides modern tactile cyber-particle sparks & energy ripples upon touch / click / pointermove.
 * Zero-lag 60fps canvas implementation that automatically sleeps when idle (0% CPU usage).
 */
(function() {
  'use strict';

  let canvas, ctx;
  let particles = [];
  let rings = [];
  let animId = null;
  let isRunning = false;
  let lastMoveTime = 0;
  let lastX = 0, lastY = 0;

  function init() {
    canvas = document.createElement('canvas');
    canvas.id = 'touch-canvas';
    canvas.className = 'fixed inset-0 pointer-events-none z-[9999]';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d', { alpha: true });
    resize();

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(resize, 120), { passive: true });

    // Pointer & Touch Listeners
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
  }

  function resize() {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    if (ctx.setTransform) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    } else {
      ctx.scale(dpr, dpr);
    }
  }

  function getThemeColors() {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      return [
        '#6366f1', // Indigo
        '#06b6d4', // Cyan
        '#38bdf8', // Sky
        '#a855f7', // Purple
        '#10b981'  // Emerald
      ];
    } else {
      return [
        '#4f46e5', // Deep Brand Indigo
        '#0284c7', // Deep Cyan
        '#2563eb', // Royal Blue
        '#7c3aed', // Violet
        '#059669'  // Forest Emerald
      ];
    }
  }

  function spawnBurst(x, y, count = 10) {
    const colors = getThemeColors();

    // 1. Expanding Ripple Ring
    rings.push({
      x,
      y,
      radius: 4,
      maxRadius: 38,
      alpha: 0.85,
      color: colors[Math.floor(Math.random() * colors.length)]
    });

    // 2. Quantum Particle Sparks
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 1.8 + Math.random() * 3.5;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2.5 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        decay: 0.022 + Math.random() * 0.02,
        friction: 0.94
      });
    }

    startLoop();
  }

  function spawnTrail(x, y) {
    const colors = getThemeColors();
    particles.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8 - 0.3,
      size: 1.5 + Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.65,
      decay: 0.035,
      friction: 0.96
    });
    startLoop();
  }

  function onPointerDown(e) {
    spawnBurst(e.clientX, e.clientY, e.pointerType === 'touch' ? 12 : 9);
  }

  function onPointerMove(e) {
    const now = performance.now();
    if (now - lastMoveTime < 24) return; // Throttle to ~40fps for trail spawns

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const distSq = dx * dx + dy * dy;

    if (distSq > 36) { // Only spawn trail if moved more than 6px
      lastMoveTime = now;
      lastX = e.clientX;
      lastY = e.clientY;
      spawnTrail(e.clientX, e.clientY);
    }
  }

  function startLoop() {
    if (!isRunning) {
      isRunning = true;
      animId = requestAnimationFrame(render);
    }
  }

  function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Render & Update Rings
    for (let i = rings.length - 1; i >= 0; i--) {
      const ring = rings[i];
      ring.radius += (ring.maxRadius - ring.radius) * 0.16 + 0.4;
      ring.alpha -= 0.032;

      if (ring.alpha <= 0 || ring.radius >= ring.maxRadius) {
        rings.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
      ctx.strokeStyle = ring.color;
      ctx.globalAlpha = Math.max(ring.alpha, 0);
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();
    }

    // Render & Update Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.alpha -= p.decay;
      p.size = Math.max(0.2, p.size * 0.98);

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(p.alpha, 0);
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.restore();
    }

    // Continue loop if active particles or rings exist, otherwise sleep
    if (particles.length > 0 || rings.length > 0) {
      animId = requestAnimationFrame(render);
    } else {
      isRunning = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
