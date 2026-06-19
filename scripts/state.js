// state.js — single source of truth for app data

import { storage } from './storage.js';

export const state = {
  transactions: [],
  budget: 0,
  rates: { eur: 0.92, rwf: 1300 },
  categories: ['Food','Books','Transport','Entertainment','Fees','Other'],

  init() {
    this.transactions = storage.getTransactions();
    this.budget = storage.getBudget();
    this.rates = storage.getRates();
    const custom = storage.getCategories();
    if (custom.length) this.categories = ['Food','Books','Transport','Entertainment','Fees','Other', ...custom];
  },

  addTransaction(tx) {
    this.transactions.unshift(tx);
    storage.saveTransactions(this.transactions);
  },

  updateTransaction(id, updates) {
    this.transactions = this.transactions.map(t =>
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    );
    storage.saveTransactions(this.transactions);
  },

  deleteTransaction(id) {
    this.transactions = this.transactions.filter(t => t.id !== id);
    storage.saveTransactions(this.transactions);
  },

  setBudget(val) {
    this.budget = val;
    storage.saveBudget(val);
  },

  setRates(obj) {
    this.rates = obj;
    storage.saveRates(obj);
  },

  addCategory(cat) {
    if (!this.categories.includes(cat)) {
      this.categories.push(cat);
      const custom = storage.getCategories();
      custom.push(cat);
      storage.saveCategories(custom);
    }
  },

  removeCategory(cat) {
    this.categories = this.categories.filter(c => c !== cat);
    const custom = storage.getCategories().filter(c => c !== cat);
    storage.saveCategories(custom);
  },

  getTotalSpent() {
    return this.transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  },

  getTopCategory() {
    if (!this.transactions.length) return '—';
    const counts = {};
    this.transactions.forEach(t => counts[t.category] = (counts[t.category] || 0) + 1);
    return Object.entries(counts).sort((a,b) => b[1]-a[1])[0][0];
  },

  getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const total = this.transactions
        .filter(t => t.date === key)
        .reduce((s, t) => s + parseFloat(t.amount), 0);
      days.push({ label: d.toLocaleDateString('en', {weekday:'short'}), total });
    }
    return days;
  },

  generateId() {
    const num = String(this.transactions.length + 1).padStart(4, '0');
    return `txn_${num}_${Date.now()}`;
  },
};