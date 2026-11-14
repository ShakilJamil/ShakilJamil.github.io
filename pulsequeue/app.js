/**
 * PulseQueue - Interactive Web App Client
 * Hybrid Architecture: Real Spring Boot 3 & WebSocket STOMP backend connection
 * with automatic fallback demo mode and LocalStorage persistence when hosted on GitHub Pages!
 */

let stompClient = null;
let currentTicketNumber = 'Q-103';
let selectedSlotId = null;
let isDemoMode = false;

// Default initial database state (used if localStorage is empty)
const DEFAULT_INITIAL_STATE = {
  departments: [
    { id: 1, name: "General Medicine", code: "GEN", description: "Outpatient primary care and general diagnosis" },
    { id: 2, name: "Cardiology", code: "CARD", description: "Cardiovascular health and ECG examinations" },
    { id: 3, name: "Diagnostics & Lab", code: "LAB", description: "Blood work, pathology, and diagnostic imaging" }
  ],
  counters: [
    { id: 1, counterNumber: "Counter 101", department: { id: 1, name: "General Medicine" }, active: true },
    { id: 2, counterNumber: "Counter 102", department: { id: 2, name: "Cardiology" }, active: true },
    { id: 3, counterNumber: "Counter 103", department: { id: 3, name: "Diagnostics & Lab" }, active: true }
  ],
  slots: [
    { id: 101, startTime: '09:00:00', endTime: '09:30:00', department: { id: 1, name: 'General Medicine' }, slotDate: '2026-11-14', version: 0, booked: false },
    { id: 102, startTime: '09:30:00', endTime: '10:00:00', department: { id: 1, name: 'General Medicine' }, slotDate: '2026-11-14', version: 0, booked: false },
    { id: 103, startTime: '10:00:00', endTime: '10:30:00', department: { id: 2, name: 'Cardiology' }, slotDate: '2026-11-14', version: 0, booked: false },
    { id: 104, startTime: '10:30:00', endTime: '11:00:00', department: { id: 2, name: 'Cardiology' }, slotDate: '2026-11-14', version: 0, booked: false },
    { id: 105, startTime: '11:00:00', endTime: '11:30:00', department: { id: 3, name: 'Diagnostics & Lab' }, slotDate: '2026-11-14', version: 0, booked: false },
    { id: 106, startTime: '11:30:00', endTime: '12:00:00', department: { id: 3, name: 'Diagnostics & Lab' }, slotDate: '2026-11-14', version: 0, booked: false },
    { id: 107, startTime: '14:00:00', endTime: '14:30:00', department: { id: 1, name: 'General Medicine' }, slotDate: '2026-11-14', version: 0, booked: false },
    { id: 108, startTime: '14:30:00', endTime: '15:00:00', department: { id: 2, name: 'Cardiology' }, slotDate: '2026-11-14', version: 0, booked: false }
  ],
  nowServing: [
    { id: 1, ticketNumber: "Q-101", counterNumber: "Counter 101", departmentName: "General Medicine", status: "SERVING" },
    { id: 2, ticketNumber: "Q-201", counterNumber: "Counter 102", departmentName: "Cardiology", status: "SERVING" }
  ],
  queue: [
    { id: 3, ticketNumber: "Q-102", customerName: "David Miller", departmentName: "General Medicine", sequenceNumber: 1, issuedAt: "10:15", counterNumber: "Counter 101", status: "WAITING" },
    { id: 4, ticketNumber: "Q-103", customerName: "Alex Rivera", departmentName: "General Medicine", sequenceNumber: 2, issuedAt: "10:22", counterNumber: "Counter 101", status: "WAITING" },
    { id: 5, ticketNumber: "Q-202", customerName: "Sophia Chen", departmentName: "Cardiology", sequenceNumber: 3, issuedAt: "10:28", counterNumber: "Counter 102", status: "WAITING" },
    { id: 6, ticketNumber: "Q-301", customerName: "Marcus Vance", departmentName: "Diagnostics & Lab", sequenceNumber: 4, issuedAt: "10:35", counterNumber: "Counter 103", status: "WAITING" }
  ],
  appointments: [
    { id: 1, appointmentCode: "APT-882910", customerName: "David Miller", departmentName: "General Medicine", time: "09:00", status: "SCHEDULED" },
    { id: 2, appointmentCode: "APT-882911", customerName: "Alex Rivera", departmentName: "General Medicine", time: "09:30", status: "SCHEDULED" },
    { id: 3, appointmentCode: "APT-882912", customerName: "Sophia Chen", departmentName: "Cardiology", time: "10:00", status: "SCHEDULED" }
  ],
  metrics: {
    waiting: 4,
    serving: 2,
    completed: 18,
    avgWait: 12
  }
};

// Load state from localStorage or initialize with defaults
let demoState = loadPersistedState();

function loadPersistedState() {
  try {
    const raw = localStorage.getItem('pulsequeue_state');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (_) {}
  return JSON.parse(JSON.stringify(DEFAULT_INITIAL_STATE));
}

function persistDemoState() {
  try {
    localStorage.setItem('pulsequeue_state', JSON.stringify(demoState));
  } catch (_) {}
}

// Active Authenticated User & Role (Defaults to null: Unauthenticated Guest Mode)
let currentUser = loadPersistedUser();

function loadPersistedUser() {
  try {
    const raw = sessionStorage.getItem('pulsequeue_user');
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

function persistCurrentUser(user) {
  currentUser = user;
  try {
    if (user) {
      sessionStorage.setItem('pulsequeue_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('pulsequeue_user');
    }
  } catch (_) {}
  updateUserHeaderDisplay();
  applyRoleSecurity();
}

// -------------------------------------------------------------
// APP INITIALIZATION
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  if (typeof window !== 'undefined' && window.lucide) window.lucide.createIcons();

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
    });
  }

  const datePicker = document.getElementById('date-select');
  if (datePicker) {
    const today = new Date().toISOString().split('T')[0];
    datePicker.value = today;
  }
  const slotDatePicker = document.getElementById('slot-date');
  if (slotDatePicker) {
    const today = new Date().toISOString().split('T')[0];
    slotDatePicker.value = today;
  }

  updateUserHeaderDisplay();
  applyRoleSecurity();

  initWebSockets();
  loadDepartments();
  loadSlots();
  loadCounters();
  loadStaffQueue();
  loadTvDisplay();
  loadMetrics();
  loadAdminData();
});

