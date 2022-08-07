const passwordDisp = document.querySelector('.pass-disp');
const generateBtn = document.querySelector('.gen-btn');
const copyBtn = document.querySelector('.copy-btn');
const lengthInput = document.querySelector('.length-input');
const capitalsChecbox = document.querySelector('.capitals-checkbox');
const signsCheckbox = document.querySelector('.signs-checkbox');
const letters = 'abcdefghijklmnopqrstuvwxyz';
const signs = '!@#$%^&*()_+=/|.><[]{}';
let allowCapitalLetters = true;
let allowSigns = true;

// functions
const generatePass = () => {
    let password = '';
    const wantedLength = +lengthInput.value;

    if (wantedLength) {
        const methods = [
            () => password += getRandomDigit(),
            () => password += getRandomLetter(),
        ];

        // add these methods to the list of methods if allowed
        allowCapitalLetters ? methods.push(() => password += getRandomLetter(true)) : null;
        allowSigns ? methods.push(() => password += getRandomSign()) : null;

        const methodsCount = methods.length;
        // getting the count of the methods in order to use it in the for loop
        // so we won't have to access the length property of the "methods" array
        // on each iteration - gives a better performance overall - not that big of a difference in our case ,but still worths noting

        // use the label to jump out of the loop using a break statement
        pass_gen_loop: while (password.length <= wantedLength) {
            for (let i = 0; i < methodsCount; i++) {
                methods[i](); // loop through the methods that are already stored in the array and execute them

                if (password.length === wantedLength) {
                    break pass_gen_loop;
                }
            }
        }

        passwordDisp.value = randomizeString(password); // randomize the string so the pattern of the password becomes unpredictable
    } else {
        alert('password length must be set to 4 or any value more than 5');
    }
};

const getRandomDigit = () => {
    return Math.floor(Math.random() * 10);
}

const getRandomLetter = (getCapital = false) => {
    const randomIdx = Math.floor(Math.random() * letters.length);
    const letter = letters[randomIdx];
    return getCapital ? letter.toUpperCase() : letter;
};

const getRandomSign = () => {
    const randomIdx = Math.floor(Math.random() * signs.length);
    return signs[randomIdx];
};

const randomizeString = (string) => {
    const splittedString = string.split('');
    let randomString = '';

    while (splittedString.length) {
        const randomIdx = Math.floor(Math.random() * splittedString.length);
        randomString += splittedString[randomIdx];
        splittedString.splice(randomIdx, 1);
    }

    return randomString;
};

const copyPassword = () => {
    navigator.clipboard.writeText(passwordDisp.value)
        .then(() => {
            alert('password copied to clipboard');
        })
        .catch(err => console.error(err));
};

// event-listeners
window.onload = generatePass;
generateBtn.onclick = generatePass;
copyBtn.onclick = copyPassword;
capitalsChecbox.oninput = (e) => allowCapitalLetters = e.target.checked;
signsCheckbox.oninput = (e) => allowSigns = e.target.checked;

// my github profile link ==> https://github.com/sina-byn