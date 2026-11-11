/**
 * Alex Carter - Developer Portfolio Script
 * Handles theme toggling, mobile navigation, project filtering,
 * modal dialogs, and interactive contact form handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Dynamic Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Theme Toggle (Dark / Light Mode)
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
    themeToggleBtn.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      if (window.lucide) {
        window.lucide.createIcons();
      }
      showToast(isDark ? 'Switched to Dark Mode' : 'Switched to Light Mode');
    });
  }

  // 4. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking any link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 5. Project Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active style
      filterButtons.forEach(b => b.classList.remove('active', 'bg-brand-600', 'text-white'));
      button.classList.add('active', 'bg-brand-600', 'text-white');

      const filterValue = button.getAttribute('data-filter');

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

  // 6. Project Case Study Modal
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
    highlights.forEach(item => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2';
      li.innerHTML = `
        <span class="text-brand-500 font-bold mt-0.5">•</span>
        <span>${item.trim()}</span>
      `;
      modalHighlights.appendChild(li);
    });

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

  // 7. Interactive Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        <span>Sending message...</span>
      `;

      // Simulate network request
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        contactForm.reset();
        
        if (formSuccess) {
          formSuccess.classList.remove('hidden');
          setTimeout(() => {
            formSuccess.classList.add('hidden');
          }, 6000);
        }

        showToast('Message sent! I will reply shortly.');
        if (window.lucide) window.lucide.createIcons();
      }, 1000);
    });
  }

  // 8. CV Download Simulation / Handler
  const downloadCvBtn = document.getElementById('download-cv-btn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      showToast('Resume ready: replace href with your resume.pdf!');
      // Alternatively, can trigger window.print() or open resume link
    });
  }

  // 9. Toast Notification Utility
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
    }, 3500);
  }
});
