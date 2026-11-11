/**
 * Shakil Jamil Mrida - Developer Portfolio Script
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

  // 7. Interactive Contact Form Handling (FormSubmit + Mailto Fallback)
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formSuccessText = document.getElementById('form-success-text');
  const formError = document.getElementById('form-error');
  const formErrorText = document.getElementById('form-error-text');
  const mailtoFallback = document.getElementById('mailto-fallback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

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
        if (formError && formErrorText) {
          formErrorText.textContent = 'Direct web form delivery requires opening via your live website (https://shakiljamil.github.io) or a local server. Click below to send via your email app.';
          formError.classList.remove('hidden');
        }
        showToast('Open via live URL or use Email App fallback');
        return;
      }

      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        <span>Sending message...</span>
      `;

      try {
        const response = await fetch('https://formsubmit.co/ajax/mafialhasan@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            _subject: subject ? `Portfolio Inquiry: ${subject}` : `New Portfolio Message from ${name}`,
            message,
            _template: 'table'
          })
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true)) {
          contactForm.reset();
          if (formSuccess && formSuccessText) {
            formSuccessText.textContent = 'Thanks for reaching out! Shakil will respond to your email shortly.';
            formSuccess.classList.remove('hidden');
            setTimeout(() => formSuccess.classList.add('hidden'), 7000);
          }
          showToast('Message sent successfully!');
        } else {
          const msg = data?.message || 'Verification may be required in Shakil\'s inbox for the first submission.';
          if (formError && formErrorText) {
            formErrorText.textContent = msg;
            formError.classList.remove('hidden');
          }
          showToast('Please check the notice below the form.');
        }
      } catch (err) {
        if (formError && formErrorText) {
          formErrorText.textContent = 'Network request was blocked or failed. Use the direct email link below to send your message.';
          formError.classList.remove('hidden');
        }
        showToast('Could not send directly — use Email App link.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  // 8. CV Download / Printable Resume Handler
  const downloadCvBtn = document.getElementById('download-cv-btn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      showToast('Opening printable CV view (choose "Save as PDF")');
      setTimeout(() => window.print(), 300);
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