// -------------------------------------------------------------
// USER INTERFACE & AUTHENTICATION
// -------------------------------------------------------------
function updateUserHeaderDisplay() {
  const authSlot = document.getElementById('user-auth-slot');
  if (!authSlot) return;

  if (!currentUser) {
    // Unauthenticated Guest View
    authSlot.innerHTML = `
      <button onclick="openAuthModal()" title="Sign In with Spring Security" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-brand-500/30 bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 transition shadow-sm cursor-pointer">
        <i data-lucide="lock" class="w-3.5 h-3.5"></i>
        <span>Sign In</span>
      </button>
    `;
  } else {
    // Authenticated User View
    const roleColor = currentUser.role === 'ROLE_ADMIN' ? 'bg-amber-400' :
                      currentUser.role === 'ROLE_STAFF' ? 'bg-cyan-400' : 'bg-emerald-400';
    const roleBadgeClass = currentUser.role === 'ROLE_ADMIN' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                           currentUser.role === 'ROLE_STAFF' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' :
                           'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';

    authSlot.innerHTML = `
      <div class="flex items-center gap-1.5">
        <div class="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-card shadow-sm">
          <span class="w-2 h-2 rounded-full ${roleColor}"></span>
          <span class="font-bold text-[11px] text-slate-800 dark:text-slate-200">${currentUser.name || currentUser.email}</span>
          <span class="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${roleBadgeClass}">${currentUser.role}</span>
        </div>
        <button onclick="logout()" title="Sign Out" class="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-rose-500/10 hover:border-rose-500 text-slate-500 hover:text-rose-500 transition cursor-pointer">
          <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
  }

  if (typeof window !== 'undefined' && window.lucide) window.lucide.createIcons();
}

function applyRoleSecurity() {
  // Admin Guard
  const adminGate = document.getElementById('admin-security-gate');
  const adminContent = document.getElementById('admin-main-content');
  if (adminGate && adminContent) {
    if (currentUser && currentUser.role === 'ROLE_ADMIN') {
      adminGate.classList.add('hidden');
      adminContent.classList.remove('hidden');
    } else {
      adminGate.classList.remove('hidden');
      adminContent.classList.add('hidden');
    }
  }

  // Staff Guard
  const staffGate = document.getElementById('staff-security-gate');
  const staffContent = document.getElementById('staff-main-content');
  if (staffGate && staffContent) {
    if (currentUser && (currentUser.role === 'ROLE_STAFF' || currentUser.role === 'ROLE_ADMIN')) {
      staffGate.classList.add('hidden');
      staffContent.classList.remove('hidden');
    } else {
      staffGate.classList.remove('hidden');
      staffContent.classList.add('hidden');
    }
  }
}

function openAuthModal() {
  document.getElementById('auth-modal')?.classList.remove('hidden');
  const errorMsg = document.getElementById('auth-error-msg');
  if (errorMsg) errorMsg.classList.add('hidden');
}

function closeAuthModal() {
  document.getElementById('auth-modal')?.classList.add('hidden');
}

function fillPulseQueueCreds(email, password) {
  const emailInput = document.getElementById('auth-email');
  const passInput = document.getElementById('auth-password');
  if (emailInput) emailInput.value = email;
  if (passInput) passInput.value = password;
  const errorMsg = document.getElementById('auth-error-msg');
  if (errorMsg) errorMsg.classList.add('hidden');
}

async function handleCustomLogin(e) {
  e.preventDefault();
  const email = (document.getElementById('auth-email')?.value || '').trim();
  const password = (document.getElementById('auth-password')?.value || '').trim();
  const errorMsg = document.getElementById('auth-error-msg');
  const errorText = document.getElementById('auth-error-text');

  if (errorMsg) errorMsg.classList.add('hidden');

  // Attempt real Spring Security backend endpoint if running locally
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      const data = await res.json();
      persistCurrentUser({
        name: data.fullName || email.split('@')[0],
        email: data.email || email,
        role: data.role || 'ROLE_CUSTOMER',
        token: data.token
      });
      closeAuthModal();
      showToast(`Welcome ${data.fullName || email}! Authenticated successfully.`);
      return;
    }
  } catch (_) {
    // API offline, fall through to client-side credential table
  }

  // Pre-configured verified test credentials
  const ACCOUNTS = {
    'admin@pulsequeue.io': { pass: 'Admin@123', name: 'Dr. Shakil (Admin)', role: 'ROLE_ADMIN' },
    'admin@pulsequeue.dev': { pass: 'Admin@123', name: 'Dr. Shakil (Admin)', role: 'ROLE_ADMIN' },
    'staff@pulsequeue.io': { pass: 'Staff@123', name: 'Staff Nurse Emily', role: 'ROLE_STAFF' },
    'staff1@pulsequeue.dev': { pass: 'Staff@123', name: 'Staff Nurse Emily', role: 'ROLE_STAFF' },
    'patient@pulsequeue.io': { pass: 'User@123', name: 'Patient Alex Rivera', role: 'ROLE_CUSTOMER' },
    'customer@pulsequeue.dev': { pass: 'User@123', name: 'Patient Alex Rivera', role: 'ROLE_CUSTOMER' }
  };

  const account = ACCOUNTS[email.toLowerCase()];
  if (!account || account.pass !== password) {
    if (errorMsg) {
      if (errorText) errorText.textContent = 'Invalid credentials. Password or email does not match authorized accounts.';
      errorMsg.classList.remove('hidden');
    }
    return;
  }

  // Password verified successfully
  persistCurrentUser({
    name: account.name,
    email: email,
    role: account.role,
    token: `bearer-jwt-${account.role.toLowerCase()}-${Date.now()}`
  });

  closeAuthModal();
  showToast(`Authenticated as ${account.role} (${account.name})`);

  if (account.role === 'ROLE_ADMIN') {
    loadAdminData();
  }
}

function logout() {
  persistCurrentUser(null);
  showToast('Signed out. Switched to Guest Mode.');
  switchTab('booking');
}

// -------------------------------------------------------------
// WEBSOCKET STOMP REAL-TIME CONNECTION
// -------------------------------------------------------------
function initWebSockets() {
  try {
    const socket = new SockJS('/ws-queue');
    stompClient = Stomp.over(socket);
    stompClient.debug = null;

    stompClient.connect({}, (frame) => {
      isDemoMode = false;
      stompClient.subscribe('/topic/queue-updates', (message) => {
        const payload = JSON.parse(message.body);
        handleLiveQueueUpdate(payload);
      });
    }, () => {
      isDemoMode = true;
    });
  } catch (ex) {
    isDemoMode = true;
  }
}

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now); // E5
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.6);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.00, now + 0.3); // A5
    gain2.gain.setValueAtTime(0.3, now + 0.3);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.3);
    osc2.stop(now + 1.2);
  } catch (_) {}
}

function handleLiveQueueUpdate(payload) {
  playChime();

  const banner = document.getElementById('live-broadcast-banner');
  const bannerTitle = document.getElementById('banner-title');
  const bannerDesc = document.getElementById('banner-desc');

  if (banner && payload.ticket) {
    bannerTitle.textContent = `Ticket ${payload.ticket.ticketNumber} ${payload.eventType === 'TICKET_CALLED' ? 'Called!' : 'Updated'}`;
    bannerDesc.textContent = `Proceed to ${payload.counterNumber || 'assigned station'} (${payload.ticket.departmentName})`;
    banner.classList.remove('hidden');

    setTimeout(() => {
      banner.classList.add('hidden');
    }, 8000);
  }

  loadTvDisplay();
  loadStaffQueue();
  loadMetrics();
  loadAdminData();

  if (payload.ticket && payload.ticket.ticketNumber === currentTicketNumber) {
    updateMyTicketDisplay(payload.ticket);
  }
}

// -------------------------------------------------------------
// TAB NAVIGATION
// -------------------------------------------------------------
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
  document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active', 'bg-brand-600', 'text-white'));

  const activeContent = document.getElementById('tab-' + tabId);
  const activeNav = document.getElementById('nav-' + tabId);

  if (activeContent) activeContent.classList.remove('hidden');
  if (activeNav) activeNav.classList.add('active', 'bg-brand-600', 'text-white');

  applyRoleSecurity();

  if (typeof window !== 'undefined' && window.lucide) window.lucide.createIcons();

  if (tabId === 'tv') loadTvDisplay();
  if (tabId === 'staff') loadStaffQueue();
  if (tabId === 'analytics') loadMetrics();
  if (tabId === 'admin') loadAdminData();
}

// -------------------------------------------------------------
// CLINIC DEPARTMENTS
// -------------------------------------------------------------
async function loadDepartments() {
  try {
    const res = await fetch('/api/departments');
    if (!res.ok) throw new Error('API offline');
    const depts = await res.json();
    populateDepartmentSelects(depts);
  } catch (_) {
    isDemoMode = true;
    populateDepartmentSelects(demoState.departments);
  }
}

function populateDepartmentSelects(depts) {
  const selectBooking = document.getElementById('department-select');
  const selectCounter = document.getElementById('counter-dept-select');
  const selectSlot = document.getElementById('slot-dept-select');

  if (selectBooking) {
    selectBooking.innerHTML = '<option value="">All Departments</option>';
    depts.forEach(d => {
      selectBooking.innerHTML += `<option value="${d.id}">${d.name}</option>`;
    });
  }

  if (selectCounter) {
    selectCounter.innerHTML = '';
    depts.forEach(d => {
      selectCounter.innerHTML += `<option value="${d.id}">${d.name} (${d.code})</option>`;
    });
  }

  if (selectSlot) {
    selectSlot.innerHTML = '';
    depts.forEach(d => {
      selectSlot.innerHTML += `<option value="${d.id}">${d.name}</option>`;
    });
  }
}

// -------------------------------------------------------------
// TIME SLOTS (OPTIMISTIC LOCKING)
// -------------------------------------------------------------
async function loadSlots() {
  const deptId = document.getElementById('department-select')?.value || '';
  const date = document.getElementById('date-select')?.value || '';
  const grid = document.getElementById('slots-grid');
  const badge = document.getElementById('slot-count-badge');

  if (!grid) return;
  grid.innerHTML = '<div class="col-span-full py-8 text-center text-xs text-slate-400">Loading slots...</div>';

  try {
    const res = await fetch(`/api/slots?departmentId=${deptId}&date=${date}`);
    if (!res.ok) throw new Error('API offline');
    const slots = await res.json();
    renderSlots(slots);
  } catch (_) {
    isDemoMode = true;
    const filtered = demoState.slots
      .filter(s => !s.booked)
      .filter(s => {
        if (!deptId) return true;
        return s.department.id == deptId;
      });
    renderSlots(filtered);
  }
}

function renderSlots(slots) {
  const grid = document.getElementById('slots-grid');
  const badge = document.getElementById('slot-count-badge');
  if (badge) badge.textContent = `${slots.length} slots available`;

  if (slots.length === 0) {
    grid.innerHTML = '<div class="col-span-full py-8 text-center text-xs text-slate-400">No open slots for this selection. Try another date or department!</div>';
    return;
  }

  grid.innerHTML = '';
  slots.forEach(slot => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-card hover:border-brand-500 hover:shadow-lg transition cursor-pointer flex flex-col justify-between space-y-2';
    card.onclick = () => openBookingModal(slot);

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-bold text-brand-600 dark:text-brand-400">${slot.startTime.substring(0, 5)}</span>
        <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-500">Available</span>
      </div>
      <div>
        <h4 class="font-bold text-xs text-slate-800 dark:text-slate-200">${slot.department.name}</h4>
        <p class="text-[10px] text-slate-400 font-mono">Guarded: @Version ${slot.version || 0}</p>
      </div>
      <button class="w-full py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-700 dark:text-slate-300 font-semibold text-[11px] transition">
        Reserve Slot
      </button>
    `;
    grid.appendChild(card);
  });
}

