document.addEventListener('DOMContentLoaded', main);

function main() {
    document.querySelector(".game").classList.add("hidden");
    document.querySelector(".result").classList.add("hidden");
    document.querySelector(".reset-btn").classList.add("hidden");
    document.querySelector(".error-message").classList.add("hidden");

    const lastScoreDisplay = document.createElement('div'); 
    lastScoreDisplay.classList.add('last-score', 'hidden'); 
    document.body.insertBefore(lastScoreDisplay, document.querySelector('.game'));

    document.querySelector('.play-btn').addEventListener('click', gameStart);
}

let maxTurns = 0; 
let currentTurn = 0; 
let gamenumber = 0;


function gameStart() {
    if (!document.querySelector('.turn-display')) {
        const turnDisplay = document.createElement('div');
        turnDisplay.classList.add('turn-display'); 
        document.body.insertBefore(turnDisplay, document.querySelector('.game')); 
    }

    const totalCards = parseInt(document.querySelector('#total-cards').value, 10);
    maxTurns = parseInt(document.querySelector('#max-turns').value, 10);
    const cardFacesInput = document.querySelector('#card-faces').value;
    currentTurn = 0;
    updateTurnDisplay();
    if (!isValidTotalCards(totalCards) || !isValidMaxTurns(maxTurns, totalCards)) {
        document.querySelector(".error-message").textContent = "Invalid entry! Please re-enter the number of cards (must be even number greater than 2 and less than equal to 36) and max turns !";
        document.querySelector(".error-message").classList.remove("hidden");
        return;
    }   
    if (!isValidCardFaces(cardFacesInput, totalCards)) {
        document.querySelector(".error-message").textContent = "Invalid entry! Please enter the same number of card values as the number of cards that you said. There must be two cards of every symbol!";
        document.querySelector(".error-message").classList.remove("hidden");
        return;
    }   

    let cardValues;
    if (cardFacesInput) {
        cardValues = cardFacesInput.split(',');
    } else {
        cardValues = generateRandomCardValues(totalCards);
    }
    generateBoard(cardValues);
    document.querySelector(".start").classList.add("hidden");
    document.querySelector(".error-message").classList.add("hidden");
    document.querySelector(".game").classList.remove("hidden");
    
}

function isValidTotalCards(totalCards) {
    return totalCards % 2 === 0 && totalCards > 2 && totalCards <= 36;
}

function isValidMaxTurns(maxTurns, totalCards) {
    return maxTurns >= totalCards / 2;
}

function isValidCardFaces(cardFacesInput, totalCards) {
    if (!cardFacesInput) {
        return true;
    }
    const cardFaces = cardFacesInput.split(',');
    if (cardFaces.length !== totalCards) {
        return false;
    }
    const counts = {};
    for (const face of cardFaces) {
        counts[face] = (counts[face] || 0) + 1;
    }
    if (Object.values(counts).every(count => count === 2)) {
        return true;
    }
}

function updateTurnDisplay() {
    const turnDisplay = document.querySelector('.turn-display');
    turnDisplay.textContent = `TURN ${currentTurn}/${maxTurns}`; // Display current turn/max turns
}


function generateRandomCardValues(totalCards) {
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎'];
    let randomCards = [];
    for (let i = 0; i < totalCards/2; i++) {
        randomCards.push(emojis[i%emojis.length], emojis[i%emojis.length])
    }
    for (let i = randomCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomCards[i], randomCards[j]] = [randomCards[j], randomCards[i]];
    }
    return randomCards;
}


function generateBoard(cardValues){
    const gameBoard = document.querySelector('.game');
    gameBoard.innerHTML = ''; 

    const rows = Math.ceil(Math.sqrt(cardValues.length));
    const cols = Math.floor(cardValues.length / rows);

    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card', 'face-down');
        card.textContent = value;
        gameBoard.appendChild(card);
        card.addEventListener('click', () => flipCard(card));
    });
    addQuitButton();
}

