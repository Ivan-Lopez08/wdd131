// Footer JS
document.getElementById("lastModified").innerHTML = document.lastModified;
const year = new Date().getFullYear();
const yearSpan = document.getElementById("currentyear");
yearSpan.textContent = year;

const temperature = 9;
const conditions = "Partially Cloudy"
const wind = 5;
let wind_chill = "N/A"

function calculateWindChill(T, W) {
  return 13.12 + 0.6215*T - 11.37*Math.pow(W, 0.16) + 0.3965*T*Math.pow(W, 0.16);
}

if (temperature <= 10 && wind > 4.8){
    wind_chill = calculateWindChill(temperature,wind).toFixed(2)
}

document.getElementById("temperature").textContent = `${temperature}°C`;
document.getElementById("conditions").textContent = `${conditions}`
document.getElementById("wind").textContent = `${wind}km/h`
document.getElementById("wind-chill").textContent = `${wind_chill}°C`