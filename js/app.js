/*Global variables:
allCards array: Holds all .card elements generated on page.
openCards array: holds currently open card(s).
moves integer: An incrementing count of moves the player makes.
moveCounter: Variable for .moves element on page.
matchCount: Tracks count of matched cards, up to 16 for win condition.*/
let allCards = document.querySelectorAll('.card');
let openCards = [];
let moves = 0;
const moveCounter = document.querySelector('.moves');
let matchCount = 0;

// Get the modal
var modal = document.getElementById('winnerModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

/*Cards array: Holds all the card element classes,
which are used as variables when programatically generating card deck HTML.*/
const cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 
			'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb',
			'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 
			'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

/* Shuffle function from http://stackoverflow.com/a/2450976
Takes cards array and shuffles up their order.*/
function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


document.body.onload = initializeGame();

/*Function to start the game up upon page load, or upon restart button click event.
deck: The deck div which will hold all programatically generated cards.
cardHTML: Uses shuffle function on cards array. Then creates a new array using map.
This newly shuffled array is then sent to generateCard function.*/
function initializeGame() {
	const deck = document.querySelector('.deck');
	let cardHTML = shuffle(cards).map(function(card) {
		return generateCard(card);
	});
	//Start/reset moves to 0.
	moves = 0;
	moveCounter.innerText = moves;
	matchCount = 0;
	//Newly shuffled/created string of cardHTML passed to deck div for displaying.
	deck.innerHTML = cardHTML.join('');
	allCards = document.querySelectorAll('.card');
	addListenersToCards();
}


//HTML string with card classes passed in. Creates 16 cards.
function generateCard(card) {
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;  
}

function addListenersToCards(){
	//for each card in allCards array...
	allCards.forEach(function(card) {
	  //...listen for Click events on cards!
		clickEventListener(card);
	});
}


function clickEventListener(card) {
	card.addEventListener('click', function(event) {
	/*Check card for suitability of being clicked. Cannot open an already open or matched card, 
	or when there are already two cards open.*/
	checkClickedCard(card);
  });
}

function checkClickedCard(card) {
	if (!card.classList.contains('open') && !card.classList.contains('show') && 
	!card.classList.contains('match') && openCards.length <= 1) {

	openCards.push(card); //push current card into array
	//Open the clicked card by applying classes:
	openSelectedCard(card);
	//Check if you have two open cards. If so, see if they match or not:
	checkOpenCards();
	}
}

function openSelectedCard(card) {
	card.classList.add('open', 'show');
}

function checkOpenCards() {
  if (openCards.length == 2) {
	//if two selected cards match:
	match();
	//If two selected cards don't match:
	noMatch();
	//Increment moves:
	incrementMove();
	//Check if all cards are matched:
	checkWinner();
  }
}

/*When cards match, add the open, show, and match clases to them.
Empty openCards array.*/
function match() {
	if (openCards[0].dataset.card == openCards[1].dataset.card) {
		openCards[0].classList.add('match');
		openCards[1].classList.add('match');
		matchCount += 2;
		openCards = []; //clear array
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
	}, 700);
}

function incrementMove() {
	moves += 1;
	moveCounter.innerText = moves;
}

function checkWinner() {
	if (matchCount === 16) {
		modal.style.display = "block";
		document.getElementById('finalMove').innerHTML = moves;
		document.getElementById('finalTime').innerHTML = moves;
		document.getElementById('finalStar').innerHTML = moves;
	}
}

/*Git uploads:
git status
git add .
git status
git commit -m "Enter text here"
git push -u origin master*/

// // Get the modal
// //var modal = document.getElementById('winnerModal');

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal.
btn.onclick = function() {
    modal.style.display = "block";
    document.getElementById('finalMove').innerHTML = moves;
    document.getElementById('finalTime').innerHTML = moves;
	document.getElementById('finalStar').innerHTML = moves;
}

// When the user clicks on "x", close the modal.
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it.
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}