function openBookingModal(slot) {
  selectedSlotId = slot.id;
  document.getElementById('modal-dept').textContent = slot.department.name;
  document.getElementById('modal-time').textContent = `${slot.slotDate} at ${slot.startTime.substring(0, 5)}`;
  document.getElementById('booking-modal').classList.remove('hidden');
}

function closeBookingModal() {
  document.getElementById('booking-modal').classList.add('hidden');
  selectedSlotId = null;
}

async function confirmBooking() {
  if (!selectedSlotId) return;

  const confirmBtn = document.getElementById('modal-confirm-btn');
  confirmBtn.disabled = true;
  confirmBtn.textContent = 'Guarding Slot with Optimistic Lock...';

  try {
    const bookRes = await fetch('/api/appointments/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      },
      body: JSON.stringify({ slotId: selectedSlotId, notes: document.getElementById('booking-notes')?.value || 'General consultation' })
    });

    if (bookRes.ok) {
      const apt = await bookRes.json();
      closeBookingModal();
      showToast(`Appointment ${apt.appointmentCode} reserved!`);
      loadSlots();
      switchTab('my-ticket');
    } else {
      throw new Error('API failure');
    }
  } catch (_) {
    // Demo Mode handling on GitHub Pages
    setTimeout(() => {
      const newTicketNumber = 'Q-' + (100 + demoState.queue.length + 1);
      currentTicketNumber = newTicketNumber;

      const deptName = document.getElementById('modal-dept').textContent || 'General Medicine';
      const slot = demoState.slots.find(s => s.id == selectedSlotId);
      if (slot) {
        slot.booked = true;
        slot.version = (slot.version || 0) + 1; // Increment @Version
      }

      const newTicket = {
        id: Date.now(),
        ticketNumber: newTicketNumber,
        customerName: currentUser.name || 'Demo Patient',
        departmentName: deptName,
        counterNumber: 'Counter 101',
        status: 'WAITING',
        sequenceNumber: demoState.queue.length + 1,
        issuedAt: new Date().toLocaleTimeString().substring(0, 5)
      };

      demoState.queue.push(newTicket);
      demoState.appointments.push({
        id: Date.now(),
        appointmentCode: 'APT-' + Math.floor(100000 + Math.random() * 900000),
        customerName: currentUser.name || 'Demo Patient',
        departmentName: deptName,
        time: slot ? slot.startTime.substring(0, 5) : '10:00',
        status: 'SCHEDULED'
      });
      demoState.metrics.waiting += 1;
      persistDemoState();

      closeBookingModal();
      updateMyTicketDisplay({ ...newTicket, waitingAheadCount: demoState.queue.length - 1 });
      showToast(`Appointment confirmed! Ticket ${newTicketNumber} issued.`);
      switchTab('my-ticket');
      loadSlots();
      loadStaffQueue();
      loadMetrics();
      loadAdminData();
    }, 350);
  } finally {
    confirmBtn.disabled = false;
    confirmBtn.textContent = 'Confirm & Issue Ticket';
  }
}

