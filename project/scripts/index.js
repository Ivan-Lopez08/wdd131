const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function initMenu() {
  const btn = $("#hamburgerBtn");
  const menu = $("#mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = btn.classList.toggle("active");
    menu.classList.toggle("open", isOpen);

    btn.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-hidden", String(!isOpen));
    btn.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });
}

function setDateInfo() {
  const lm = $("#lastModified");
  if (lm) lm.textContent = document.lastModified || "—";
  const yearSpan = $("#currentyear");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

const tips = [
  "Drink at least 2 liters of water today 💧",
  "Do a 10-minute stretch session 🧘‍♂️",
  "Try avoiding added sugar for the rest of the day 🍏",
  "Take a 15-minute walk 🚶‍♂️",
  "Eat a source of protein in your next meal 🍗",
  "Practice 5 minutes of deep breathing 😮‍💨",
  "Include vegetables in 2 meals today 🥗",
  "Stand up and move every hour for 2 minutes ⏱️"
];

function showRandomTip() {
  const el = $("#tipText");
  if (!el) return;
  const idx = Math.floor(Math.random() * tips.length);
  el.textContent = `${tips[idx]}`;
}

function initTips() {
  const btn = $("#newTipBtn");
  if (btn) btn.addEventListener("click", showRandomTip);
  showRandomTip();
}

let favorites = [];

function loadFavorites() {
  favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  renderFavoritesPreview();
  updateFavButtons();
}

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function makeId(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function isFavorite(title) {
  return favorites.some(f => f.title === title);
}

function toggleFavorite(title, button) {
  const exists = isFavorite(title);
  if (!exists) {
    const item = { title, addedAt: Date.now(), id: makeId(title) };
    favorites.push(item);
    if (button) {
      button.textContent = "✔ Added!";
      button.classList.add("added");
    }
  } else {
    favorites = favorites.filter(f => f.title !== title);
    if (button) {
      button.textContent = "❤️ Add to Favorites";
      button.classList.remove("added");
    }
  }
  saveFavorites();
  renderFavoritesPreview();
}

function updateFavButtons() {
  const buttons = $$(".fav-btn");
  buttons.forEach(btn => {
    const title = btn.dataset.title;
    if (isFavorite(title)) {
      btn.textContent = "✔ Added!";
      btn.classList.add("added");
    } else {
      btn.textContent = "❤️ Add to Favorites";
      btn.classList.remove("added");
    }
    btn.onclick = () => toggleFavorite(title, btn);
  });
}

function renderFavoritesPreview() {
  const container = $("#favoritesList");
  if (!container) return;
  container.innerHTML = "";
  if (favorites.length === 0) {
    container.innerHTML = `<p class="muted">You have no favorites yet.</p>`;
    return;
  }
  const items = favorites.slice(0, 4).map(f => {
    return `<div class="fav-item"><strong>${f.title}</strong> <small>• ${new Date(f.addedAt).toLocaleDateString()}</small></div>`;
  }).join("");
  container.innerHTML = items;
}

function calculateCalories(weight, height, age, activity) {
  if (!weight || !height || !age) return null;
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  const tdee = Math.round(bmr * activity);
  return tdee;
}

function initCalorieCalculator() {
  const btn = $("#calcBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const weight = Number($("#weight").value);
    const height = Number($("#height").value);
    const age = Number($("#age").value);
    const activity = Number($("#activity").value);
    const out = $("#calorieResult");

    if (!weight || !height || !age) {
      out.textContent = `Please provide weight, height and age.`;
      return;
    }

    const calories = calculateCalories(weight, height, age, activity);
    if (!calories) {
      out.textContent = `Calculation failed. Check inputs.`;
      return;
    }

    let rec = "";
    if (calories < 1800) rec = "This is a low calorie estimate — consider consulting a nutritionist if you plan to diet.";
    else if (calories < 2500) rec = "Moderate calorie needs — good for general maintenance.";
    else rec = "High calorie needs — ideal for intense training or muscle gain.";

    out.textContent = `🔥 Estimated daily calories: ${calories}. ${rec}`;
  });
}

function initSite() {
  initMenu();
  setDateInfo();
  initTips();
  loadFavorites();
  initCalorieCalculator();
}

document.addEventListener("DOMContentLoaded", initSite);


const signupForm = document.getElementById("signupForm");
const formMessage = document.getElementById("formMessage");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      goal: document.getElementById("goal").value,
    };

    localStorage.setItem("wellnessUser", JSON.stringify(user));

    formMessage.textContent = `Welcome, ${user.name}! Your account has been created.`;
    formMessage.style.color = "green";

    signupForm.reset();
  });
}