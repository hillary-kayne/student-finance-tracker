# SaveStudent — Student Finance Tracker

A simple, accessible budget tracker built for ALU students.
Track your spending, set a monthly budget, and stay in control of your money.



## Chosen Theme
Student Finance Tracker


## Features
- Add, edit, and delete transactions
- Categories: Food, Books, Transport, Entertainment, Fees, Other (+ custom)
- Dashboard with total spent, top category, budget remaining, 7-day chart
- Monthly budget cap with live over/under alert
- Search transactions with live regex matching and highlighted results
- Sort by date, name, or amount
- Download and load transactions (JSON)
- Currency settings: USD → EUR and USD → RWF manual rates
- Fully keyboard navigable
- Mobile-first responsive design (360px, 768px, 1024px)
- ARIA live regions for screen readers
- "Do Hard Things" encouragement on every save


## Regex Catalog

| Rule | Pattern | Example match | Example reject |
|---|---|---|---|
| Description | `/^\S(?:.*\S)?$/` | "Lunch at cafe" | " Lunch" (leading space) |
| No double spaces | `/\s{2,}/` | — | "Lunch  at" |
| Duplicate word (advanced) | `/\b(\w+)\s+\1\b/i` | "the the shop" | "the shop" |
| Amount | `/^(0\|[1-9]\d*)(\.\d{1,2})?$/` | "12.50", "5" | "12.500", "-5" |
| Date | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | "2025-09-25" | "25/09/2025" |
| Category | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | "Self-Care" | "Food2", "Food@" |
| Amount lookahead | `/^(0\|[1-9]\d*)(?=\.\d{1,2}$)/` | "12.50" | "12." |


## Keyboard Map

| Key | Action |
|---|---|
| Tab | Move between fields and buttons |
| Enter | Submit form / confirm action |
| Escape | Close delete modal |
| Skip link (Tab on load) | Jump straight to main content |


## Accessibility Notes
- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`
- All form inputs have associated `<label>` elements
- Errors announced via `role="alert"` and `aria-live="assertive"`
- Budget alerts use `aria-live="polite"` (under budget) and `aria-live="assertive"` (over budget)
- Skip-to-content link appears on first Tab press
- Visible focus styles on all interactive elements
- Delete modal uses `role="dialog"` and `aria-modal="true"`
- Color contrast meets WCAG AA


## How to Run Tests
1. Open the project in VS Code
2. Right-click `tests.html` → Open with Live Server
3. All test results show as PASS or FAIL on screen

## How to Run the App
1. Right-click `index.html` → Open with Live Server
2. Or visit the live GitHub Pages URL above


## Seed Data
Import `seed.json` using the "Load saved transactions" button to load 12 sample records including edge cases (large amounts, small amounts, varied dates).