async function issueWalkin() {
  try {
    const res = await fetch('/api/queue/walkin?departmentId=1', { method: 'POST' });
    if (!res.ok) throw new Error('Offline');
    const ticket = await res.json();
    currentTicketNumber = ticket.ticketNumber;
    updateMyTicketDisplay(ticket);
    showToast(`Walk-in Ticket ${ticket.ticketNumber} Issued!`);
    switchTab('my-ticket');
  } catch (_) {
    const newNum = 'Q-' + (100 + demoState.queue.length + 1);
    currentTicketNumber = newNum;
    const ticket = {
      id: Date.now(),
      ticketNumber: newNum,
      customerName: 'Walk-in Patient',
      departmentName: 'General Medicine',
      counterNumber: 'Counter 101',
      status: 'WAITING',
      sequenceNumber: demoState.queue.length + 1,
      issuedAt: new Date().toLocaleTimeString().substring(0, 5),
      waitingAheadCount: demoState.queue.length
    };
    demoState.queue.push(ticket);
    demoState.metrics.waiting += 1;
    persistDemoState();

    updateMyTicketDisplay(ticket);
    showToast(`Walk-in Ticket ${newNum} Issued!`);
    switchTab('my-ticket');
    loadStaffQueue();
    loadMetrics();
    loadAdminData();
  }
}

