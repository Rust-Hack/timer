const startButton = document.getElementById('start');
const timerNubers = document.getElementById('numbers');

startButton.addEventListener('click', () => {
    if(startButton.innerHTML == 'Start') {
        startButton.style.backgroundColor = 'red';
        startButton.innerHTML = 'Stop';
    } else {
        startButton.style.backgroundColor = 'rgb(99, 255, 60)';
        startButton.innerHTML = 'Start';
    }

})