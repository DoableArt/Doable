import { initDay } from './day.js';
import { initTheme } from './theme.js';
import { initMonth } from './month.js';
import { initHabits } from './habits.js';
import { initCalendar } from './calendar.js';
import { initShortCuts } from './shortcuts.js';

document.addEventListener("DOMContentLoaded", () => {
  initShortCuts();
  initTheme();
  initDay();
  initMonth();
  initHabits();
  initCalendar();
});