function updateMyTicketDisplay(ticket) {
  const numEl = document.getElementById('ticket-number-display');
  const deptEl = document.getElementById('ticket-department-display');
  const aheadEl = document.getElementById('ticket-ahead-display');
  const waitEl = document.getElementById('ticket-wait-display');
  const counterEl = document.getElementById('ticket-counter-display');
  const statusPill = document.getElementById('ticket-status-pill');

  if (numEl) numEl.textContent = ticket.ticketNumber;
  if (deptEl) deptEl.textContent = ticket.departmentName;
  if (aheadEl) aheadEl.textContent = ticket.waitingAheadCount || '0';
  if (waitEl) waitEl.textContent = `~${(ticket.waitingAheadCount || 0) * 8}m`;
  if (counterEl) counterEl.textContent = ticket.counterNumber || 'Counter 101';
  if (statusPill) statusPill.innerHTML = `<span>Status: ${ticket.status || 'WAITING'}</span>`;
}

// -------------------------------------------------------------
// STAFF DESK OPERATIONS
// -------------------------------------------------------------
async function loadCounters() {
  const select = document.getElementById('staff-counter-select');
  if (!select) return;

  try {
    const res = await fetch('/api/queue/counters');
    if (!res.ok) throw new Error('Offline');
    const counters = await res.json();
    populateStaffCounters(counters);
  } catch (_) {
    populateStaffCounters(demoState.counters.filter(c => c.active));
  }
}

function populateStaffCounters(counters) {
  const select = document.getElementById('staff-counter-select');
  if (!select) return;
  select.innerHTML = '';
  counters.forEach(c => {
    select.innerHTML += `<option value="${c.id}">${c.counterNumber} - ${c.department.name}</option>`;
  });
}

async function loadStaffQueue() {
  const tbody = document.getElementById('staff-queue-tbody');
  if (!tbody) return;

  try {
    const res = await fetch('/api/queue/active');
    if (!res.ok) throw new Error('Offline');
    const tickets = await res.json();
    renderStaffTable(tickets);
  } catch (_) {
    renderStaffTable(demoState.queue);
  }
}

function renderStaffTable(tickets) {
  const tbody = document.getElementById('staff-queue-tbody');
  if (!tbody) return;

  if (tickets.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="py-6 text-center text-slate-400">Queue is empty! All patients served.</td></tr>';
    return;
  }

  tbody.innerHTML = '';
  tickets.forEach((t, i) => {
    tbody.innerHTML += `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-900 transition">
        <td class="py-3 px-4 font-mono font-bold text-brand-600">${t.ticketNumber}</td>
        <td class="py-3 px-4">${t.customerName || 'Patient'}</td>
        <td class="py-3 px-4">${t.departmentName}</td>
        <td class="py-3 px-4 font-mono">#${i + 1} in line</td>
        <td class="py-3 px-4 text-slate-400">${t.issuedAt ? String(t.issuedAt).substring(0, 5) : 'Now'}</td>
      </tr>
    `;
  });
}

async function callNextCustomer() {
  const counterSelect = document.getElementById('staff-counter-select');
  const counterId = counterSelect?.value || 1;
  const counterText = counterSelect?.options[counterSelect.selectedIndex]?.text.split(' - ')[0] || 'Counter 101';

  try {
    const res = await fetch('/api/queue/call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      },
      body: JSON.stringify({ counterId })
    });

    if (res.ok) {
      const ticket = await res.json();
      document.getElementById('staff-now-serving').textContent = ticket.ticketNumber;
      showToast(`Called Ticket ${ticket.ticketNumber} to counter!`);
    } else {
      throw new Error('Call failed');
    }
  } catch (_) {
    if (demoState.queue.length === 0) {
      showToast('No more patients waiting in queue.');
      return;
    }

    const called = demoState.queue.shift();
    demoState.nowServing = demoState.nowServing.filter(s => s.counterNumber !== counterText);
    demoState.nowServing.unshift({
      id: called.id,
      ticketNumber: called.ticketNumber,
      counterNumber: counterText,
      departmentName: called.departmentName,
      status: 'SERVING'
    });

    demoState.metrics.waiting = Math.max(0, demoState.metrics.waiting - 1);
    demoState.metrics.serving = demoState.nowServing.length;
    persistDemoState();

    document.getElementById('staff-now-serving').textContent = called.ticketNumber;

    handleLiveQueueUpdate({
      eventType: 'TICKET_CALLED',
      counterNumber: counterText,
      ticket: called
    });

    showToast(`Called Ticket ${called.ticketNumber} to ${counterText}!`);
    loadStaffQueue();
    loadTvDisplay();
    loadMetrics();
    loadAdminData();
  }
}

async function completeCurrentTicket() {
  const servingEl = document.getElementById('staff-now-serving');
  const currentTicket = servingEl.textContent;

  if (!currentTicket || currentTicket === 'Ready') {
    showToast('No active consultation to complete.');
    return;
  }

  demoState.nowServing = demoState.nowServing.filter(t => t.ticketNumber !== currentTicket);
  demoState.metrics.completed += 1;
  demoState.metrics.serving = Math.max(0, demoState.metrics.serving - 1);
  persistDemoState();

  servingEl.textContent = 'Ready';
  showToast(`Ticket ${currentTicket} marked as COMPLETED.`);

  loadTvDisplay();
  loadStaffQueue();
  loadMetrics();
  loadAdminData();
}

