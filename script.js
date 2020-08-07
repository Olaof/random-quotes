const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const emotic = document.getElementById('emotic');
const githubLink = document.getElementById('github');

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    if( !loader.hidden ) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


// Get Quote From API

async function getQuote() {
    loading();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();

        if (data.quoteAuthor === '') {
            authorText.innerText = 'unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop loader, Show quote
        complete();
    } catch (error) {
        getQuote();
        
    }

}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

function emoticSource() {
    const emoticUrl = "https://freeicons.io/free-emojis-icons-pack-3/arrow-alt-circle-down-correct-in-love-icon-5925";
    window.open(emoticUrl, '_blank');
}

function githubSource() {
    const githubUrl = "https://github.com/Olaof/random-quote-app";
    window.open(githubUrl, '_blank');
}


newQuoteBtn.addEventListener('click', getQuote);
githubLink.addEventListener('click', githubSource);
twitterBtn.addEventListener('click', tweetQuote);
emotic.addEventListener('click', emoticSource);



// on load
getQuote();