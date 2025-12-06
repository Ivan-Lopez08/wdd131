document.getElementById("lastModified").innerHTML = document.lastModified;
const year = new Date().getFullYear();
const yearSpan = document.getElementById("currentyear");
yearSpan.textContent = year;

const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

const selectElement = document.getElementById("product");

products.forEach(element => {
    const option = document.createElement("option");
    option.value = element.id;
    option.textContent = element.name;
    selectElement.appendChild(option);
});