import { showNotification } from './utils.js';

const themeButton = document.getElementById("theme-btn");
const body = document.body;
const icon = themeButton?.querySelector("i");

let lightTheme = JSON.parse(localStorage.getItem("theme")) || false;

function updateTheme() {
  if (lightTheme) {
    body.classList.add("light");
    if (icon) icon.className = "fa-solid fa-sun btn--icon";
  } else {
    body.classList.remove("light");
    if (icon) icon.className = "fa-solid fa-moon btn--icon";
  }
}

export function switchTheme() {
  lightTheme = !lightTheme;
  localStorage.setItem("theme", JSON.stringify(lightTheme));
  updateTheme();
  showNotification(`${lightTheme ? "☀️ Светлая" : "🌙 Тёмная"} тема`);
}

export function initTheme() {
  updateTheme();
  if (themeButton) themeButton.addEventListener("click", switchTheme);
}