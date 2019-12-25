/* Global variables */
let allQuotes = '';
let theQuote = '';
let theAuthor = '';
let randomStyle
let styles = [
  {
    background: 'bg-danger',
    text: 'text-danger',
    button: 'btn-danger'
  },
  {
    background: 'bg-primary',
    text: 'text-primary',
    button: 'btn-primary'
  },
  {
    background: 'bg-secondary',
    text: 'text-secondary',
    button: 'btn-secondary'
  },
  {
    background: 'bg-success',
    text: 'text-success',
    button: 'btn-success'
  },
  {
    background: 'bg-info',
    text: 'text-info',
    button: 'btn-info'
  },
  {
    background: 'bg-warning',
    text: 'text-warning',
    button: 'btn-warning'
  },
  {
    background: 'bg-dark',
    text: 'text-dark',
    button: 'btn-dark'
  }
];

/* jQuery */
$(document).ready(() => {
  /* Initial quote */
  getData().then(() => {
    getQuote();
    changeStyles();
  });

  /* New quote button */
  $('#new-quote').click(() => {
    removeStyles();
    getQuote();
    changeStyles();
  });

  /* Get data function*/
  function getData() {
    return jQuery.ajax({
      url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
      success: function (data) {
        allQuotes = JSON.parse(data);
      }
    });
  }

  /* Randon quote function */
  function getRandomQuote() {
    return allQuotes.quotes[Math.floor(Math.random() * allQuotes.quotes.length)];
  }

  /* Selected quote functiion */
  function getQuote() {
    let randomQuote = getRandomQuote();
    theQuote = randomQuote.quote;
    theAuthor = randomQuote.author;
    $('#text').text('"' + theQuote);
    $('#author').text(theAuthor);
  }

  /* Change Style function */
  function changeStyles() {
    randomStyle = styles[Math.floor(Math.random() * styles.length)];
    $('#body-id').addClass(randomStyle.background);
    $('#text, #author').addClass(randomStyle.text);
    $('#tweet-quote, #new-quote').addClass(randomStyle.button);
  }

  /* Remove style function */
  function removeStyles() {
    $('#body-id').removeClass(randomStyle.background);
    $('#text, #author').removeClass(randomStyle.text);
    $('#tweet-quote, #new-quote').removeClass(randomStyle.button);
  }

  /* Tweet button */
  $('#tweet-quote').click(() => {
    tweetQuote();
  });

  /* Tweet function */
  function tweetQuote() {
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + theQuote + '" ' + theAuthor));
    openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + theQuote + '" ' + theAuthor));
  }

});