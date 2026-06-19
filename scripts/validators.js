// validators.js — all regex validation rules

// Rule 1: No leading/trailing spaces, no double spaces
export function validateDescription(val) {
  if (!val.trim()) return 'Description is required.';
  if (/^\s|\s$/.test(val)) return 'No leading or trailing spaces allowed.';
  if (/\s{2,}/.test(val)) return 'No double spaces allowed.';
  // Advanced: catch duplicate consecutive words e.g. "the the"
  if (/\b(\w+)\s+\1\b/i.test(val)) return 'Duplicate word detected (e.g. "the the").';
  if (!/^\S(?:.*\S)?$/.test(val)) return 'Invalid description format.';
  return '';
}

// Rule 2: Positive number, up to 2 decimal places
export function validateAmount(val) {
  if (!val.trim()) return 'Amount is required.';
  if (!/^(0|[1-9]\d*)(\.\d{1,2})?$/.test(val.trim())) return 'Enter a valid amount (e.g. 12.50).';
  if (parseFloat(val) <= 0) return 'Amount must be greater than 0.';
  return '';
}

// Rule 3: Date in YYYY-MM-DD format
export function validateDate(val) {
  if (!val) return 'Date is required.';
  if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(val)) return 'Use YYYY-MM-DD format.';
  return '';
}

// Rule 4: Category — letters, spaces, hyphens only
export function validateCategory(val) {
  if (!val) return 'Please select or enter a category.';
  if (!/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/.test(val)) return 'Category: letters, spaces, hyphens only.';
  return '';
}

// Advanced Rule: new category input uses same pattern
export function validateNewCategory(val) {
  if (!val.trim()) return 'Category name cannot be empty.';
  if (!/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/.test(val.trim())) return 'Letters, spaces, hyphens only.';
  return '';
}

// Validate a full transaction object (used during JSON import)
export function validateImportRecord(rec) {
  if (typeof rec !== 'object' || !rec) return false;
  if (!rec.id || !rec.description || !rec.amount || !rec.category || !rec.date) return false;
  if (validateDescription(rec.description)) return false;
  if (validateAmount(String(rec.amount))) return false;
  if (validateDate(rec.date)) return false;
  if (validateCategory(rec.category)) return false;
  return true;
}