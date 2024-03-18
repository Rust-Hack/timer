const startButton = document.getElementById('start');
const timerNumbers = document.getElementById('numbers');

let miliSeconds = '00';
let seconds = '00';
let minutes = '00';
let hours = '00';
let intervalId;

const updateTimerDisplay = () => {
    timerNumbers.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + miliSeconds;
};

if (sessionStorage.getItem('timerData')) {
    const timerData = JSON.parse(sessionStorage.getItem('timerData'));
    miliSeconds = timerData.miliSeconds;
    seconds = timerData.seconds;
    minutes = timerData.minutes;
    hours = timerData.hours;
    updateTimerDisplay();
}

startButton.addEventListener('click', () => {
    if (startButton.innerHTML === 'Start') {
        startButton.style.backgroundColor = 'red';
        startButton.innerHTML = 'Stop';
        intervalId = setInterval(startMilliseconds, 10);
    } else {
        startButton.style.backgroundColor = 'rgb(99, 255, 60)';
        startButton.innerHTML = 'Start';
        clearInterval(intervalId);

        const timerData = {
            miliSeconds,
            seconds,
            minutes,
            hours
        };
        sessionStorage.setItem('timerData', JSON.stringify(timerData));
    }
});

const startMilliseconds = () => {
    miliSeconds = Number(miliSeconds);
    seconds = Number(seconds);
    minutes = Number(minutes);
    hours = Number(hours);

    if (miliSeconds === 99) {
        miliSeconds = '00';
        seconds++;
        if (seconds === 60) {
            seconds = '00';
            minutes++;
            if (minutes === 60) {
                minutes = '00';
                hours++;
            }
        }
    } else {
        miliSeconds = (miliSeconds < 9 ? '0' : '') + (miliSeconds + 1);
    }

    hours = (hours < 10 ? '0' : '') + hours;
    minutes = (minutes < 10 ? '0' : '') + minutes;
    seconds = (seconds < 10 ? '0' : '') + seconds;
    updateTimerDisplay();
};
