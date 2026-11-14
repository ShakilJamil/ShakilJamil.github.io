/**
 * Bug Hunter: Production Defender
 * Interactive Developer Arcade Mini-Game for Shakil Jamil Mrida's Portfolio.
 * Clean, lightweight, 60fps HTML5 Canvas + Web Audio API synthesizer.
 * Supports Desktop (Arrows/A-D/Space/Mouse) and Mobile Touch controls.
 */

(function() {
  'use strict';

  let canvas, ctx;
  let animId = null;
  let isRunning = false;
  let gameState = 'START'; // 'START' | 'PLAYING' | 'GAMEOVER'
  let score = 0;
  let highScore = 0;
  let wave = 1;
  let lives = 3;
  let combo = 0;
  let lastHitTime = 0;
  let soundEnabled = true;
  let audioCtx = null;

  // Power-up state
  let multiShotTimer = 0;

  // Player ship
  const player = {
    x: 300,
    y: 350,
    width: 32,
    height: 24,
    speed: 7,
    dx: 0
  };

  // Game entities
  let lasers = [];
  let bugs = [];
  let particles = [];
  let powerups = [];

  // Keys state
  const keys = {
    left: false,
    right: false,
    shoot: false
  };

  let lastShotTime = 0;
  let lastSpawnTime = 0;

  // Bug Type Definitions
  const BUG_TYPES = [
    { type: 'null_pointer', name: 'NullPointer', color: '#ef4444', hp: 1, speed: 1.8, pts: 100, size: 20 },
    { type: 'not_found', name: '404 Error', color: '#f59e0b', hp: 1, speed: 2.2, pts: 150, size: 18, sine: true },
    { type: 'memory_leak', name: 'MemoryLeak', color: '#a855f7', hp: 2, speed: 1.3, pts: 250, size: 26 },
    { type: 'infinite_loop', name: 'LoopCrash', color: '#06b6d4', hp: 1, speed: 1.9, pts: 200, size: 22, spin: true }
  ];

  function initGame() {
    canvas = document.getElementById('arcade-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    // Load High Score
    try {
      highScore = parseInt(localStorage.getItem('bughunter_highscore') || '0', 10);
      updateHighScoreDisplay();
    } catch (_) {}

    setupCanvasResolution();
    bindEvents();
    renderStartScreen();
  }

  function setupCanvasResolution() {
    if (!canvas) return;
    canvas.width = 600;
    canvas.height = 420;
    player.x = canvas.width / 2;
    player.y = canvas.height - 35;
  }

  function updateHighScoreDisplay() {
    const el = document.getElementById('arcade-high-score');
    if (el) el.textContent = `High: ${highScore}`;
  }

  // -------------------------------------------------------------
  // AUDIO SYNTHESIZER (Web Audio API)
  // -------------------------------------------------------------
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!soundEnabled) return;
    try {
      const actx = getAudioContext();
      if (!actx) return;
      const now = actx.currentTime;

      if (type === 'laser') {
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'hit') {
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'powerup') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = actx.createOscillator();
          const gain = actx.createGain();
          const t = now + i * 0.06;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.08, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
          osc.connect(gain);
          gain.connect(actx.destination);
          osc.start(t);
          osc.stop(t + 0.1);
        });
      } else if (type === 'gameover') {
        [392.00, 349.23, 311.13, 261.63].forEach((freq, i) => {
          const osc = actx.createOscillator();
          const gain = actx.createGain();
          const t = now + i * 0.12;
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.1, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
          osc.connect(gain);
          gain.connect(actx.destination);
          osc.start(t);
          osc.stop(t + 0.16);
        });
      }
    } catch (_) {}
  }

  // -------------------------------------------------------------
  // CONTROLS & EVENT BINDINGS
  // -------------------------------------------------------------
  function bindEvents() {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Mouse aiming on desktop
    if (canvas) {
      canvas.addEventListener('mousemove', (e) => {
        if (gameState !== 'PLAYING') return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const mouseX = (e.clientX - rect.left) * scaleX;
        player.x = Math.max(player.width, Math.min(canvas.width - player.width, mouseX));
      });

      canvas.addEventListener('mousedown', (e) => {
        if (gameState === 'START' || gameState === 'GAMEOVER') {
          startGame();
        } else if (gameState === 'PLAYING') {
          fireLaser();
        }
      });

      // Mobile Touch Drag on Canvas
      canvas.addEventListener('touchmove', (e) => {
        if (gameState !== 'PLAYING' || !e.touches[0]) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const touchX = (e.touches[0].clientX - rect.left) * scaleX;
        player.x = Math.max(player.width, Math.min(canvas.width - player.width, touchX));
      }, { passive: false });

      canvas.addEventListener('touchstart', (e) => {
        if (gameState === 'START' || gameState === 'GAMEOVER') {
          startGame();
        } else if (gameState === 'PLAYING') {
          fireLaser();
        }
      }, { passive: true });
    }

    // Touch Buttons for Mobile
    const btnLeft = document.getElementById('touch-btn-left');
    const btnRight = document.getElementById('touch-btn-right');
    const btnFire = document.getElementById('touch-btn-fire');

    if (btnLeft) {
      const handleLeftStart = (e) => { e.preventDefault(); keys.left = true; };
      const handleLeftEnd = (e) => { e.preventDefault(); keys.left = false; };
      btnLeft.addEventListener('touchstart', handleLeftStart, { passive: false });
      btnLeft.addEventListener('touchend', handleLeftEnd, { passive: false });
      btnLeft.addEventListener('mousedown', handleLeftStart);
      btnLeft.addEventListener('mouseup', handleLeftEnd);
    }

    if (btnRight) {
      const handleRightStart = (e) => { e.preventDefault(); keys.right = true; };
      const handleRightEnd = (e) => { e.preventDefault(); keys.right = false; };
      btnRight.addEventListener('touchstart', handleRightStart, { passive: false });
      btnRight.addEventListener('touchend', handleRightEnd, { passive: false });
      btnRight.addEventListener('mousedown', handleRightStart);
      btnRight.addEventListener('mouseup', handleRightEnd);
    }

    if (btnFire) {
      const handleFire = (e) => {
        e.preventDefault();
        if (gameState === 'START' || gameState === 'GAMEOVER') {
          startGame();
        } else {
          fireLaser();
        }
      };
      btnFire.addEventListener('touchstart', handleFire, { passive: false });
      btnFire.addEventListener('click', handleFire);
    }
  }

  function isModalOpen() {
    const modal = document.getElementById('arcade-modal');
    return modal && !modal.classList.contains('hidden');
  }

  function onKeyDown(e) {
    if (!isModalOpen()) return;

    if (e.code === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      keys.left = true;
    }
    if (e.code === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      keys.right = true;
    }
    if (e.code === 'Space') {
      e.preventDefault();
      if (gameState === 'START' || gameState === 'GAMEOVER') {
        startGame();
      } else if (gameState === 'PLAYING') {
        fireLaser();
      }
    }
  }

  function onKeyUp(e) {
    if (e.code === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      keys.left = false;
    }
    if (e.code === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      keys.right = false;
    }
  }

  // -------------------------------------------------------------
  // GAMEPLAY ACTIONS
  // -------------------------------------------------------------
  function fireLaser() {
    const now = performance.now();
    if (now - lastShotTime < 130) return; // Fire rate limit
    lastShotTime = now;

    playSound('laser');

    if (multiShotTimer > 0) {
      // 3-way spread fire
      lasers.push({ x: player.x, y: player.y - 12, vx: 0, vy: -9 });
      lasers.push({ x: player.x - 10, y: player.y - 10, vx: -2.2, vy: -8.5 });
      lasers.push({ x: player.x + 10, y: player.y - 10, vx: 2.2, vy: -8.5 });
    } else {
      // Dual cannon
      lasers.push({ x: player.x - 8, y: player.y - 12, vx: 0, vy: -9 });
      lasers.push({ x: player.x + 8, y: player.y - 12, vx: 0, vy: -9 });
    }
  }

  function spawnBug() {
    const typeDef = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];
    const speedMult = 1 + (wave - 1) * 0.12;

    bugs.push({
      x: 30 + Math.random() * (canvas.width - 60),
      y: -25,
      baseX: 0,
      width: typeDef.size,
      height: typeDef.size,
      hp: typeDef.hp,
      maxHp: typeDef.hp,
      speed: typeDef.speed * speedMult,
      color: typeDef.color,
      name: typeDef.name,
      pts: typeDef.pts,
      sine: !!typeDef.sine,
      spin: !!typeDef.spin,
      angle: 0,
      spawnTime: performance.now()
    });
  }

  function spawnExplosion(x, y, color, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 2.5,
        color,
        alpha: 1.0,
        decay: 0.03 + Math.random() * 0.03
      });
    }
  }

  function spawnPowerup(x, y) {
    const isEspresso = Math.random() > 0.4;
    powerups.push({
      x,
      y,
      type: isEspresso ? 'espresso' : 'shield',
      icon: isEspresso ? '☕' : '🛡️',
      color: isEspresso ? '#f59e0b' : '#10b981',
      speed: 1.6,
      radius: 12
    });
  }

  // -------------------------------------------------------------
  // GAME LIFECYCLE
  // -------------------------------------------------------------
  function startGame() {
    gameState = 'PLAYING';
    score = 0;
    wave = 1;
    lives = 3;
    combo = 0;
    multiShotTimer = 0;
    lasers = [];
    bugs = [];
    particles = [];
    powerups = [];
    player.x = canvas.width / 2;
    lastSpawnTime = performance.now();

    if (!isRunning) {
      isRunning = true;
      animId = requestAnimationFrame(gameLoop);
    }
  }

  function gameOver() {
    gameState = 'GAMEOVER';
    playSound('gameover');

    if (score > highScore) {
      highScore = score;
      try {
        localStorage.setItem('bughunter_highscore', String(highScore));
      } catch (_) {}
      updateHighScoreDisplay();
    }
  }

  // -------------------------------------------------------------
  // UPDATE PHYSICS & RENDERING LOOP
  // -------------------------------------------------------------
  function update(dt) {
    if (gameState !== 'PLAYING') return;

    // Player Movement
    if (keys.left) player.x -= player.speed;
    if (keys.right) player.x += player.speed;
    player.x = Math.max(player.width / 2, Math.min(canvas.width - player.width / 2, player.x));

    // Powerup Timer
    if (multiShotTimer > 0) multiShotTimer -= dt;

    // Wave Progression (every 1000 points = next wave)
    wave = 1 + Math.floor(score / 1200);

    // Spawn Bugs
    const now = performance.now();
    const spawnInterval = Math.max(650, 1500 - (wave - 1) * 120);
    if (now - lastSpawnTime > spawnInterval) {
      lastSpawnTime = now;
      spawnBug();
      if (wave >= 3 && Math.random() > 0.5) spawnBug(); // Multi-spawn on higher waves
    }

    // Update Lasers
    for (let i = lasers.length - 1; i >= 0; i--) {
      const l = lasers[i];
      l.x += l.vx;
      l.y += l.vy;
      if (l.y < -10 || l.x < 0 || l.x > canvas.width) {
        lasers.splice(i, 1);
      }
    }

    // Update Bugs & Collisions
    for (let i = bugs.length - 1; i >= 0; i--) {
      const b = bugs[i];
      b.y += b.speed;
      if (b.sine) {
        b.x += Math.sin((now - b.spawnTime) * 0.006) * 2;
      }
      if (b.spin) {
        b.angle += 0.06;
      }

      // Check collision with Lasers
      let bugKilled = false;
      for (let j = lasers.length - 1; j >= 0; j--) {
        const l = lasers[j];
        const dist = Math.hypot(b.x - l.x, b.y - l.y);
        if (dist < b.width / 2 + 5) {
          lasers.splice(j, 1);
          b.hp--;
          spawnExplosion(l.x, l.y, '#ffffff', 4);

          if (b.hp <= 0) {
            bugKilled = true;
            break;
          }
        }
      }

      if (bugKilled) {
        playSound('hit');
        spawnExplosion(b.x, b.y, b.color, 14);

        // Combo Multiplier
        if (now - lastHitTime < 1600) {
          combo = Math.min(combo + 1, 5);
        } else {
          combo = 1;
        }
        lastHitTime = now;

        score += b.pts * combo;

        // Chance to drop power-up (10%)
        if (Math.random() < 0.12) {
          spawnPowerup(b.x, b.y);
        }

        bugs.splice(i, 1);
        continue;
      }

      // Bug reached bottom (Passed Production Defense)
      if (b.y > canvas.height - 15) {
        spawnExplosion(b.x, canvas.height - 20, '#ef4444', 16);
        bugs.splice(i, 1);
        lives--;
        combo = 0;
        if (lives <= 0) {
          gameOver();
          return;
        }
      }
    }

    // Update Powerups
    for (let i = powerups.length - 1; i >= 0; i--) {
      const p = powerups[i];
      p.y += p.speed;

      // Check collection with Player
      const dist = Math.hypot(p.x - player.x, p.y - player.y);
      if (dist < player.width + p.radius) {
        playSound('powerup');
        spawnExplosion(p.x, p.y, p.color, 16);

        if (p.type === 'espresso') {
          multiShotTimer = 6000; // 6 seconds of multi-shot
        } else if (p.type === 'shield') {
          // Clear all current bugs on screen!
          bugs.forEach(b => spawnExplosion(b.x, b.y, b.color, 10));
          score += bugs.length * 100;
          bugs = [];
        }
        powerups.splice(i, 1);
        continue;
      }

      if (p.y > canvas.height + 20) {
        powerups.splice(i, 1);
      }
    }

    // Update Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const pt = particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.alpha -= pt.decay;
      if (pt.alpha <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function render() {
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cyber Grid lines
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    if (gameState === 'START') {
      renderStartScreen();
      return;
    }

    if (gameState === 'GAMEOVER') {
      renderGameOverScreen();
      return;
    }

    // Render Lasers
    ctx.fillStyle = multiShotTimer > 0 ? '#f59e0b' : '#06b6d4';
    ctx.shadowBlur = 8;
    ctx.shadowColor = multiShotTimer > 0 ? '#f59e0b' : '#06b6d4';
    lasers.forEach(l => {
      ctx.fillRect(l.x - 2, l.y - 8, 4, 10);
    });
    ctx.shadowBlur = 0;

    // Render Bugs
    bugs.forEach(b => {
      ctx.save();
      ctx.translate(b.x, b.y);
      if (b.spin) ctx.rotate(b.angle);

      ctx.fillStyle = b.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = b.color;

      // Draw Bug Shape
      ctx.beginPath();
      ctx.roundRect(-b.width / 2, -b.height / 2, b.width, b.height, 6);
      ctx.fill();

      // Bug Eyes / Terminal Detail
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-b.width / 4, -b.height / 6, 2.5, 0, Math.PI * 2);
      ctx.arc(b.width / 4, -b.height / 6, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Bug Name label
      ctx.restore();
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(b.name, b.x, b.y - b.height / 2 - 4);
    });

    // Render Powerups
    powerups.forEach(p => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.stroke();

      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.icon, p.x, p.y);
      ctx.restore();
    });

    // Render Particles
    particles.forEach(pt => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, pt.alpha);
      ctx.fillStyle = pt.color;
      ctx.shadowBlur = 4;
      ctx.shadowColor = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Render Player Ship (Dev Core Node)
    ctx.save();
    ctx.translate(player.x, player.y);

    // Dual Thrusters Fire
    ctx.fillStyle = Math.random() > 0.5 ? '#f59e0b' : '#ef4444';
    ctx.beginPath();
    ctx.moveTo(-10, 10);
    ctx.lineTo(-6, 18 + Math.random() * 5);
    ctx.lineTo(-2, 10);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(2, 10);
    ctx.lineTo(6, 18 + Math.random() * 5);
    ctx.lineTo(10, 10);
    ctx.fill();

    // Ship Body
    ctx.fillStyle = '#4f46e5';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#6366f1';
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.lineTo(16, 10);
    ctx.lineTo(0, 4);
    ctx.lineTo(-16, 10);
    ctx.closePath();
    ctx.fill();

    // Cockpit / Node Core
    ctx.fillStyle = multiShotTimer > 0 ? '#f59e0b' : '#22d3ee';
    ctx.beginPath();
    ctx.arc(0, -2, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Heads-Up Display (HUD)
    renderHUD();
  }

  function renderHUD() {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${score}`, 16, 24);

    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`WAVE: ${wave}`, 140, 24);

    if (combo > 1) {
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`COMBO x${combo}!`, 220, 24);
    }

    if (multiShotTimer > 0) {
      ctx.fillStyle = '#f59e0b';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(`☕ MULTI-SHOT (${(multiShotTimer / 1000).toFixed(1)}s)`, 16, 42);
    }

    // Health Hearts
    ctx.textAlign = 'right';
    let hearts = '';
    for (let i = 0; i < lives; i++) hearts += '❤️ ';
    ctx.font = '13px sans-serif';
    ctx.fillText(hearts, canvas.width - 16, 24);
  }

  function renderStartScreen() {
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';

    // Title Banner
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#6366f1';
    ctx.fillText('BUG HUNTER // DEV DEFENDER', canvas.width / 2, 130);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "JetBrains Mono", monospace';
    ctx.fillText('Defend production from runtime crashes & memory leaks!', canvas.width / 2, 160);

    // Start Button Prompt
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText('[ PRESS SPACEBAR OR TAP TO START ]', canvas.width / 2, 230);

    // Controls Brief
    ctx.fillStyle = '#64748b';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText('Desktop: ← → or A/D to Steer • Space/Click to Fire Hotfix', canvas.width / 2, 290);
    ctx.fillText('Mobile: Touch Drag to Steer • Tap Screen to Fire', canvas.width / 2, 310);

    if (highScore > 0) {
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      ctx.fillText(`★ CURRENT ALL-TIME BEST: ${highScore} ★`, canvas.width / 2, 360);
    }
  }

  function renderGameOverScreen() {
    ctx.fillStyle = 'rgba(10, 15, 29, 0.88)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#ef4444';
    ctx.fillText('PRODUCTION OUTAGE!', canvas.width / 2, 140);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillText(`FINAL SCORE: ${score}`, canvas.width / 2, 185);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText(`Waves Cleared: ${wave}  •  All-Time Record: ${highScore}`, canvas.width / 2, 215);

    if (score >= highScore && score > 0) {
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 14px "JetBrains Mono", monospace';
      ctx.fillText('🎉 NEW ALL-TIME HIGH SCORE RECORD! 🎉', canvas.width / 2, 255);
    }

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillText('[ PRESS SPACEBAR OR TAP TO RESTART ]', canvas.width / 2, 310);
  }

  let lastFrameTime = performance.now();
  function gameLoop(now) {
    if (!isRunning) return;
    const dt = now - lastFrameTime;
    lastFrameTime = now;

    update(dt);
    render();

    animId = requestAnimationFrame(gameLoop);
  }

  // -------------------------------------------------------------
  // MODAL EXPOSURE & CONTROLS
  // -------------------------------------------------------------
  window.openGameModal = function() {
    const modal = document.getElementById('arcade-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    if (!canvas) initGame();
    setupCanvasResolution();

    if (gameState === 'START' || gameState === 'GAMEOVER') {
      renderStartScreen();
    }
  };

  window.closeGameModal = function() {
    const modal = document.getElementById('arcade-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';

    keys.left = false;
    keys.right = false;

    if (isRunning) {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
    }
  };

  window.toggleGameSound = function() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('arcade-sound-btn');
    if (btn) {
      btn.textContent = soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
    }
  };

  window.restartArcadeGame = function() {
    startGame();
  };

  document.addEventListener('DOMContentLoaded', () => {
    initGame();
  });
})();
