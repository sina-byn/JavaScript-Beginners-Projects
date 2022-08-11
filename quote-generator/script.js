const nameDisp = document.querySelector('.name-disp');
const quoteText = document.querySelector('.quote-text');
const genBtn = document.querySelector('.gen-btn');
const copyBtn = document.querySelector('.copy-btn');
let quotes = [],
    randomQuote = {};

// functions
// a function to fetch data of the given api url and parse the JSON data
const fetchQuotes = async (url) => {
    try {
        const res = await fetch(url);
        quotes = await res.json();
    } catch (err) {
        console.error(err);;
    }
};

const getRandomQuote = () => {
    if (quotes.length) {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }
    return;
};

// this api returns a list of 50 quotes - we fetch all of the so we won't have to make a new request to the server
// and thereafter we'll use the fetched quotes - no more response to the server is sent
fetchQuotes('https://type.fit/api/quotes');

// event-listeners
genBtn.onclick = () => {
    // destructuring the name of the author and the quote itself from the fetched objec
    randomQuote = getRandomQuote()
    const { text, author } = randomQuote;
    nameDisp.textContent = author || 'unknown'; // in case the author is null set as 'unknown
    quoteText.textContent = text;
};
copyBtn.onclick = () => {
    navigator.clipboard.writeText(`Quote By: ${randomQuote.author} - ${randomQuote.text}`).then(() => {
        alert("Quote Copiedt Successfully");
    }).catch(err => console.error(err));
};

// my github profile link ==> https://github.com/sina-byn