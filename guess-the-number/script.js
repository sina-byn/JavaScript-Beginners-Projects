// activating the strict mode
"use strict";

// variables - global
const guessInput = document.querySelector('.guess-inp');
const checkBtn = document.querySelector('.check-btn');
const redoBtn = document.querySelector('.redo-btn');
const msgContainer = document.querySelector('.msg-container');
let computerChosenNumber = null;

// event-listeners
window.onload = setRandomNumber;
checkBtn.onclick = checkGuess;
redoBtn.onclick = resetGame;

// functions - there is no problem to use functions before defining them due to js hositing
// note that hoisting does not happen when using function exporessions instead of definition
// that's why I am using function definition here
function setRandomNumber() {
    // generate a random number: 0-100 ==> inclusive, 101 ==> exclusive
    // and assign it to the dedicated variable
    computerChosenNumber = Math.floor(Math.random() * (101));
}

function checkGuess() {
    // get the user input value and convert to type 'number' using +
    const guessedNumber = +guessInput.value;

    // if the user input number is the same as the one chosen by the computer
    // then we have a winner
    if (guessedNumber === computerChosenNumber) {
        setMsg("We have a winner !!! =)");
        return true;
    }

    // if user_input !== computer_chosen_number then we should
    // calculate to see how far is the user guess
    // for the comparisons below we need the absolute (positive) value of
    // the gap so we Math.abs() for that purpose
    const gap = Math.abs(guessedNumber - computerChosenNumber);

    console.log(gap);
    // setting different message based on how far is the user guess
    // you can take negatvie values of the gap into consideration to
    // to check if the user input is smaller or bigger than the
    // chosen number - get rid of Math.abs() - but for the sake of
    // simplicity I just keep it at this level
    if (gap > 20) {
        setMsg('Your number is far off =(');
    } else if (gap > 10) {
        setMsg('Getting closer =|');
    } else {
        setMsg('WoooW Really Close =)');
    }
}

function setMsg(msgText) {
    if (msgText === '') {
        msgContainer.classList.add('hidden');
    } else if (msgText) {
        // check to see if the msgContainer is already hidden or not
        if (msgContainer.className.includes('hidden')) {
            msgContainer.classList.remove('hidden');
        }

        msgContainer.innerText = msgText;
    }
}

function resetGame() {
    setMsg("");
    setRandomNumber();
}

// my github profile link ==> https://github.com/sina-byn