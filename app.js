/**
 * Shakil Jamil Mrida - Developer Portfolio Script (High-Performance Edition)
 * Handles theme toggling, mobile navigation, project filtering,
 * modal dialogs, and interactive contact form handling.
 * Optimized for instantaneous 60fps interaction and zero layout thrashing.
 */

document.addEventListener('DOMContentLoaded', () => {
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
      li.className = 'flex items-start gap-2';
      li.innerHTML = `
        <span class="text-brand-500 font-bold mt-0.5">•</span>
        <span>${item.trim()}</span>
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
      window.history.replaceState({}, '', window.location.pathname + '#contact');
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

  // 10. Live GitHub Repositories Sync (Auto-Updates Count & Cards)
  const GITHUB_USERNAME = 'ShakilJamil';
  const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=100`;
  const SESSION_CACHE_KEY = 'shakil_github_repos_session_v1';
  const FALLBACK_CACHE_KEY = 'shakil_github_repos_fallback_v1';
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
    Shell: '#89e051'
  };

  const repoCountEl = document.getElementById('github-repo-count');
  const syncStatusEl = document.getElementById('github-sync-status');
  const reposGridEl = document.getElementById('github-repos-grid');
  const langFiltersEl = document.getElementById('github-lang-filters');
  const refreshBtn = document.getElementById('refresh-github-btn');
  const refreshIcon = document.getElementById('refresh-github-icon');

  let cachedRepos = [];
  let activeLangFilter = 'ALL';

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
    langFiltersEl.innerHTML = '';

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
        renderLanguageFilters(cachedRepos);
        renderGitHubRepos(cachedRepos);
      });

      fragment.appendChild(btn);
    });

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

    if (isSafeHttpUrl(repo.homepage)) {
      const liveBtn = document.createElement('a');
      liveBtn.href = repo.homepage;
      liveBtn.target = '_blank';
      liveBtn.rel = 'noopener noreferrer';
      liveBtn.className = 'py-2 px-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition flex items-center justify-center gap-1';
      liveBtn.textContent = 'Live';
      actionsRow.appendChild(liveBtn);
    }

    bottomSection.appendChild(actionsRow);
    card.appendChild(bottomSection);

    return card;
  }

  function renderGitHubRepos(repos) {
    if (!reposGridEl) return;
    reposGridEl.innerHTML = '';

    const filtered = activeLangFilter === 'ALL'
      ? repos
      : repos.filter((r) => (r.language || 'Other') === activeLangFilter);

    if (filtered.length === 0) {
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
    reposGridEl.appendChild(fragment);

    // Scoped icon creation ONLY for new repo cards (sub-1ms execution)
    if (window.lucide) {
      window.lucide.createIcons({ root: reposGridEl });
    }
  }

  function renderGitHubFallback(message) {
    if (repoCountEl && repoCountEl.textContent === '...') {
      repoCountEl.textContent = 'GitHub';
    }
    if (syncStatusEl) {
      syncStatusEl.textContent = message;
    }
    if (!reposGridEl) return;
    reposGridEl.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'col-span-full p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-card text-center space-y-3';

    const text = document.createElement('p');
    text.className = 'text-sm text-slate-600 dark:text-slate-300';
    text.textContent = message;
    card.appendChild(text);

    const link = document.createElement('a');
    link.href = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition';
    link.textContent = 'Browse All Repositories on GitHub';
    card.appendChild(link);

    reposGridEl.appendChild(card);
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

  async function loadGitHubRepos(forceRefresh = false) {
    if (!reposGridEl) return;

    if (!forceRefresh) {
      try {
        const rawSession = sessionStorage.getItem(SESSION_CACHE_KEY);
        if (rawSession) {
          const parsed = JSON.parse(rawSession);
          if (parsed && Array.isArray(parsed.repos) && Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            applyReposData(parsed.repos, 'Live Sync');
            return;
          }
        }
      } catch (_) {
        // Ignore storage access errors
      }
    }

    if (refreshIcon) refreshIcon.classList.add('animate-spin');

    try {
      const response = await fetch(GITHUB_API_URL, {
        headers: { Accept: 'application/vnd.github+json' }
      });

      if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}`);
      }

      const repos = await response.json();
      if (!Array.isArray(repos)) {
        throw new Error('Unexpected GitHub API payload');
      }

      try {
        const payload = JSON.stringify({ timestamp: Date.now(), repos });
        sessionStorage.setItem(SESSION_CACHE_KEY, payload);
        localStorage.setItem(FALLBACK_CACHE_KEY, payload);
      } catch (_) {
        // Ignore storage quota errors
      }

      applyReposData(repos, 'Live Sync');
      if (forceRefresh) {
        showToast(`Synced ${repos.length} repositories from GitHub!`);
      }
    } catch (err) {
      try {
        const rawFallback = localStorage.getItem(FALLBACK_CACHE_KEY);
        if (rawFallback) {
          const parsed = JSON.parse(rawFallback);
          if (parsed && Array.isArray(parsed.repos)) {
            applyReposData(parsed.repos, 'Cached Sync');
            if (forceRefresh) showToast('GitHub rate limit reached; showing cached repos.');
            return;
          }
        }
      } catch (_) {
        // Ignore storage errors
      }

      renderGitHubFallback('Live GitHub preview is temporarily rate-limited. View all repositories directly on GitHub.');
      if (forceRefresh) showToast('Could not refresh from GitHub API right now.');
    } finally {
      if (refreshIcon) refreshIcon.classList.remove('animate-spin');
    }
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loadGitHubRepos(true);
    });
  }

  // Defer GitHub repo load until after initial critical render so UI is instantly responsive
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => loadGitHubRepos(false), { timeout: 1000 });
  } else {
    setTimeout(() => loadGitHubRepos(false), 200);
  }
});
