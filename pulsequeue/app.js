/**
 * PulseQueue - Interactive Web App Client
 * Hybrid Architecture: Real Spring Boot & WebSocket STOMP backend connection
 * with automatic fallback demo mode when hosted statically on GitHub Pages!
 */

let stompClient = null;
let currentTicketNumber = 'Q-103';
let selectedSlotId = null;
let isDemoMode = false;

// Mock database for static demo mode (GitHub Pages)
let demoState = {
  departments: [
    { id: 1, name: "General Medicine", code: "GEN" },
    { id: 2, name: "Cardiology", code: "CARD" },
    { id: 3, name: "Diagnostics & Lab", code: "LAB" }
  ],
  counters: [
    { id: 1, counterNumber: "Counter 101", department: { id: 1, name: "General Medicine" } },
    { id: 2, counterNumber: "Counter 102", department: { id: 2, name: "Cardiology" } },
    { id: 3, counterNumber: "Counter 103", department: { id: 3, name: "Diagnostics & Lab" } }
  ],
  nowServing: [
    { id: 1, ticketNumber: "Q-101", counterNumber: "Counter 101", departmentName: "General Medicine", status: "SERVING" },
    { id: 2, ticketNumber: "Q-201", counterNumber: "Counter 102", departmentName: "Cardiology", status: "SERVING" }
  ],
  queue: [
    { id: 3, ticketNumber: "Q-102", customerName: "David Miller", departmentName: "General Medicine", sequenceNumber: 1, issuedAt: "10:15" },
    { id: 4, ticketNumber: "Q-103", customerName: "Alex Rivera", departmentName: "General Medicine", sequenceNumber: 2, issuedAt: "10:22" },
    { id: 5, ticketNumber: "Q-202", customerName: "Sophia Chen", departmentName: "Cardiology", sequenceNumber: 3, issuedAt: "10:28" },
    { id: 6, ticketNumber: "Q-301", customerName: "Marcus Vance", departmentName: "Diagnostics & Lab", sequenceNumber: 4, issuedAt: "10:35" }
  ],
  metrics: {
    waiting: 4,
    serving: 2,
    completed: 18,
    avgWait: 12
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

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

  initWebSockets();
  loadDepartments();
  loadSlots();
  loadCounters();
  loadStaffQueue();
  loadTvDisplay();
  loadMetrics();
});

// 1. WebSocket STOMP Connection
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
      // If WebSocket fails (e.g. running statically on GitHub Pages), switch to local real-time demo mode
      isDemoMode = true;
    });
  } catch (ex) {
    isDemoMode = true;
  }
}

// 2. Play Hospital Dual-Tone Chime
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

// 3. Handle Live Event Broadcasts
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

  if (payload.ticket && payload.ticket.ticketNumber === currentTicketNumber) {
    updateMyTicketDisplay(payload.ticket);
  }
}

// 4. Tab Switching
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
  document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active', 'bg-brand-600', 'text-white'));

  const activeContent = document.getElementById('tab-' + tabId);
  const activeNav = document.getElementById('nav-' + tabId);

  if (activeContent) activeContent.classList.remove('hidden');
  if (activeNav) activeNav.classList.add('active', 'bg-brand-600', 'text-white');

  if (window.lucide) lucide.createIcons();

  if (tabId === 'tv') loadTvDisplay();
  if (tabId === 'staff') loadStaffQueue();
  if (tabId === 'analytics') loadMetrics();
}

// 5. Load Departments
async function loadDepartments() {
  const select = document.getElementById('department-select');
  if (!select) return;

  try {
    const res = await fetch('/api/departments');
    if (!res.ok) throw new Error('API offline');
    const depts = await res.json();
    populateDepartmentSelect(depts);
  } catch (_) {
    isDemoMode = true;
    populateDepartmentSelect(demoState.departments);
  }
}

function populateDepartmentSelect(depts) {
  const select = document.getElementById('department-select');
  if (!select) return;
  select.innerHTML = '<option value="">All Departments</option>';
  depts.forEach(d => {
    select.innerHTML += `<option value="${d.id}">${d.name}</option>`;
  });
}

// 6. Load Slots
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
    const mockSlots = [
      { id: 101, startTime: '09:00:00', department: { name: 'General Medicine' }, slotDate: date || 'Today' },
      { id: 102, startTime: '09:30:00', department: { name: 'General Medicine' }, slotDate: date || 'Today' },
      { id: 103, startTime: '10:00:00', department: { name: 'Cardiology' }, slotDate: date || 'Today' },
      { id: 104, startTime: '10:30:00', department: { name: 'Cardiology' }, slotDate: date || 'Today' },
      { id: 105, startTime: '11:00:00', department: { name: 'Diagnostics & Lab' }, slotDate: date || 'Today' },
      { id: 106, startTime: '11:30:00', department: { name: 'Diagnostics & Lab' }, slotDate: date || 'Today' },
      { id: 107, startTime: '14:00:00', department: { name: 'General Medicine' }, slotDate: date || 'Today' },
      { id: 108, startTime: '14:30:00', department: { name: 'Cardiology' }, slotDate: date || 'Today' }
    ];

    const filtered = deptId
      ? mockSlots.filter(s => {
          const d = demoState.departments.find(dept => dept.id == deptId);
          return d && s.department.name === d.name;
        })
      : mockSlots;

    renderSlots(filtered);
  }
}

