# Welcome to SaveStudent

Hey! This is **SaveStudent** — a simple money tracker I built as an ALU student, 
for ALU students. No complicated finance stuff. Just a clean, easy way to see 
where your money is going every month.



## What does this app actually do?

Ever get to the end of the month and wonder where all your money went? 
That's exactly what SaveStudent helps you figure out.

Here's what you can do with it:

- **Add a transaction** — type what you spent, how much, and which category it falls under
- **See your dashboard** — instantly see your total spending, top category, and how much budget you have left
- **Set a monthly budget** — the app tells you when you're getting close to your limit
- **Search your spending** — type anything and it finds it instantly
- **Sort your transactions** — by date, name, or amount
- **Download your data** — save all your transactions as a file
- **Load it back** — pick up right where you left off
- **Add custom categories** — not just Food and Books, make it yours
- **Set currency rates** — works in USD, EUR, and RWF


## How do I run it?

**Option 1 — Visit the live site:**
Just click the link at the top. Nothing to install.

**Option 2 — Run it locally:**
1. Download or clone this repo
2. Open the folder in VS Code
3. Right-click `index.html` → click **Open with Live Server**
4. Done. It opens in your browser automatically.


## How do I run the tests?

1. Open the folder in VS Code
2. Right-click `tests.html` → click **Open with Live Server**
3. You'll see a list of every test and whether it passed or failed
4. All 30+ tests should show **PASS** in green

The tests check all the validation rules — like making sure you can't 
type letters in the amount field, or leave the description blank.


## Want to try it with sample data?

There's a file called `seed.json` in this repo. It has 12 example transactions 
already filled in — different categories, different amounts, edge cases and all.

To load it:
1. Open the app
2. Go to the Transactions section
3. Click **Load saved transactions**
4. Pick the `seed.json` file
5. Your table fills up instantly!


## How does the search work?

Just type anything in the search box and it searches your transactions in real time. 
It matches against the description and the category.

It also supports **regex** — which is a fancy way of saying you can use special 
search patterns. Here are some fun ones to try:

| What you want to find | Type this |
|---|---|
| Anything with "coffee" or "tea" | `(coffee\|tea)` |
| Amounts with cents | `\.\d{2}` |
| Entries starting with "Bus" | `^Bus` |
| Duplicate words by accident | `\b(\w+)\s+\1\b` |

Don't worry if that looks confusing — normal typing works perfectly fine too.


## Validation Rules (the nerdy bit)

Every time you fill in the form, the app checks your input before saving. 
Here's what it's checking and why:

| Field | What's checked | Example of what's rejected |
|---|---|---|
| Description | No leading/trailing spaces, no double spaces, no duplicate words | " Lunch" or "the the cafe" |
| Amount | Numbers only, max 2 decimal places, must be more than 0 | "abc", "-5", "12.500" |
| Date | Must be in YYYY-MM-DD format | "25/09/2025" |
| Category | Letters only, spaces and hyphens allowed | "Food2", "Food@" |

The trickiest one is the **duplicate word check** — it uses an advanced regex 
pattern called a back-reference: `/\b(\w+)\s+\1\b/i`

What that means in plain English: "find any word that appears twice in a row." 
So if you accidentally type "I went to the the shop" — it catches it.


## Can I use it without a mouse?

Yes! Everything works with just your keyboard:

| Key | What it does |
|---|---|
| `Tab` | Move between buttons and fields |
| `Enter` | Submit the form or confirm an action |
| `Escape` | Close the delete popup |
| `Tab` on first load | Jumps you straight to the main content (skip link) |


## Accessibility

This app was built so that everyone can use it, including people using 
screen readers or keyboard-only navigation. Here's what's built in:

- Every form field has a proper label attached to it
- Error messages are announced out loud by screen readers the moment they appear
- The budget alert speaks up when you go over your limit
- The delete popup is a proper dialog with the right screen reader roles
- Color contrast passes WCAG AA standards throughout
- There's a skip link so keyboard users can jump past the nav instantly


## What's the currency thing about?

The base currency is **USD**. But if you spend in RWF (Rwandan Francs) or 
EUR (Euros), you can set your own exchange rates in Settings.

For example — if today 1 USD = 1,300 RWF, just type 1300 in the RWF field 
and save. No internet needed, no live API — you control the rates yourself.


## Here's a little of my take on diversity in SaveStudent

SaveStudent was built with all ALU students in mind — whether you're from 
Rwanda, Nigeria, Ghana, Kenya, or anywhere else on the continent. 
Your currency, your categories, your spending — this app works for you.


## About Me

Hi, I'm Hillary — a first-year Software Engineering student at ALU, Kigali.
I built this as part of my Front End Web Development Summative, but honestly I'll 
probably keep using it myself.

- GitHub: [hillary-kayne](https://github.com/hillary-kayne)
- Email: h.kayinabab@alustudent.com


*Thank You!*

This is the link to my GitHub Repo: https://github.com/hillary-kayne/student-finance-tracker/tree/main 

SaveStudent Video Demo: https://youtu.be/xILZAQ0DeSI
