// my github profile link ==> https://github.com/sina-byn
const format24hBtn = document.querySelector('.format-24h-btn');
const formatAmPmBtn = document.querySelector('.format-am-pm-btn');
const hoursDisp = document.querySelector('.hours-disp');
const minutesDisp = document.querySelector('.minutes-disp');
const secondsDisp = document.querySelector('.seconds-disp');
const amPmDisp = document.querySelector('.am-pm-disp');
let timeFormat = "24h";

// functions - expressions
const getTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    amPmDisp.innerText = '';
    if (timeFormat === 'am-pm') {
        amPmDisp.innerText = 'am';

        if (hours > 12) {
            hours = hours - 12;
            amPmDisp.innerText = 'pm';
        }
    }

    // if hour or etc. is less than 10 we want them to be shown like '01' for example
    // with a '0' added before
    hours < 10 ? hours = '0' + hours : null;
    minutes < 10 ? minutes = '0' + minutes : null;
    seconds < 10 ? seconds = '0' + seconds : null;

    return {
        hours,
        minutes,
        seconds
    };
};

const showTime = () => {
    // object destructuring
    const {
        hours,
        minutes,
        seconds
    } = getTime();

    hoursDisp.innerText = hours;
    minutesDisp.innerText = minutes;
    secondsDisp.innerText = seconds;
};

const initOnLoad = () => {
    showTime();

    // setting an interval in order to execute the function again
    setInterval(() => {
        showTime();
    }, 1000);
};

// event-listeners
window.onload = initOnLoad;
format24hBtn.onclick = () => timeFormat = '24h';
formatAmPmBtn.onclick = () => timeFormat = 'am-pm';