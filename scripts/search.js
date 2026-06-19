// search.js — safe regex compiler + match highlighter

// Safely compile user input into a RegExp (won't crash on bad input)
export function compileRegex(input, caseSensitive = false) {
  if (!input || !input.trim()) return null;
  try {
    return new RegExp(input, caseSensitive ? '' : 'i');
  } catch {
    return null;
  }
}

// Wrap matched text in <mark> tags for accessible highlighting
export function highlight(text, regex) {
  if (!regex) return escapeHtml(text);
  return escapeHtml(text).replace(regex, m => `<mark>${m}</mark>`);
}

// Escape HTML to prevent XSS when injecting into innerHTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

// Filter transactions by regex against description + category
export function filterTransactions(transactions, regex) {
  if (!regex) return transactions;
  return transactions.filter(t =>
    regex.test(t.description) || regex.test(t.category)
  );
}