async function skipCurrentTicket() {
  const servingEl = document.getElementById('staff-now-serving');
  const currentTicket = servingEl.textContent;

  if (!currentTicket || currentTicket === 'Ready') {
    showToast('No active consultation selected.');
    return;
  }

  demoState.nowServing = demoState.nowServing.filter(t => t.ticketNumber !== currentTicket);
  demoState.metrics.serving = Math.max(0, demoState.metrics.serving - 1);
  persistDemoState();

  servingEl.textContent = 'Ready';
  showToast(`Ticket ${currentTicket} marked as NO-SHOW.`);

  loadTvDisplay();
  loadStaffQueue();
  loadMetrics();
  loadAdminData();
}

// -------------------------------------------------------------
// TV SIGNAGE DISPLAY
// -------------------------------------------------------------
async function loadTvDisplay() {
  const grid = document.getElementById('tv-serving-grid');
  if (!grid) return;

  try {
    const res = await fetch('/api/queue/serving');
    if (!res.ok) throw new Error('Offline');
    const tickets = await res.json();
    renderTvGrid(tickets);
  } catch (_) {
    renderTvGrid(demoState.nowServing);
  }
}

function renderTvGrid(tickets) {
  const grid = document.getElementById('tv-serving-grid');
  if (!grid) return;

  grid.innerHTML = '';
  if (tickets.length === 0) {
    grid.innerHTML = '<div class="col-span-full py-12 text-center text-slate-400 font-mono">No active consultations at this moment.</div>';
    return;
  }

  tickets.forEach(t => {
    grid.innerHTML += `
      <div class="p-8 rounded-3xl border-2 border-emerald-500/40 bg-white dark:bg-dark-card shadow-2xl text-center space-y-3 pulse-glow animate-card-fade">
        <span class="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold">Calling Now</span>
        <div class="text-6xl font-black font-mono tracking-wider text-slate-900 dark:text-white">${t.ticketNumber}</div>
        <div class="py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-brand-600 font-mono">
          ${t.counterNumber || 'Counter 101'}
        </div>
        <p class="text-xs text-slate-400">${t.departmentName}</p>
      </div>
    `;
  });
}

// -------------------------------------------------------------
// METRICS & ANALYTICS
// -------------------------------------------------------------
async function loadMetrics() {
  try {
    const res = await fetch('/api/analytics/live');
    if (!res.ok) throw new Error('Offline');
    const data = await res.json();
    renderMetrics(data);
  } catch (_) {
    renderMetrics({
      totalWaiting: demoState.metrics.waiting,
      totalServing: demoState.metrics.serving,
      totalCompletedToday: demoState.metrics.completed,
      averageWaitTimeMinutes: demoState.metrics.waiting * 6
    });
  }
}

function renderMetrics(data) {
  const w = document.getElementById('metric-waiting');
  const s = document.getElementById('metric-serving');
  const c = document.getElementById('metric-completed');
  const a = document.getElementById('metric-avg-wait');

  if (w) w.textContent = data.totalWaiting;
  if (s) s.textContent = data.totalServing;
  if (c) c.textContent = data.totalCompletedToday;
  if (a) a.textContent = `${Math.round(data.averageWaitTimeMinutes)}m`;
}

// -------------------------------------------------------------
// ADMIN CRUD CONTROLLER & DATABASE INSPECTOR
// -------------------------------------------------------------
async function loadAdminData() {
  if (currentUser.role !== 'ROLE_ADMIN') return;
  loadAdminDepartments();
  loadAdminCounters();
  loadAdminSlots();
  loadAdminAudit();
  updateAdminStats();
}

function updateAdminStats() {
  const dEl = document.getElementById('stat-dept-count');
  const cEl = document.getElementById('stat-counter-count');
  const sEl = document.getElementById('stat-slot-count');
  const tEl = document.getElementById('stat-ticket-count');

  if (dEl) dEl.textContent = demoState.departments.length;
  if (cEl) cEl.textContent = demoState.counters.length;
  if (sEl) sEl.textContent = demoState.slots.length;
  if (tEl) tEl.textContent = demoState.queue.length + demoState.nowServing.length;
}

