// activating the strict mode
"use strict";

// variables - global
const input = document.querySelector('input.calculator-input');
const keys = document.querySelectorAll('.key');
const allClearKey = document.querySelector('.all-clear-key');
const clearLastKey = document.querySelector('.clear-last-key');
const equalToKey = document.querySelector('.equal-to-key');
const copyBtn = document.querySelector('.copy-btn');

// functions
// add key's innerText to the input on click
// if it's not labeled as a special key
const handleKeyClick = (e) => {
    if (!e.target.className.includes('special-key')) {
        input.value += e.target.innerText;
    };
};

// calculate the input and set its value equal to the result of the calculation
const handleCalculation = () => {
    if (input.value.length) {
        // the split() and join() methods are used
        // to replace "^" with "**" as the eval()
        // function does not recognize "^"
        input.value = eval(input.value.split("^").join("**"));
        // there are some serious security issues concerned to the eval() function
        // so be careful when using it on real-world projects
        // read https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval for more info
    }
};

// clearing the input value completely
const handleAllClear = () => {
    input.value = "";
};

// remove the last character of the input value string - backspace functionality
const handleClearLast = () => {
    input.value = input.value.slice(0, -1);
};

// shortcuts ==>
// Enter = submit
// alt + ctrl + a = clear all
// alt + ctrl + c = clear last char
const handleShortcuts = (e) => {
    if (e.key == 'Enter') {
        e.preventDefault();
        handleCalculation();
    }
    if ((e.ctrlKey && e.altKey) &&
        (e.key == 'a' || e.key == 'A')
    ) {
        e.preventDefault();
        handleAllClear();
    }
    if ((e.ctrlKey && e.altKey) &&
        (e.key == 'c' || e.key == 'C')
    ) {
        e.preventDefault();
        handleClearLast();
    }
};

const handleCopy = () => {
    // check for browser support
    // the trim() method is used to remove the
    // spaces from both sides of a string
    // this method might not be of use here
    // , but it's still worth using or at least
    // mentioning it here
    if ('clipboard' in navigator) {
        navigator.clipboard.writeText(input.value.trim()).then(() => {
            alert("Text Copied to Clipboard Successfully !!!");
        }).catch(err => console.error(err));
    } else {
        throw new Error('No Browser Support was Found for this Operation !!!');
    }
};

// event-listeners
window.onkeydown = handleShortcuts;
keys.forEach(key => key.addEventListener('click', handleKeyClick));
allClearKey.onclick = handleAllClear;
clearLastKey.onclick = handleClearLast;
equalToKey.onclick = handleCalculation;
copyBtn.onclick = handleCopy;

// my github profile link ==> https://github.com/sina-byn