import { formatDisplayMonth, getMonthKey } from './utils.js';

const toPrev = document.getElementById("calendar-prev");
const calTitle = document.getElementById("calendar-title");
const toNext = document.getElementById("calendar-next");
const calGrid = document.getElementById("calendar-grid");

let currentDate = new Date();
let highlightedDate = null;
let onDayClickCallback = null;

function hasDiaryEntry(dateStr) {
  const diaryEntries = JSON.parse(localStorage.getItem("diaryEntries")) || {};
  const entry = diaryEntries[dateStr];
  if (!entry) return false;
  return (entry.mood?.length > 0) || (entry.events?.length > 0) || (entry.goals?.length > 0);
}

function weekDayOfFirstDay() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  let weekday = new Date(year, month, 1).getDay();
  weekday = weekday === 0 ? 6 : weekday - 1;
  return weekday;
}

function numberOfDaysThisMonth() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  return new Date(year, month + 1, 0).getDate();
}

function render(onDayClick, highlightDate) {
  calGrid.innerHTML = "";
  const today = new Date();

  const daysBeforeFirst = weekDayOfFirstDay();
  const numberOfDays = numberOfDaysThisMonth();

  for (let i = 0; i < daysBeforeFirst; i++) {
    const emptyElement = document.createElement("div");
    calGrid.appendChild(emptyElement);
  }

  for (let i = 1; i <= numberOfDays; i++) {
    const isToday = 
      today.getFullYear() === currentDate.getFullYear() &&
      today.getMonth() === currentDate.getMonth() &&
      i === today.getDate();

    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar__day");
    dayElement.textContent = i;
    
    if (isToday) dayElement.classList.add("calendar__day--today");

    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

    if (highlightDate && dateStr === highlightDate) {
      dayElement.classList.add("calendar__day--active");
    }

    dayElement.addEventListener("click", () => {
      if (onDayClick) {
        onDayClick(dateStr);
      } else {
        window.location.href = `diary/index.html?date=${dateStr}`;
      }
    });

    if (hasDiaryEntry(dateStr)) {
      dayElement.classList.add("calendar__day--has-task");
    }

    calGrid.appendChild(dayElement);
  }
}

function isCurrentMonthReal() {
  return getMonthKey(currentDate) === getMonthKey(new Date());
}

function updateCalTitle() {
  calTitle.textContent = formatDisplayMonth(currentDate);
  if (!isCurrentMonthReal()) {
    calTitle.classList.add("calendar__title--clickable");
  } else {
    calTitle.classList.remove("calendar__title--clickable");
  }
}

function toPrevMonth() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  currentDate = new Date(year, month - 1, 1);
  updateCalTitle();
  render(onDayClickCallback, highlightedDate);
}

function toNextMonth() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  currentDate = new Date(year, month + 1, 1);
  updateCalTitle();
  render(onDayClickCallback, highlightedDate);
}

function goToCurrentMonth() {
  if (isCurrentMonthReal()) return;
  currentDate = new Date();
  updateCalTitle();
  render(onDayClickCallback, highlightedDate);
}

export function initCalendar(onDayClick, highlightDate) {
  onDayClickCallback = onDayClick;
  highlightedDate = highlightDate;
  updateCalTitle();
  render(onDayClick, highlightDate);

  toPrev.addEventListener("click", toPrevMonth);
  toNext.addEventListener("click", toNextMonth);
  calTitle.addEventListener("click", goToCurrentMonth);
}