// app.js — main controller, wires everything together

import { state } from './state.js';
import { renderTransactions, renderStats, renderChart, renderCategoryOptions, renderCategoryList, showError, resetForm } from './ui.js';
import { validateDescription, validateAmount, validateDate, validateCategory, validateNewCategory, validateImportRecord } from './validators.js';
import { compileRegex, filterTransactions } from './search.js';

// ── Init ────────────────────────────────────────────────
state.init();
let currentRegex = null;
let pendingDeleteId = null;

function refresh() {
  const sorted = getSorted(filterTransactions(state.transactions, currentRegex));
  renderTransactions(sorted, currentRegex);
  renderStats(state);
  renderChart(state.getLast7Days());
  renderCategoryOptions(state.categories);
  renderCategoryList(state.categories);
}

refresh();

// ── Nav toggle (mobile) ─────────────────────────────────
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
navToggle.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', open);
});

// Close nav when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Search ──────────────────────────────────────────────
const searchInput = document.getElementById('search-input');
const caseToggle = document.getElementById('case-toggle');
const searchStatus = document.getElementById('search-status');

function doSearch() {
  const val = searchInput.value;
  currentRegex = compileRegex(val, caseToggle.checked);
  const filtered = filterTransactions(state.transactions, currentRegex);
  const sorted = getSorted(filtered);
  renderTransactions(sorted, currentRegex);
  searchStatus.textContent = val
    ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} found.`
    : '';
  if (val && !currentRegex) {
    searchStatus.textContent = 'Invalid regex pattern.';
  }
}

searchInput.addEventListener('input', doSearch);
caseToggle.addEventListener('change', doSearch);

// ── Sort ────────────────────────────────────────────────
const sortSelect = document.getElementById('sort-select');
sortSelect.addEventListener('change', () => {
  const filtered = filterTransactions(state.transactions, currentRegex);
  renderTransactions(getSorted(filtered), currentRegex);
});

function getSorted(list) {
  const val = sortSelect.value;
  return [...list].sort((a, b) => {
    if (val === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (val === 'date-asc')  return new Date(a.date) - new Date(b.date);
    if (val === 'desc-asc')  return a.description.localeCompare(b.description);
    if (val === 'desc-desc') return b.description.localeCompare(a.description);
    if (val === 'amount-asc')  return parseFloat(a.amount) - parseFloat(b.amount);
    if (val === 'amount-desc') return parseFloat(b.amount) - parseFloat(a.amount);
    return 0;
  });
}

// ── Form: real-time validation ──────────────────────────
document.getElementById('f-description').addEventListener('input', e => {
  showError('description', validateDescription(e.target.value));
});
document.getElementById('f-amount').addEventListener('input', e => {
  showError('amount', validateAmount(e.target.value));
});
document.getElementById('f-date').addEventListener('change', e => {
  showError('date', validateDate(e.target.value));
});
document.getElementById('f-category').addEventListener('change', e => {
  showError('category', validateCategory(e.target.value));
const encouragements = [
    "Do Hard Things. 💪",
    "Every franc tracked is a win. 🔥",
    "Do Hard Things — you're proving it right now.",
    "Budget boss. Do Hard Things. ✊",
    "Small steps, big goals. Do Hard Things.",
  ];
  const msg = encouragements[Math.floor(Math.random() * encouragements.length)];

  if (editId) {
    state.updateTransaction(editId, { description: desc, amount: parseFloat(amt), category: cat, date });
    document.getElementById('form-status').textContent = `Updated! ${msg}`;
  } else {
    state.addTransaction({
      id: state.generateId(),
      description: desc,
      amount: parseFloat(amt),
      category: cat,
      date,
      createdAt: now,
      updatedAt: now,
    });
    document.getElementById('form-status').textContent = `Saved! ${msg}`;
  }