const startButton = document.getElementById('start');
const timerNumbers = document.getElementById('numbers');
const savedTimesList = document.getElementById('savedTimesList');

let miliSeconds = '00';
let seconds = '00';
let minutes = '00';
let hours = '00';
let intervalId;

let buttonReset;
let buttonSave;
let buttonClear;
let buttonReverse;
let buttonclearAll;

const updateTimerDisplay = () => {
    timerNumbers.textContent = `${hours}:${minutes}:${seconds}:${miliSeconds}`;
};

const createButtons = () => {
    if (!buttons.querySelector('.buttonsForControl')) {
        buttonReset = buttonCreate('Reset', resetTimer);
        buttonSave = buttonCreate('Save', saveTimer);
        buttonClear = buttonCreate('Clear', clearSavedTime);
        buttonReverse = buttonCreate('Reverse', reverseTimer);
        buttonclearAll = buttonCreate('Clear All', clearAll);
    }
};

const buttonCreate = (buttonText, clickHandler) => {
    const button = document.createElement('button');
    button.innerHTML = buttonText;
    button.className = 'buttonsForControl';
    buttons.appendChild(button);
    button.addEventListener('click', clickHandler);
    return button;
};

const resetTimer = () => {
    clearInterval(intervalId);
    miliSeconds = '00';
    seconds = '00';
    minutes = '00';
    hours = '00';
    updateTimerDisplay();
    sessionStorage.setItem('timerData', JSON.stringify({ miliSeconds, seconds, minutes, hours }));
};

const saveTimer = () => {
    const savedTime = document.createElement('li');
    savedTime.textContent = `${hours}:${minutes}:${seconds}:${miliSeconds}`;
    savedTimesList.appendChild(savedTime);
    sessionStorage.setItem('savedTime', savedTimesList.innerHTML);
};

const clearSavedTime = () => {
    savedTimesList.innerHTML = '';
    sessionStorage.removeItem('savedTime');
};

const reverseTimer = () => {
    clearInterval(intervalId);
    intervalId = setInterval(reverseMilliseconds, 10);
};

const clearAll = () => {
    clearInterval(intervalId);
    miliSeconds = '00';
    seconds = '00';
    minutes = '00';
    hours = '00';
    savedTimesList.innerHTML = '';
    sessionStorage.clear();
    updateTimerDisplay();
};

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

const reverseMilliseconds = () => {
    miliSeconds = Number(miliSeconds);
    seconds = Number(seconds);
    minutes = Number(minutes);
    hours = Number(hours);

    if (miliSeconds === 0 && seconds === 0 && minutes === 0 && hours === 0) {
        clearInterval(intervalId);
        return;
    }

    if (miliSeconds === 0) {
        miliSeconds = 99;
        if (seconds === 0) {
            seconds = 59;
            if (minutes === 0) {
                minutes = 59;
                if (hours > 0) {
                    hours--;
                }
            } else {
                minutes--;
            }
        } else {
            seconds--;
        }
    } else {
        miliSeconds = (miliSeconds < 11 ? '00' : '') + (miliSeconds - 1);
    }

    hours = (hours < 10 ? '0' : '') + hours;
    minutes = (minutes < 10 ? '0' : '') + minutes;
    seconds = (seconds < 10 ? '0' : '') + seconds;
    updateTimerDisplay();
};

if (sessionStorage.getItem('timerData')) {
    const timerData = JSON.parse(sessionStorage.getItem('timerData'));
    miliSeconds = timerData.miliSeconds;
    seconds = timerData.seconds;
    minutes = timerData.minutes;
    hours = timerData.hours;
    updateTimerDisplay();
}

if (sessionStorage.getItem('savedTime')) {
    savedTimesList.innerHTML = sessionStorage.getItem('savedTime');
}


startButton.addEventListener('click', () => {
    if (startButton.innerHTML === 'Start') {
        startButton.style.backgroundColor = 'red';
        startButton.innerHTML = 'Stop';
        intervalId = setInterval(startMilliseconds, 10);
    } else {
        startButton.style.backgroundColor = 'rgb(99, 255, 60)';
        startButton.innerHTML = 'Start';
        createButtons(); 
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