// 1. Departments CRUD
async function loadAdminDepartments() {
  const tbody = document.getElementById('admin-dept-tbody');
  if (!tbody) return;

  try {
    const res = await fetch('/api/admin/departments', {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
    if (res.ok) {
      const data = await res.json();
      demoState.departments = data;
    }
  } catch (_) {}

  renderAdminDepartmentsTable();
}

function renderAdminDepartmentsTable() {
  const tbody = document.getElementById('admin-dept-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  demoState.departments.forEach(d => {
    tbody.innerHTML += `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-900 transition">
        <td class="py-3 px-4 font-mono text-slate-400">#${d.id}</td>
        <td class="py-3 px-4 font-mono font-bold text-brand-600 dark:text-brand-400">${d.code}</td>
        <td class="py-3 px-4 font-bold text-slate-900 dark:text-white">${d.name}</td>
        <td class="py-3 px-4 text-slate-500 max-w-xs truncate">${d.description || 'General Clinic'}</td>
        <td class="py-3 px-4 text-right space-x-1">
          <button onclick="editDepartment(${d.id})" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-700 dark:text-slate-300 font-semibold text-[11px] transition">Edit</button>
          <button onclick="deleteDepartment(${d.id})" class="px-2.5 py-1 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white font-semibold text-[11px] transition">Delete</button>
        </td>
      </tr>
    `;
  });
  if (typeof window !== 'undefined' && window.lucide) window.lucide.createIcons();
}

function openDepartmentModal(deptId = null) {
  document.getElementById('dept-modal-id').value = deptId || '';
  document.getElementById('dept-modal-title').textContent = deptId ? 'Edit Department' : 'Add New Department';

  if (deptId) {
    const dept = demoState.departments.find(d => d.id == deptId);
    if (dept) {
      document.getElementById('dept-name').value = dept.name;
      document.getElementById('dept-code').value = dept.code;
      document.getElementById('dept-desc').value = dept.description || '';
    }
  } else {
    document.getElementById('dept-name').value = '';
    document.getElementById('dept-code').value = '';
    document.getElementById('dept-desc').value = '';
  }

  document.getElementById('dept-modal').classList.remove('hidden');
}

function closeDepartmentModal() {
  document.getElementById('dept-modal').classList.add('hidden');
}

function editDepartment(id) {
  openDepartmentModal(id);
}

async function saveDepartment() {
  const id = document.getElementById('dept-modal-id').value;
  const name = document.getElementById('dept-name').value.trim();
  const code = document.getElementById('dept-code').value.trim().toUpperCase();
  const desc = document.getElementById('dept-desc').value.trim();

  if (!name || !code) {
    showToast('Department name and code are required!');
    return;
  }

  try {
    const endpoint = id ? `/api/admin/departments/${id}` : '/api/admin/departments';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      },
      body: JSON.stringify({ name, code, description: desc })
    });
    if (res.ok) {
      const saved = await res.json();
      if (id) {
        const idx = demoState.departments.findIndex(d => d.id == id);
        if (idx !== -1) demoState.departments[idx] = saved;
      } else {
        demoState.departments.push(saved);
      }
    } else {
      throw new Error('Offline');
    }
  } catch (_) {
    if (id) {
      const dept = demoState.departments.find(d => d.id == id);
      if (dept) {
        dept.name = name;
        dept.code = code;
        dept.description = desc;
      }
    } else {
      demoState.departments.push({
        id: Date.now(),
        name,
        code,
        description: desc
      });
    }
  }

  persistDemoState();
  closeDepartmentModal();
  renderAdminDepartmentsTable();
  populateDepartmentSelects(demoState.departments);
  updateAdminStats();
  showToast(`Department "${name}" saved successfully!`);
}

