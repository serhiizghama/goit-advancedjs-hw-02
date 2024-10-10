const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

export function fillTimer(timeDifference) {
  const timeObject = convertMs(timeDifference);
  daysElem.textContent = addLeadingZero(timeObject.days);
  hoursElem.textContent = addLeadingZero(timeObject.hours);
  minutesElem.textContent = addLeadingZero(timeObject.minutes);
  secondsElem.textContent = String(timeObject.seconds).padStart(2, '0');
}

function addLeadingZero(value) {
  return value < 10 ? String(value).padStart(2, '0') : String(value);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
