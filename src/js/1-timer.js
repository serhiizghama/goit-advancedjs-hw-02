import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import '../css/styles.css';
import '../css/error.css';

import { fillTimer } from './fill-timer';
import { showToast } from './toast';

const dateTimePicker = document.querySelector('input#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const currentDate = new Date();
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < currentDate.getTime()) {
      showToast('error', 'Please, choose a date in the future', 'Error');
      startButton.disabled = true;
      startButton.removeEventListener('click', startTimer);
    } else {
      userSelectedDate = selectedDates[0];
      startButton.disabled = false;
      startButton.addEventListener('click', startTimer);
    }
  },
};

flatpickr(dateTimePicker, options);

function startTimer() {
  startButton.disabled = true;
  dateTimePicker.disabled = true;
  if (!userSelectedDate || userSelectedDate < currentDate) {
    return;
  }

  const timerInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = userSelectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      dateTimePicker.disabled = false;
      return;
    }

    fillTimer(timeDifference);
  }, 1000);
}
