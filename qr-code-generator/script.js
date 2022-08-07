const urlInput = document.querySelector('input');
const generateBtn = document.querySelector('.generate-btn');
const pasteBtn = document.querySelector('.paste-btn');
const downloadLink = document.querySelector('.download-link');
const qrcode = new QRCode(document.querySelector('.qr-code'), {
    text: 'https://my-portfolio-sina-byn.vercel.app/',
    width: 300,
    height: 300,
    // colorDark: '#000000', use an input of type "color" so you can have different colors in your qr-code
    // colorLight: '#ffffff', use an input of type "color" so you can have different colors in your qr-code
    // correctLevel: QRCode.CorrectLevel.H
});

// event-listeners
generateBtn.addEventListener('click', generateNewQrCode);
pasteBtn.addEventListener('click', handlePaste);

// functions
function generateNewQrCode() {
    if (urlInput.value) {
        qrcode.clear(); // clearing the previous qr-code
        qrcode.makeCode(urlInput.value); // generating a new qr-code

        const timeout = setTimeout(() => {
            const qrCodeElem = document.querySelector('img'); // the generated qr-code is appended as an img element
            const qrCodeSrc = qrCodeElem.getAttribute('src'); // get the src of the img element
            downloadLink.href = qrCodeSrc; // set the href of the download link equal to the src of the img
            downloadLink.download = 'qr-code'; // set the download attribute for the download link with the value being the name of the file that will be downloaded
            downloadLink.classList.remove('hidden'); // removing the hidden tailwind class in order for the download link to appear
            clearTimeout(timeout); // clearing the timeout to get rid of its side-effects
        }, 500);
    } else {
        alert("Please fill the input and try again !!!"); // alert if the input value is empty
    }
}

function handlePaste() {
    navigator.clipboard.readText().then(text => {
        urlInput.value = text.trim();
    }).catch(err => console.error(err));
}

// my github profile link ==> https://github.com/sina-byn