function renderSlots(slots) {
  const grid = document.getElementById('slots-grid');
  const badge = document.getElementById('slot-count-badge');
  if (badge) badge.textContent = `${slots.length} slots available`;

  if (slots.length === 0) {
    grid.innerHTML = '<div class="col-span-full py-8 text-center text-xs text-slate-400">No open slots for this selection. Try another date!</div>';
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
        <p class="text-[10px] text-slate-400">Guarded by @Version lock</p>
      </div>
      <button class="w-full py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-700 dark:text-slate-300 font-semibold text-[11px] transition">
        Reserve Slot
      </button>
    `;
    grid.appendChild(card);
  });
}

// 7. Booking Modal
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
    const loginRes = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'customer@pulsequeue.dev', password: 'Customer@123' })
    });
    if (!loginRes.ok) throw new Error('Offline');
    const authData = await loginRes.json();

    const bookRes = await fetch('/api/appointments/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.token}`
      },
      body: JSON.stringify({ slotId: selectedSlotId, notes: 'General consultation' })
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
    // Demo Mode simulation on GitHub Pages
    setTimeout(() => {
      const newTicketNumber = 'Q-' + (100 + demoState.queue.length + 1);
      currentTicketNumber = newTicketNumber;

      const newTicket = {
        id: Date.now(),
        ticketNumber: newTicketNumber,
        customerName: 'Shakil Jamil (Demo)',
        departmentName: document.getElementById('modal-dept').textContent || 'General Medicine',
        counterNumber: 'Counter 101',
        status: 'WAITING',
        sequenceNumber: demoState.queue.length + 1,
        issuedAt: new Date().toLocaleTimeString().substring(0, 5)
      };

      demoState.queue.push(newTicket);
      demoState.metrics.waiting += 1;

      closeBookingModal();
      updateMyTicketDisplay({ ...newTicket, waitingAheadCount: demoState.queue.length - 1 });
      showToast(`Appointment confirmed! Ticket ${newTicketNumber} issued.`);
      switchTab('my-ticket');
      loadStaffQueue();
      loadMetrics();
    }, 400);
  } finally {
    confirmBtn.disabled = false;
    confirmBtn.textContent = 'Confirm & Issue Ticket';
  }
}

// 8. Walk-in Ticket
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
      ticketNumber: newNum,
      departmentName: 'General Medicine',
      counterNumber: 'Counter 101',
      status: 'WAITING',
      waitingAheadCount: demoState.queue.length
    };
    demoState.queue.push({
      id: Date.now(),
      ticketNumber: newNum,
      customerName: 'Walk-in Patient',
      departmentName: 'General Medicine',
      sequenceNumber: demoState.queue.length + 1,
      issuedAt: new Date().toLocaleTimeString().substring(0, 5)
    });
    demoState.metrics.waiting += 1;

    updateMyTicketDisplay(ticket);
    showToast(`Walk-in Ticket ${newNum} Issued!`);
    switchTab('my-ticket');
    loadStaffQueue();
    loadMetrics();
  }
}

// 9. Update My Ticket View
function updateMyTicketDisplay(ticket) {
  document.getElementById('ticket-number-display').textContent = ticket.ticketNumber;
  document.getElementById('ticket-department-display').textContent = ticket.departmentName;
  document.getElementById('ticket-ahead-display').textContent = ticket.waitingAheadCount || '0';
  document.getElementById('ticket-wait-display').textContent = `~${(ticket.waitingAheadCount || 0) * 8}m`;
  document.getElementById('ticket-counter-display').textContent = ticket.counterNumber || 'Counter 101';

  const statusPill = document.getElementById('ticket-status-pill');
  if (statusPill) {
    statusPill.innerHTML = `<span>Status: ${ticket.status || 'WAITING'}</span>`;
  }
}

// 10. Staff Desk & Queue
async function loadCounters() {
  const select = document.getElementById('staff-counter-select');
  if (!select) return;

  try {
    const res = await fetch('/api/queue/counters');
    if (!res.ok) throw new Error('Offline');
    const counters = await res.json();
    populateCounters(counters);
  } catch (_) {
    populateCounters(demoState.counters);
  }
}

function populateCounters(counters) {
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

// 11. Staff Actions
async function callNextCustomer() {
  const counterSelect = document.getElementById('staff-counter-select');
  const counterId = counterSelect?.value || 1;
  const counterText = counterSelect?.options[counterSelect.selectedIndex]?.text.split(' - ')[0] || 'Counter 101';

  try {
    const loginRes = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'staff1@pulsequeue.dev', password: 'Staff@123' })
    });
    if (!loginRes.ok) throw new Error('Offline');
    const auth = await loginRes.json();

    const res = await fetch('/api/queue/call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
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
    // Demo Mode handling
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

  servingEl.textContent = 'Ready';
  showToast(`Ticket ${currentTicket} marked as COMPLETED.`);

  loadTvDisplay();
  loadStaffQueue();
  loadMetrics();
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

  servingEl.textContent = 'Ready';
  showToast(`Ticket ${currentTicket} marked as NO-SHOW.`);

  loadTvDisplay();
  loadStaffQueue();
  loadMetrics();
}

// 12. TV Display
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

// 13. Metrics
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

// 14. Toast Helper
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
}