async function deleteDepartment(id) {
  if (!confirm('Are you sure you want to delete this department?')) return;

  try {
    await fetch(`/api/admin/departments/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
  } catch (_) {}

  demoState.departments = demoState.departments.filter(d => d.id != id);
  persistDemoState();
  renderAdminDepartmentsTable();
  populateDepartmentSelects(demoState.departments);
  updateAdminStats();
  showToast('Department deleted.');
}

// 2. Counters CRUD
async function loadAdminCounters() {
  const tbody = document.getElementById('admin-counter-tbody');
  if (!tbody) return;

  try {
    const res = await fetch('/api/admin/counters', {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
    if (res.ok) {
      demoState.counters = await res.json();
    }
  } catch (_) {}

  renderAdminCountersTable();
}

function renderAdminCountersTable() {
  const tbody = document.getElementById('admin-counter-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  demoState.counters.forEach(c => {
    const isActive = c.active !== false;
    tbody.innerHTML += `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-900 transition">
        <td class="py-3 px-4 font-mono text-slate-400">#${c.id}</td>
        <td class="py-3 px-4 font-bold text-slate-900 dark:text-white font-mono">${c.counterNumber}</td>
        <td class="py-3 px-4 text-slate-700 dark:text-slate-300">${c.department?.name || 'General'}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${isActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-400'}">
            ${isActive ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td class="py-3 px-4 text-right space-x-1">
          <button onclick="toggleCounter(${c.id})" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-700 dark:text-slate-300 font-semibold text-[11px] transition">
            ${isActive ? 'Deactivate' : 'Activate'}
          </button>
          <button onclick="deleteCounter(${c.id})" class="px-2.5 py-1 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white font-semibold text-[11px] transition">Delete</button>
        </td>
      </tr>
    `;
  });
}

function openCounterModal() {
  populateDepartmentSelects(demoState.departments);
  document.getElementById('counter-name').value = 'Counter ' + (100 + demoState.counters.length + 1);
  document.getElementById('counter-modal').classList.remove('hidden');
}

function closeCounterModal() {
  document.getElementById('counter-modal').classList.add('hidden');
}

async function saveCounter() {
  const name = document.getElementById('counter-name').value.trim();
  const deptId = document.getElementById('counter-dept-select').value;
  const dept = demoState.departments.find(d => d.id == deptId) || demoState.departments[0];

  if (!name) {
    showToast('Counter name is required!');
    return;
  }

  const newCounter = {
    id: Date.now(),
    counterNumber: name,
    department: dept,
    active: true
  };

  try {
    const res = await fetch('/api/admin/counters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      },
      body: JSON.stringify(newCounter)
    });
    if (res.ok) {
      demoState.counters.push(await res.json());
    } else {
      throw new Error('Offline');
    }
  } catch (_) {
    demoState.counters.push(newCounter);
  }

  persistDemoState();
  closeCounterModal();
  renderAdminCountersTable();
  populateStaffCounters(demoState.counters.filter(c => c.active));
  updateAdminStats();
  showToast(`Counter "${name}" created!`);
}

async function toggleCounter(id) {
  try {
    await fetch(`/api/admin/counters/${id}/toggle`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
  } catch (_) {}

  const counter = demoState.counters.find(c => c.id == id);
  if (counter) {
    counter.active = !counter.active;
    persistDemoState();
    renderAdminCountersTable();
    populateStaffCounters(demoState.counters.filter(c => c.active));
    showToast(`Counter ${counter.counterNumber} status updated.`);
  }
}

async function deleteCounter(id) {
  if (!confirm('Delete this service counter?')) return;

  try {
    await fetch(`/api/admin/counters/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
  } catch (_) {}

  demoState.counters = demoState.counters.filter(c => c.id != id);
  persistDemoState();
  renderAdminCountersTable();
  populateStaffCounters(demoState.counters.filter(c => c.active));
  updateAdminStats();
  showToast('Counter deleted.');
}

// 3. Time Slots CRUD
async function loadAdminSlots() {
  const tbody = document.getElementById('admin-slot-tbody');
  if (!tbody) return;

  try {
    const res = await fetch('/api/admin/slots', {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
    if (res.ok) {
      demoState.slots = await res.json();
    }
  } catch (_) {}

  renderAdminSlotsTable();
}

function renderAdminSlotsTable() {
  const tbody = document.getElementById('admin-slot-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  demoState.slots.forEach(s => {
    tbody.innerHTML += `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-900 transition">
        <td class="py-3 px-4 font-mono text-slate-400">#${s.id}</td>
        <td class="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">${s.department?.name || 'Clinic'}</td>
        <td class="py-3 px-4 text-slate-500 font-mono">${s.slotDate || 'Today'}</td>
        <td class="py-3 px-4 font-mono font-bold text-brand-600">${s.startTime?.substring(0, 5)} - ${s.endTime?.substring(0, 5) || '15m'}</td>
        <td class="py-3 px-4 font-mono text-amber-500 font-bold">@Version ${s.version || 0}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${s.booked ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-500'}">
            ${s.booked ? 'Booked' : 'Available'}
          </span>
        </td>
        <td class="py-3 px-4 text-right">
          <button onclick="deleteSlot(${s.id})" class="px-2.5 py-1 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white font-semibold text-[11px] transition">Delete</button>
        </td>
      </tr>
    `;
  });
}

function openSlotModal() {
  populateDepartmentSelects(demoState.departments);
  document.getElementById('slot-modal').classList.remove('hidden');
}

function closeSlotModal() {
  document.getElementById('slot-modal').classList.add('hidden');
}

async function saveSlot() {
  const deptId = document.getElementById('slot-dept-select').value;
  const slotDate = document.getElementById('slot-date').value || new Date().toISOString().split('T')[0];
  const startTime = document.getElementById('slot-start').value + ':00';
  const endTime = document.getElementById('slot-end').value + ':00';
  const dept = demoState.departments.find(d => d.id == deptId) || demoState.departments[0];

  const newSlot = {
    id: Date.now(),
    department: dept,
    slotDate,
    startTime,
    endTime,
    version: 0,
    booked: false
  };

  try {
    const res = await fetch('/api/admin/slots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      },
      body: JSON.stringify(newSlot)
    });
    if (res.ok) {
      demoState.slots.push(await res.json());
    } else {
      throw new Error('Offline');
    }
  } catch (_) {
    demoState.slots.push(newSlot);
  }

  persistDemoState();
  closeSlotModal();
  renderAdminSlotsTable();
  loadSlots();
  updateAdminStats();
  showToast(`Time slot generated for ${dept.name} (${startTime.substring(0, 5)})`);
}

async function deleteSlot(id) {
  if (!confirm('Delete this appointment slot?')) return;

  try {
    await fetch(`/api/admin/slots/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
  } catch (_) {}

  demoState.slots = demoState.slots.filter(s => s.id != id);
  persistDemoState();
  renderAdminSlotsTable();
  loadSlots();
  updateAdminStats();
  showToast('Slot deleted.');
}

// 4. Audit Table
function loadAdminAudit() {
  const tbody = document.getElementById('admin-audit-tbody');
  if (!tbody) return;

  const combined = [
    ...demoState.nowServing.map(t => ({ ...t, patientName: 'Consultation in Progress', time: 'Active' })),
    ...demoState.queue.map(t => ({ ...t, patientName: t.customerName, time: t.issuedAt })),
    ...demoState.appointments.map(a => ({
      ticketNumber: a.appointmentCode,
      patientName: a.customerName,
      departmentName: a.departmentName,
      counterNumber: 'Reserved',
      status: a.status,
      time: a.time
    }))
  ];

  tbody.innerHTML = '';
  combined.forEach(item => {
    tbody.innerHTML += `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-900 transition font-mono text-xs">
        <td class="py-3 px-4 font-bold text-brand-600">${item.ticketNumber}</td>
        <td class="py-3 px-4 font-sans text-slate-900 dark:text-white">${item.patientName || 'Patient'}</td>
        <td class="py-3 px-4 font-sans text-slate-500">${item.departmentName}</td>
        <td class="py-3 px-4 text-slate-400">${item.counterNumber || 'Counter 101'}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${item.status === 'SERVING' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-brand-500/10 text-brand-400'}">
            ${item.status}
          </span>
        </td>
        <td class="py-3 px-4 text-slate-400">${item.time || 'Today'}</td>
      </tr>
    `;
  });
}

// 5. Database Utility Actions
function resetDbToDefault() {
  if (!confirm('Reset database to factory seed data? This will restore initial departments and counters.')) return;
  localStorage.removeItem('pulsequeue_state');
  demoState = JSON.parse(JSON.stringify(DEFAULT_INITIAL_STATE));
  persistDemoState();
  loadDepartments();
  loadSlots();
  loadCounters();
  loadStaffQueue();
  loadTvDisplay();
  loadMetrics();
  loadAdminData();
  showToast('Database reset to factory seeds!');
}

function exportDbJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(demoState, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `pulsequeue_database_export_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Database JSON exported!');
}

// -------------------------------------------------------------
// TOAST HELPER
// -------------------------------------------------------------
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
}
