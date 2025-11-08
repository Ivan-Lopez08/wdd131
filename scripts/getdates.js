document.getElementById("lastModified").innerHTML = document.lastModified;

const year = new Date().getFullYear();
const yearSpan = document.getElementById("currentyear");
yearSpan.textContent = year;