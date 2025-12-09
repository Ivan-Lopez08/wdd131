document.getElementById("lastModified").innerHTML = document.lastModified;
const year = new Date().getFullYear();
const yearSpan = document.getElementById("currentyear");
yearSpan.textContent = year;

const btn = document.getElementById("hamburgerBtn");
  const menu = document.getElementById("mobileMenu");

  btn.addEventListener("click", () => {
    const isOpen = btn.classList.toggle("active");
    menu.classList.toggle("open", isOpen);

    // Accesibilidad
    btn.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-hidden", String(!isOpen));
  });