// my github profile link ==> https://github.com/sina-byn
// I didn't leave out comments on this one since I want you to figure out the code yourself, so good luck =)
const hourDisp = document.querySelector('.hour-disp');
const minuteDisp = document.querySelector('.minute-disp');
const secondDisp = document.querySelector('.second-disp');
const hundredthOfSecondDisp = document.querySelector('.hundredth-of-second-disp');
const lapsDisp = document.querySelector('.laps-disp');
const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapBtn = document.querySelector('.lap-btn');
const resetCheckbox = document.querySelector('input[type="checkbox"]');
let passedTime = 0,
    stopTime = 0,
    isPaused = true,
    lapsCount = 0,
    interval = null;

// event-listeners
startBtn.onclick = () => {
    const startTime = Date.now();
    if (isPaused) {
        startBtn.innerText = 'Pause';
        startTimer(startTime);
        isPaused = false;
    } else {
        startBtn.innerText = 'Start';
        pasueTimer();
        isPaused = true;
    }
};
resetBtn.onclick = resetTimer;
lapBtn.onclick = addLap;

// functions
function startTimer(startTime) {
    interval = setInterval(() => {
        passedTime = Date.now() - startTime + stopTime;
        setTimer();
    }, 10);
}

function pasueTimer() {
    stopTime = passedTime;
    clearInterval(interval);
}

function resetTimer() {
    startBtn.innerText = 'Start';
    passedTime = 0;
    stopTime = 0;
    isPaused = true;
    clearInterval(interval);
    setTimer();

    if (resetCheckbox.checked) {
        lapsCount = 0;
        lapsDisp.innerHTML = `
            <h2 class="w-full">laps:</h2>
        `;
    }
}

function formatPassedTime(passedTime) {
    let elapsedTime = passedTime;
    const hours = Math.trunc(elapsedTime / 1000 / 3600);
    elapsedTime = elapsedTime - (hours * 1000 * 3600);
    const minutes = Math.trunc(elapsedTime / 1000 / 60);
    elapsedTime = elapsedTime - (minutes * 1000 * 60);
    const seconds = Math.trunc(elapsedTime / 1000);
    elapsedTime = elapsedTime - (seconds * 1000);
    const hundredthsOfSecond = Math.trunc(elapsedTime / 10);

    return {
        hours,
        minutes,
        seconds,
        hundredthsOfSecond
    };
}

function setTimer() {
    const {
        hours,
        minutes,
        seconds,
        hundredthsOfSecond
    } = formatPassedTime(passedTime);
    hourDisp.textContent = hours < 10 ? '0' + hours : hours;
    minuteDisp.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondDisp.textContent = seconds < 10 ? '0' + seconds : seconds;
    hundredthOfSecondDisp.textContent = hundredthsOfSecond < 10 ? '0' + hundredthsOfSecond : hundredthsOfSecond;
}

function addLap() {
    const newLap = document.createElement('p');
    newLap.className = "flex justify-between";
    newLap.innerText = `
        ${++lapsCount} - ${hourDisp.innerText} : ${minuteDisp.innerText} : ${secondDisp.innerText} : ${hundredthOfSecondDisp.innerText}
    `;

    lapsDisp.appendChild(newLap);
}