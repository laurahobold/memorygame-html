window.onload = function() {
    startGame();
}

let cards = [];
let cardA = undefined;
let cardB = undefined;
const cardPairs = [];
let score = 0;

function generateCards() {
    const game = [];

    for (let i = 0; i < 14; i++) {
        cards.push(i);
        cards.push(i);
    }
    cards = shuffle(cards);
    for (let i = 0; i < 28; i++) {
        let img = document.getElementById(i);
        img.src = `img/cards/back.jpeg`
    }
}
async function selectCard(id) {
    let img = document.getElementById(id);
    if (cardPairs.includes(cards[id])) {
        return;
    }

    if (cardA !== undefined && cardB !== undefined) {
        cardA = undefined;
        cardB = undefined;
    }
    if (cardA === undefined) {
        cardA = id
        img.src = `img/cards/${cards[id]}.jpeg`
    } else {
        if (cardA !== id) {
            cardB = id
            img.src = `img/cards/${cards[id]}.jpeg`
        }
    }
    if (cards[cardA] === cards[cardB]) {
        cardPairs.push(cards[cardA])
        score += 2;
        document.getElementById('score').innerHTML = 'SCORE:' + score
    } else {
        if (cardA !== undefined && cardB !== undefined) {
            await turnCard();
        }

    }
}

async function turnCard() {

    const time = setTimeout(() => {
        let img = document.getElementById(cardA)
        img.src = `img/cards/back.jpeg`;
        img = document.getElementById(cardB)
        img.src = `img/cards/back.jpeg`;
    }, 1000);
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

function startGame() {
    document.getElementById('game').style.display = 'none';
}

function startButton() {
    generateCards()
    document.getElementById('game').style.display = 'flex';
    document.getElementById('menu').style.display = 'none';
}

function returnButton() {
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('game').style.display = 'none';
}