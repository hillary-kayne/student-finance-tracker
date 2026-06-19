// ui.js — all DOM rendering functions

import { highlight } from './search.js';

// Render transactions into the table
export function renderTransactions(transactions, regex = null) {
  const tbody = document.getElementById('transactions-body');
  const empty = document.getElementById('empty-state');

  if (!transactions.length) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  tbody.innerHTML = transactions.map(t => `
    <tr tabindex="0" data-id="${t.id}">
      <td>${highlight(t.description, regex)}</td>
      <td>$${parseFloat(t.amount).toFixed(2)}</td>
      <td><span class="badge badge--${t.category}">${t.category}</span></td>
      <td>${t.date}</td>
      <td>
        <div class="action-btns">
          <button class="btn-icon btn-edit" data-id="${t.id}" aria-label="Edit ${t.description}">Edit</button>
          <button class="btn-icon btn-icon--delete btn-delete" data-id="${t.id}" aria-label="Delete ${t.description}">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Render dashboard stats
export function renderStats(state) {
  document.getElementById('stat-total').textContent = state.transactions.length;
  document.getElementById('stat-spent').textContent = `$${state.getTotalSpent().toFixed(2)}`;
  document.getElementById('stat-top-cat').textContent = state.getTopCategory();

  const budget = state.budget;
  const spent = state.getTotalSpent();
  const remainEl = document.getElementById('stat-remaining');
  const alertEl = document.getElementById('budget-alert');

  if (!budget) {
    remainEl.textContent = '—';
    alertEl.classList.add('hidden');
    return;
  }

  const remaining = budget - spent;
  remainEl.textContent = `$${Math.abs(remaining).toFixed(2)} ${remaining >= 0 ? 'left' : 'over'}`;

  if (remaining >= 0) {
    alertEl.textContent = `You have $${remaining.toFixed(2)} remaining in your budget.`;
    alertEl.className = 'budget-alert under';
    alertEl.setAttribute('aria-live', 'polite');
  } else {
    alertEl.textContent = `⚠ Budget exceeded by $${Math.abs(remaining).toFixed(2)}!`;
    alertEl.className = 'budget-alert over';
    alertEl.setAttribute('aria-live', 'assertive');
  }
  alertEl.classList.remove('hidden');
}

// Render the last-7-days bar chart
export function renderChart(days) {
  const chart = document.getElementById('bar-chart');
  const max = Math.max(...days.map(d => d.total), 1);
  chart.innerHTML = days.map(d => {
    const pct = Math.round((d.total / max) * 80);
    return `
      <div class="bar-col">
        <div class="bar" style="height:${pct}px" title="$${d.total.toFixed(2)}"></div>
        <span class="bar-label">${d.label}</span>
      </div>
    `;
  }).join('');
}

// Populate category dropdown in the form
export function renderCategoryOptions(categories, selectedValue = '') {
  const select = document.getElementById('f-category');
  select.innerHTML = `<option value="">Select category</option>` +
    categories.map(c => `<option value="${c}" ${c === selectedValue ? 'selected' : ''}>${c}</option>`).join('');
}

// Render custom category list in settings
export function renderCategoryList(categories) {
  const defaults = ['Food','Books','Transport','Entertainment','Fees','Other'];
  const custom = categories.filter(c => !defaults.includes(c));
  const ul = document.getElementById('category-list');
  ul.innerHTML = custom.map(c => `
    <li>
      ${c}
      <button class="remove-category" data-cat="${c}" aria-label="Remove ${c}">✕</button>
    </li>
  `).join('') || '<li style="color:var(--clr-text-muted);font-size:0.85rem">No custom categories yet.</li>';
}

// Show inline field error
export function showError(fieldId, message) {
  const el = document.getElementById(`err-${fieldId}`);
  if (el) el.textContent = message;
  const input = document.getElementById(`f-${fieldId}`);
  if (input) input.classList.toggle('invalid', !!message);
  if (input) input.classList.toggle('valid', !message && input.value);
}

// Reset the form to add mode
export function resetForm() {
  document.getElementById('transaction-form').reset();
  document.getElementById('edit-id').value = '';
  document.getElementById('form-heading').textContent = 'Add Transaction';
  document.getElementById('form-submit-btn').textContent = 'Add Transaction';
  document.getElementById('form-cancel-btn').classList.add('hidden');
  ['description','amount','category','date'].forEach(f => showError(f, ''));
}