function addQuitButton() {
    const resetContainer = document.querySelector('.reset');
    resetContainer.innerHTML = ''; 
    const quitButton = document.createElement('button');
    quitButton.textContent = 'Quit Game';
    quitButton.classList.add('quit-btn');
    quitButton.addEventListener('click', quitGame);
    resetContainer.appendChild(quitButton);
}

let cardsAreClickable = true;
let flippedcards = [];
function flipCard(card) {
    if (!cardsAreClickable) return;
    if (flippedcards.length < 2 && card.classList.contains('face-down')) {
        card.classList.remove('face-down');
        flippedcards.push(card); 

        if (flippedcards.length === 2) { 
            currentTurn++; 
            updateTurnDisplay();
            const resetContainer = document.querySelector('.reset');

            const okButton = document.createElement('button');
            const message = document.createElement('div');
            message.classList.add('match-message'); 
            okButton.classList.add('ok-btn'); 
            okButton.textContent = "OK";
            resetContainer.prepend(message);
            resetContainer.prepend(okButton);


            if (flippedcards[0].textContent === flippedcards[1].textContent) {
                message.textContent = "Match! Press Ok";
                flippedcards = []; 
            } else {
                message.textContent = "No Match! Press Ok"; 
            }
            cardsAreClickable = false;

            okButton.addEventListener('click', () => {
                cardsAreClickable = true;
                message.remove(); 
                okButton.remove();

                if (message.textContent === "No Match! Press Ok") { 
                    flippedcards.forEach(card => {
                        card.classList.add('face-down'); 
                    });
                }
                flippedcards = []; 
                checkGameEnd();
            });
        }
    }
}

function checkGameEnd() {
    const allCards = document.querySelectorAll('.card');
    let allMatched = true;
    for (const card of allCards) {
        if (card.classList.contains('face-down')) {
            allMatched = false;
            break;
        }
    }
    if (allMatched) {
        displayEndMessage("You won! All cards matched.");
        playAgain();
    } else if (currentTurn >= maxTurns) {
        displayEndMessage("Game over! You've reached the maximum number of turns.");
        playAgain();
    }
}

function playAgain() {
    document.querySelector(".quit-btn").classList.add("hidden");
    const resetContainer = document.querySelector('.reset'); 
    const playAgainbutton = document.createElement('button');
    playAgainbutton.textContent = 'Play Again?';
    playAgainbutton.classList.add('playagain-btn');
    playAgainbutton.addEventListener('click', quitGame);
    resetContainer.appendChild(playAgainbutton);
}

function displayEndMessage(resultText) {
    document.querySelector(".result").classList.remove("hidden");
    document.querySelector(".result").textContent = resultText;
    document.querySelector(".game").classList.add("hidden");
    gamenumber += 1;
    saveLastScore();
}

function saveLastScore() {
    if (gamenumber == 1){
        let currentScore = `TURN ${currentTurn}/${maxTurns}`;
        localStorage.setItem('currentScore', currentScore);
    }
    else {
        let lastScore = localStorage.getItem('currentScore');
        localStorage.setItem('lastScore', lastScore); 
        let currentScore = `TURN ${currentTurn}/${maxTurns}`;
        localStorage.setItem('currentScore', currentScore);
        displayLastScore();
    }
}

function displayLastScore() {
    const lastScore = localStorage.getItem('lastScore'); 
    if (lastScore) {
        const lastScoreDisplay = document.querySelector('.last-score');
        lastScoreDisplay.textContent = `Previous Score: ${lastScore}`; 
        lastScoreDisplay.classList.remove('hidden'); 
    }
}

function quitGame() {
    document.querySelector(".start").classList.remove("hidden");
    document.querySelector(".last-score").classList.add("hidden");
    document.querySelector(".game").classList.add("hidden");
    document.querySelector(".quit-btn").classList.add("hidden");
    document.querySelector(".playagain-btn")?.remove();    document.querySelector(".result").classList.add("hidden");
    document.querySelector(".turn-display").textContent = ''
    document.querySelector(".game").innerHTML = ''; 

    flippedcards = []; 
    currentTurn = 0; 
}