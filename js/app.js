/*CSS Styles: 
Open, SHow - blue open
Match - matched card
 * Create a list that holds all of your cards
 */
var cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb',
            'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;  
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Function to start the game up or restart it.
function initializeGame() {
  var deck = document.querySelector('.deck');
  var cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  //set up move counter
  moves = 0;
  deck.innerHTML = cardHTML.join('');
}

initializeGame();

/*Global variables:
allCards array: Holds all .card elements generated on page.
openCards array: holds currently open card(s).
moves integer: An incrementing count of moves the player makes.
moveCounter: Variable for .moves element on page.*/
var allCards = document.querySelectorAll('.card');
var openCards = [];
var moves = 0;
var moveCounter = document.querySelector('.moves');


//for each card in allCards array...
allCards.forEach(function(card) {
  //...add a click event listener!
  card.addEventListener('click', function(event) {
    
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card); //push current card into array
      //When click event occurs on card, add Open,Show classes.
      card.classList.add('open', 'show');

       //two cards:
      if (openCards.length == 2) {
        //if two selected cards match:
        match();
        
        //If two selected cards don't match:
		noMatch();

		moves += 1;
      	moveCounter.innerText = moves;

      }
      
    }
    
  });

});


/*When cards match, add the open, show, and match clases to them.
Empty openCards array.*/
function match() {
	if (openCards[0].dataset.card == openCards[1].dataset.card) {
      openCards[0].classList.add('match');
      openCards[0].classList.add('open');
      openCards[0].classList.add('show');
      openCards[1].classList.add('match');
      openCards[1].classList.add('open');
      openCards[1].classList.add('show');
      openCards = [];
    }
}


/*When cards don't match, when timer reaches 800ms,
remove open/show classes and empty openCards array.*/
function noMatch() {
    setTimeout(function() {
      openCards.forEach(function(card) {
        card.classList.remove('open', 'show');
      });
      openCards = []; //clear array
    }, 800);
}

/*Git uploads:
git status
git add .
git status
git commit -m "Enter text here"
git push -u origin master*/