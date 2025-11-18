document.getElementById("lastModified").innerHTML = document.lastModified;

const year = new Date().getFullYear();
const yearSpan = document.getElementById("currentyear");
yearSpan.textContent = year;

const hamButton = document.querySelector('#burguer');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});