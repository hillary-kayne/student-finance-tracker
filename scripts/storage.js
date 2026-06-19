// storage.js — handles all localStorage read/write

const KEYS = {
  transactions: 'sft:transactions',
  budget: 'sft:budget',
  rates: 'sft:rates',
  categories: 'sft:categories',
};

export const storage = {
  getTransactions: () => JSON.parse(localStorage.getItem(KEYS.transactions) || '[]'),
  saveTransactions: (data) => localStorage.setItem(KEYS.transactions, JSON.stringify(data)),

  getBudget: () => parseFloat(localStorage.getItem(KEYS.budget) || '0'),
  saveBudget: (val) => localStorage.setItem(KEYS.budget, String(val)),

  getRates: () => JSON.parse(localStorage.getItem(KEYS.rates) || '{"eur":0.92,"rwf":1300}'),
  saveRates: (obj) => localStorage.setItem(KEYS.rates, JSON.stringify(obj)),

  getCategories: () => JSON.parse(localStorage.getItem(KEYS.categories) || '[]'),
  saveCategories: (arr) => localStorage.setItem(KEYS.categories, JSON.stringify(arr)),

  clearAll: () => Object.values(KEYS).forEach(k => localStorage.removeItem(k)),
};