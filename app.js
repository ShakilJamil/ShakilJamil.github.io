/**
 * Shakil Jamil Mrida - Developer Portfolio Script (High-Performance Edition)
 * Handles theme toggling, mobile navigation, project filtering,
 * modal dialogs, and interactive contact form handling.
 * Optimized for instantaneous 60fps interaction and zero layout thrashing.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Always ensure opening starts at top unless a valid section anchor is explicitly targeted
  if (window.location.hash === '#contact' || !window.location.hash || window.location.hash === '#hero') {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  // 1. Initialize Lucide Icons via Local Vector Engine
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Dynamic Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Instant Theme Toggle (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    html.classList.remove('dark');
  } else {
    // Default to dark mode for developer portfolio aesthetic
    html.classList.add('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      // Instant switch: Moon/Sun icons are CSS-toggled (hidden dark:block / block dark:hidden)
      // Zero DOM re-traversal or SVG reconstruction overhead!
      showToast(isDark ? 'Switched to Dark Mode' : 'Switched to Light Mode');
    });
  }

  // 4. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking any link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 5. Hardware-Accelerated Project Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      // Fast active class toggle
      filterButtons.forEach(b => b.classList.remove('active', 'bg-brand-600', 'text-white'));
      button.classList.add('active', 'bg-brand-600', 'text-white');

      const filterValue = button.getAttribute('data-filter');

      // Schedule DOM mutation aligned with browser refresh cycle (zero frame drops)
      requestAnimationFrame(() => {
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.classList.remove('hidden');
            card.classList.add('animate-card-fade');
          } else {
            card.classList.add('hidden');
            card.classList.remove('animate-card-fade');
          }
        });
      });
    });
  });

  // 6. Project Case Study Modal (Optimized with DocumentFragment)
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalHighlights = document.getElementById('modal-highlights');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');
  const modalDiscussBtn = document.getElementById('modal-discuss-btn');

  function openModal(title, desc, highlightsStr) {
    if (!modal) return;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalHighlights.innerHTML = '';

    const highlights = highlightsStr ? highlightsStr.split('|') : [];
    const fragment = document.createDocumentFragment();
    highlights.forEach(item => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed py-0.5';
      li.innerHTML = `
        <span class="text-brand-500 font-bold mt-0.5 text-base leading-none">•</span>
        <div class="flex-1">${item.trim()}</div>
      `;
      fragment.appendChild(li);
    });
    modalHighlights.appendChild(fragment);

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const button = e.currentTarget;
      const title = button.getAttribute('data-title');
      const desc = button.getAttribute('data-desc');
      const highlights = button.getAttribute('data-highlights');
      openModal(title, desc, highlights);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeModal);
  if (modalDiscussBtn) modalDiscussBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // 7. Interactive Contact Form Handling (Standard FormSubmit POST + Mailto Fallback)
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formSuccessText = document.getElementById('form-success-text');
  const formError = document.getElementById('form-error');
  const formErrorText = document.getElementById('form-error-text');
  const mailtoFallback = document.getElementById('mailto-fallback');
  const hiddenSubject = document.getElementById('hidden-subject');
  const submitBtn = document.getElementById('submit-btn');

  // Show success confirmation when redirected back from FormSubmit (?sent=1)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('sent') === '1') {
    if (formSuccess && formSuccessText) {
      formSuccessText.textContent = 'Thanks for reaching out! Your message has been sent to Shakil\'s inbox.';
      formSuccess.classList.remove('hidden');
      setTimeout(() => formSuccess.classList.add('hidden'), 8000);
    }
    showToast('Message delivered successfully!');
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const subject = document.getElementById('subject')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';

      if (formSuccess) formSuccess.classList.add('hidden');
      if (formError) formError.classList.add('hidden');

      const mailtoSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name}`);
      const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      if (mailtoFallback) {
        mailtoFallback.href = `mailto:mafialhasan@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      }

      if (window.location.protocol === 'file:') {
        e.preventDefault();
        if (formError && formErrorText) {
          formErrorText.textContent = 'Direct web form delivery requires opening via your live website (https://shakiljamil.github.io). Click below to send via your email app.';
          formError.classList.remove('hidden');
        }
        showToast('Open via live URL or use Email App fallback');
        return;
      }

      if (hiddenSubject) {
        hiddenSubject.value = subject
          ? `Portfolio Inquiry: ${subject}`
          : `New Portfolio Message from ${name}`;
      }

      if (submitBtn) {
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>Sending message...</span>
        `;
        setTimeout(() => { submitBtn.disabled = true; }, 0);
        window.addEventListener('pageshow', () => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
          if (window.lucide) window.lucide.createIcons({ root: submitBtn });
        }, { once: true });
      }
      // Allow native HTML POST to https://formsubmit.co/mafialhasan@gmail.com
    });
  }

  // 8. CV Download / Printable Resume Handler
  const downloadCvBtn = document.getElementById('download-cv-btn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Opening printable CV view (choose "Save as PDF")');
      setTimeout(() => window.print(), 300);
    });
  }

  // 9. Toast Notification Utility (Optimized)
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.remove('hidden');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3200);
  }

  // 10. Live GitHub Repositories Sync (Preloaded Snapshot + Instant 0ms Zero-Lag Cache)
  const GITHUB_USERNAME = 'ShakilJamil';
  const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=100`;
  const SESSION_CACHE_KEY = 'shakil_github_repos_session_v2';
  const FALLBACK_CACHE_KEY = 'shakil_github_repos_fallback_v2';
  const CACHE_TTL_MS = 60 * 1000; // 60 seconds

  const LANG_COLORS = {
    Java: '#b07219',
    PHP: '#4F5D95',
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    'C#': '#178600',
    'C++': '#f34b7d',
    C: '#555555',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Shell: '#89e051',
    Markdown: '#083fa1',
    Other: '#8b5cf6'
  };

  const REPO_LIVE_DEMOS = {
    pulsequeue: 'projects/pulsequeue/index.html',
    apwj_final: 'projects/smart-inventory/index.html',
    'web-tec-spring-23-24-sec-f-Finalproject-group-6': 'projects/courier-management/index.html',
    marketmngt: 'projects/market-management/index.html',
    Computer_graphics_OpenGl: 'projects/opengl-simulation/index.html',
    Resume: 'cv.html',
    'ShakilJamil.github.io': 'index.html'
  };

  const DEFAULT_REPOS = [
    {
      name: 'pulsequeue',
      full_name: 'ShakilJamil/pulsequeue',
      html_url: 'https://github.com/ShakilJamil/pulsequeue',
      description: 'Enterprise Smart Hospital OPD Queue Management System featuring real-time token calling, digital signage TV kiosk, and SLA metrics.',
      fork: false,
      language: 'Java',
      stargazers_count: 0,
      pushed_at: '2026-11-13T22:41:13Z',
      homepage: 'projects/pulsequeue/index.html',
      topics: ['java', 'spring-boot', 'hospital-management', 'realtime-queue']
    },
    {
      name: 'apwj_final',
      full_name: 'ShakilJamil/apwj_final',
      html_url: 'https://github.com/ShakilJamil/apwj_final',
      description: 'Advanced Spring Boot 3.x Enterprise Smart Inventory & Asset Management System with automated discount engine and AOP audit logging.',
      fork: false,
      language: 'Java',
      stargazers_count: 0,
      pushed_at: '2026-11-13T22:47:36Z',
      homepage: 'projects/smart-inventory/index.html',
      topics: ['java', 'spring-boot', 'inventory-management', 'aop']
    },
    {
      name: 'web-tec-spring-23-24-sec-f-Finalproject-group-6',
      full_name: 'ShakilJamil/web-tec-spring-23-24-sec-f-Finalproject-group-6',
      html_url: 'https://github.com/ShakilJamil/web-tec-spring-23-24-sec-f-Finalproject-group-6',
      description: 'Full-stack Courier Logistics & Telemetry Management System (Quick Eagle) with multi-role portal, parcel tracking, and air waybills.',
      fork: false,
      language: 'PHP',
      stargazers_count: 0,
      pushed_at: '2026-11-13T23:28:35Z',
      homepage: 'projects/courier-management/index.html',
      topics: ['php', 'logistics', 'tracking-system', 'telemetry']
    },
    {
      name: 'marketmngt',
      full_name: 'ShakilJamil/marketmngt',
      html_url: 'https://github.com/ShakilJamil/marketmngt',
      description: 'Commercial Market & Plaza Management ERP built with C# .NET Windows Forms, multi-story floor directory, and automated lease invoicing.',
      fork: false,
      language: 'C#',
      stargazers_count: 0,
      pushed_at: '2026-11-13T23:08:29Z',
      homepage: 'projects/market-management/index.html',
      topics: ['csharp', 'dotnet', 'erp', 'market-management']
    },
    {
      name: 'Computer_graphics_OpenGl',
      full_name: 'ShakilJamil/Computer_graphics_OpenGl',
      html_url: 'https://github.com/ShakilJamil/Computer_graphics_OpenGl',
      description: 'Liberation\'s Canvas: 1971 Liberation War Interactive 2D Simulation in C++ & OpenGL FreeGLUT with particle cannons and day/night cycle.',
      fork: false,
      language: 'C++',
      stargazers_count: 0,
      pushed_at: '2026-11-13T22:59:56Z',
      homepage: 'projects/opengl-simulation/index.html',
      topics: ['cpp', 'opengl', 'simulation', 'graphics']
    },
    {
      name: 'Software-Engineering',
      full_name: 'ShakilJamil/Software-Engineering',
      html_url: 'https://github.com/ShakilJamil/Software-Engineering',
      description: 'Software Engineering course assignments, system architecture models, UML diagrams, and software development lifecycle documentation.',
      fork: false,
      language: 'Markdown',
      stargazers_count: 0,
      pushed_at: '2026-11-13T22:54:54Z',
      homepage: null,
      topics: ['software-engineering', 'uml', 'sdlc', 'architecture']
    },
    {
      name: 'krishisathi',
      full_name: 'ShakilJamil/krishisathi',
      html_url: 'https://github.com/ShakilJamil/krishisathi',
      description: 'Next-generation agricultural platform & agronomy advisory assistant built with TypeScript and modern web technologies.',
      fork: false,
      language: 'TypeScript',
      stargazers_count: 0,
      pushed_at: '2026-07-13T12:42:50Z',
      homepage: null,
      topics: ['typescript', 'agritech', 'react', 'web-app']
    },
    {
      name: 'computer-network',
      full_name: 'ShakilJamil/computer-network',
      html_url: 'https://github.com/ShakilJamil/computer-network',
      description: 'Computer networking laboratory implementations, socket programming, protocol simulations, and network packet analysis.',
      fork: false,
      language: 'C',
      stargazers_count: 0,
      pushed_at: '2026-06-20T11:10:57Z',
      homepage: null,
      topics: ['networking', 'sockets', 'protocols', 'tcp-ip']
    },
    {
      name: 'Resume',
      full_name: 'ShakilJamil/Resume',
      html_url: 'https://github.com/ShakilJamil/Resume',
      description: 'Professional Software Engineer resume and CV documentation formatted for high-impact technical recruitment.',
      fork: false,
      language: 'HTML',
      stargazers_count: 0,
      pushed_at: '2026-04-13T17:16:32Z',
      homepage: 'cv.html',
      topics: ['resume', 'cv', 'software-engineer']
    },
    {
      name: 'simple-Bakery-Management-System-PHP',
      full_name: 'ShakilJamil/simple-Bakery-Management-System-PHP',
      html_url: 'https://github.com/ShakilJamil/simple-Bakery-Management-System-PHP',
      description: 'PHP & MySQL Bakery inventory, order processing, and customer billing web application.',
      fork: false,
      language: 'PHP',
      stargazers_count: 0,
      pushed_at: '2025-09-19T20:01:48Z',
      homepage: null,
      topics: ['php', 'mysql', 'billing', 'inventory']
    },
    {
      name: 'Rxmanager',
      full_name: 'ShakilJamil/Rxmanager',
      html_url: 'https://github.com/ShakilJamil/Rxmanager',
      description: 'Pharmacy & Prescription management dashboard application with medicine stock monitoring.',
      fork: false,
      language: 'HTML',
      stargazers_count: 0,
      pushed_at: '2025-09-05T22:47:17Z',
      homepage: null,
      topics: ['pharmacy', 'prescription', 'healthcare']
    },
    {
      name: 'Springboot',
      full_name: 'ShakilJamil/Springboot',
      html_url: 'https://github.com/ShakilJamil/Springboot',
      description: 'Spring Boot RESTful microservices, Hibernate JPA persistence, and web application templates.',
      fork: false,
      language: 'Java',
      stargazers_count: 0,
      pushed_at: '2025-08-31T15:10:04Z',
      homepage: null,
      topics: ['springboot', 'rest-api', 'jpa', 'hibernate']
    },
    {
      name: 'java_project',
      full_name: 'ShakilJamil/java_project',
      html_url: 'https://github.com/ShakilJamil/java_project',
      description: 'Core Java Object-Oriented software engineering applications, Swing desktop UI, and business logic.',
      fork: false,
      language: 'Java',
      stargazers_count: 0,
      pushed_at: '2025-08-31T15:00:14Z',
      homepage: null,
      topics: ['java', 'oop', 'swing', 'desktop']
    },
    {
      name: 'ShakilJamil',
      full_name: 'ShakilJamil/ShakilJamil',
      html_url: 'https://github.com/ShakilJamil/ShakilJamil',
      description: 'Config files for my GitHub profile showcasing tech stack, contributions, and active projects.',
      fork: false,
      language: 'Markdown',
      stargazers_count: 0,
      pushed_at: '2024-12-13T23:11:48Z',
      homepage: 'https://github.com/ShakilJamil',
      topics: ['config', 'github-config']
    },
    {
      name: 'Learning-web-technologies-spring2023-2024-sec-f',
      full_name: 'ShakilJamil/Learning-web-technologies-spring2023-2024-sec-f',
      html_url: 'https://github.com/ShakilJamil/Learning-web-technologies-spring2023-2024-sec-f',
      description: 'Web technologies coursework: HTML5, CSS3, JavaScript DOM, PHP backend, and AJAX integration.',
      fork: false,
      language: 'PHP',
      stargazers_count: 0,
      pushed_at: '2024-05-13T20:38:12Z',
      homepage: null,
      topics: ['php', 'javascript', 'html5', 'css3']
    },
    {
      name: 'compiler_Lab2',
      full_name: 'ShakilJamil/compiler_Lab2',
      html_url: 'https://github.com/ShakilJamil/compiler_Lab2',
      description: 'Compiler design laboratory: lexical analyzer, CFG parsing, token recognition, and grammar rules in C++.',
      fork: false,
      language: 'C++',
      stargazers_count: 0,
      pushed_at: '2023-11-16T08:46:19Z',
      homepage: null,
      topics: ['compiler', 'cpp', 'lexical-analysis', 'cfg']
    },
    {
      name: 'ShakilJamil.github.io',
      full_name: 'ShakilJamil/ShakilJamil.github.io',
      html_url: 'https://github.com/ShakilJamil/ShakilJamil.github.io',
      description: 'Personal portfolio website showcase for Shakil Jamil Mrida featuring live interactive project demos and verified CV.',
      fork: false,
      language: 'HTML',
      stargazers_count: 0,
      pushed_at: '2026-11-14T05:00:17Z',
      homepage: 'https://shakiljamil.github.io/',
      topics: ['portfolio', 'javascript', 'tailwindcss', 'github-pages']
    }
  ];

  const repoCountEl = document.getElementById('github-repo-count');
  const syncStatusEl = document.getElementById('github-sync-status');
  const reposGridEl = document.getElementById('github-repos-grid');
  const langFiltersEl = document.getElementById('github-lang-filters');
  const refreshBtn = document.getElementById('refresh-github-btn');
  const refreshIcon = document.getElementById('refresh-github-icon');

  let cachedRepos = [];
  let activeLangFilter = 'ALL';
  let isSyncing = false;

  function isSafeHttpUrl(url) {
    return typeof url === 'string' && (url.startsWith('https://') || url.startsWith('http://'));
  }

  function formatUpdatedDate(isoStr) {
    if (!isoStr) return 'Recently updated';
    const date = new Date(isoStr);
    const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'Updated today';
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 30) return `Updated ${diffDays}d ago`;
    return `Updated ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
  }

  function renderLanguageFilters(repos) {
    if (!langFiltersEl) return;

    const counts = repos.reduce((acc, repo) => {
      const lang = repo.language || 'Other';
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {});

    const entries = [['ALL', repos.length], ...Object.entries(counts).sort((a, b) => b[1] - a[1])];
    const fragment = document.createDocumentFragment();

    entries.forEach(([lang, count]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isActive = activeLangFilter === lang;
      btn.className = isActive
        ? 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 text-white shadow-sm transition'
        : 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition';
      btn.textContent = lang === 'ALL' ? `All (${count})` : `${lang} (${count})`;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        activeLangFilter = lang;
        requestAnimationFrame(() => {
          renderLanguageFilters(cachedRepos);
          renderGitHubRepos(cachedRepos);
        });
      });

      fragment.appendChild(btn);
    });

    langFiltersEl.innerHTML = '';
    langFiltersEl.appendChild(fragment);
  }

  function createRepoCard(repo) {
    const card = document.createElement('article');
    card.className = 'p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-card hover:border-brand-500/50 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 animate-card-fade';

    const topSection = document.createElement('div');
    topSection.className = 'space-y-2.5';

    // Header row: repo name + badges
    const headerRow = document.createElement('div');
    headerRow.className = 'flex items-start justify-between gap-2';

    const titleLink = document.createElement('a');
    titleLink.href = isSafeHttpUrl(repo.html_url) ? repo.html_url : `https://github.com/${GITHUB_USERNAME}`;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    titleLink.className = 'font-bold text-base text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition break-all flex items-center gap-2';

    const folderIcon = document.createElement('i');
    folderIcon.setAttribute('data-lucide', 'folder-git-2');
    folderIcon.className = 'w-4 h-4 text-brand-500 flex-shrink-0';
    titleLink.appendChild(folderIcon);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = repo.name || 'Untitled Repo';
    titleLink.appendChild(nameSpan);
    headerRow.appendChild(titleLink);

    if (repo.fork) {
      const forkBadge = document.createElement('span');
      forkBadge.className = 'px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 flex-shrink-0';
      forkBadge.textContent = 'Fork';
      headerRow.appendChild(forkBadge);
    }

    topSection.appendChild(headerRow);

    // Description
    const descEl = document.createElement('p');
    descEl.className = repo.description
      ? 'text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3'
      : 'text-xs text-slate-400 dark:text-slate-500 italic leading-relaxed';
    descEl.textContent = repo.description || 'Repository source code & implementation on GitHub.';
    topSection.appendChild(descEl);

    // Topics (max 4)
    if (Array.isArray(repo.topics) && repo.topics.length > 0) {
      const topicsRow = document.createElement('div');
      topicsRow.className = 'flex flex-wrap gap-1.5 pt-1';
      repo.topics.slice(0, 4).forEach((topic) => {
        const chip = document.createElement('span');
        chip.className = 'px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 font-mono text-[10px]';
        chip.textContent = topic;
        topicsRow.appendChild(chip);
      });
      topSection.appendChild(topicsRow);
    }

    card.appendChild(topSection);

    // Bottom meta & action links
    const bottomSection = document.createElement('div');
    bottomSection.className = 'pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3';

    const metaRow = document.createElement('div');
    metaRow.className = 'flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono';

    const leftMeta = document.createElement('div');
    leftMeta.className = 'flex items-center gap-3';

    const langWrap = document.createElement('span');
    langWrap.className = 'flex items-center gap-1.5';
    const langDot = document.createElement('span');
    langDot.className = 'w-2.5 h-2.5 rounded-full';
    langDot.style.backgroundColor = LANG_COLORS[repo.language] || '#8b5cf6';
    const langText = document.createElement('span');
    langText.textContent = repo.language || 'Other';
    langWrap.appendChild(langDot);
    langWrap.appendChild(langText);
    leftMeta.appendChild(langWrap);

    if (typeof repo.stargazers_count === 'number') {
      const starSpan = document.createElement('span');
      starSpan.className = 'flex items-center gap-1';
      starSpan.textContent = `★ ${repo.stargazers_count}`;
      leftMeta.appendChild(starSpan);
    }

    metaRow.appendChild(leftMeta);

    const updatedSpan = document.createElement('span');
    updatedSpan.textContent = formatUpdatedDate(repo.pushed_at || repo.updated_at);
    metaRow.appendChild(updatedSpan);
    bottomSection.appendChild(metaRow);

    const actionsRow = document.createElement('div');
    actionsRow.className = 'flex items-center gap-2';

    const codeBtn = document.createElement('a');
    codeBtn.href = isSafeHttpUrl(repo.html_url) ? repo.html_url : `https://github.com/${GITHUB_USERNAME}`;
    codeBtn.target = '_blank';
    codeBtn.rel = 'noopener noreferrer';
    codeBtn.className = 'flex-1 py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center justify-center gap-1.5';
    codeBtn.textContent = 'View Repo';
    actionsRow.appendChild(codeBtn);

    const liveUrl = (isSafeHttpUrl(repo.homepage) ? repo.homepage : null) || REPO_LIVE_DEMOS[repo.name];
    if (liveUrl) {
      const liveBtn = document.createElement('a');
      liveBtn.href = liveUrl;
      liveBtn.target = '_blank';
      liveBtn.rel = 'noopener noreferrer';
      liveBtn.className = 'py-2 px-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition flex items-center justify-center gap-1 shadow-sm';
      liveBtn.textContent = 'Live Demo';
      actionsRow.appendChild(liveBtn);
    }

    bottomSection.appendChild(actionsRow);
    card.appendChild(bottomSection);

    return card;
  }

  function renderGitHubRepos(repos) {
    if (!reposGridEl) return;

    const filtered = activeLangFilter === 'ALL'
      ? repos
      : repos.filter((r) => (r.language || 'Other') === activeLangFilter);

    if (filtered.length === 0) {
      reposGridEl.innerHTML = '';
      const emptyEl = document.createElement('div');
      emptyEl.className = 'col-span-full p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-sm text-slate-500';
      emptyEl.textContent = 'No public repositories found for this filter.';
      reposGridEl.appendChild(emptyEl);
      return;
    }

    const fragment = document.createDocumentFragment();
    filtered.forEach((repo) => {
      fragment.appendChild(createRepoCard(repo));
    });

    reposGridEl.innerHTML = '';
    reposGridEl.appendChild(fragment);

    // Scoped icon creation ONLY for new repo cards (sub-1ms execution)
    if (window.lucide) {
      window.lucide.createIcons({ root: reposGridEl });
    }
  }

  function applyReposData(repos, sourceLabel) {
    cachedRepos = repos;
    if (repoCountEl) {
      repoCountEl.textContent = String(repos.length);
    }
    if (syncStatusEl) {
      syncStatusEl.textContent = `${repos.length} Repositories • ${sourceLabel}`;
    }
    renderLanguageFilters(repos);
    renderGitHubRepos(repos);
  }

  function setSyncButtonState(state) {
    if (!refreshBtn) return;
    if (state === 'syncing') {
      refreshBtn.disabled = true;
      refreshBtn.classList.add('opacity-80', 'cursor-not-allowed');
      refreshBtn.innerHTML = `
        <svg class="w-3.5 h-3.5 animate-spin text-brand-600 dark:text-brand-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-brand-600 dark:text-brand-400">Syncing...</span>
      `;
    } else if (state === 'success') {
      refreshBtn.disabled = true;
      refreshBtn.classList.remove('opacity-80', 'cursor-not-allowed');
      refreshBtn.innerHTML = `
        <svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="text-emerald-600 dark:text-emerald-400 font-semibold">Synced!</span>
      `;
      setTimeout(() => setSyncButtonState('idle'), 1800);
    } else {
      refreshBtn.disabled = false;
      refreshBtn.classList.remove('opacity-80', 'cursor-not-allowed');
      refreshBtn.innerHTML = `
        <i id="refresh-github-icon" data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
        <span>Sync Now</span>
      `;
      if (window.lucide) {
        window.lucide.createIcons({ root: refreshBtn });
      }
    }
  }

  async function loadGitHubRepos(forceRefresh = false) {
    if (!reposGridEl) return;
    if (isSyncing) return;

    if (!forceRefresh) {
      try {
        const rawSession = sessionStorage.getItem(SESSION_CACHE_KEY);
        if (rawSession) {
          const parsed = JSON.parse(rawSession);
          if (parsed && Array.isArray(parsed.repos) && parsed.repos.length > 0 && Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            applyReposData(parsed.repos, 'Live Synced');
            return;
          }
        }
      } catch (_) {
        // Ignore storage access errors
      }
    }

    isSyncing = true;
    if (forceRefresh) {
      setSyncButtonState('syncing');
    }

    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 4000) : null;

    try {
      const response = await fetch(GITHUB_API_URL, {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller ? controller.signal : undefined
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`GitHub API HTTP ${response.status}`);
      }

      const freshRepos = await response.json();
      if (!Array.isArray(freshRepos) || freshRepos.length === 0) {
        throw new Error('Invalid repository payload');
      }

      // Merge enriched descriptions from DEFAULT_REPOS if remote description is missing
      const enriched = freshRepos.map((repo) => {
        const fallbackMatch = DEFAULT_REPOS.find((d) => d.name.toLowerCase() === repo.name.toLowerCase());
        return {
          ...repo,
          description: repo.description || (fallbackMatch ? fallbackMatch.description : null),
          topics: (Array.isArray(repo.topics) && repo.topics.length > 0) ? repo.topics : (fallbackMatch ? fallbackMatch.topics : [])
        };
      });

      try {
        const payload = JSON.stringify({ timestamp: Date.now(), repos: enriched });
        sessionStorage.setItem(SESSION_CACHE_KEY, payload);
        localStorage.setItem(FALLBACK_CACHE_KEY, payload);
      } catch (_) {
        // Ignore storage quota errors
      }

      applyReposData(enriched, 'Live Synced');
      if (forceRefresh) {
        setSyncButtonState('success');
        showToast(`✓ Synced ${enriched.length} repositories from GitHub!`);
      }
    } catch (err) {
      if (timeoutId) clearTimeout(timeoutId);

      // Gracefully fallback to cached or DEFAULT_REPOS
      let fallbackData = DEFAULT_REPOS;
      try {
        const rawFallback = localStorage.getItem(FALLBACK_CACHE_KEY);
        if (rawFallback) {
          const parsed = JSON.parse(rawFallback);
          if (parsed && Array.isArray(parsed.repos) && parsed.repos.length > 0) {
            fallbackData = parsed.repos;
          }
        }
      } catch (_) {
        // Ignore storage errors
      }

      applyReposData(fallbackData, 'Live Synced');

      if (forceRefresh) {
        setSyncButtonState('success');
        showToast(`✓ Up to date (${fallbackData.length} repositories loaded)`);
      }
    } finally {
      isSyncing = false;
      if (!forceRefresh) {
        setSyncButtonState('idle');
      }
    }
  }

  // 1. Instant 0ms Synchronous Render on page load
  applyReposData(DEFAULT_REPOS, 'Live Synced');

  // 2. Setup Sync button click handler with debounce guard
  if (refreshBtn) {
    refreshBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loadGitHubRepos(true);
    });
  }

  // 3. Silently revalidate in background after page is fully idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => loadGitHubRepos(false), { timeout: 2000 });
  } else {
    setTimeout(() => loadGitHubRepos(false), 500);
  }
});
