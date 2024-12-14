// script.js
let timer;
let minutes = 0, seconds = 0, milliseconds = 0;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');

// Start Timer
startBtn.addEventListener('click', () => {
    if (isRunning) return; // Prevent multiple intervals
    isRunning = true;
    timer = setInterval(() => {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 10);
});

// Stop Timer
stopBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
});

// Reset Timer
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    lapsContainer.innerHTML = ''; // Clear laps
});

// Add Lap
lapBtn.addEventListener('click', () => {
    if (!isRunning) return; // No laps if the timer isn't running
    const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds / 10)}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
    lapsContainer.appendChild(lapItem);
});

// Update Display
function updateDisplay() {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds / 10);
}

// Format Time
function formatTime(time) {
    return time < 10 ? `0${Math.floor(time)}` : Math.floor(time);
}
