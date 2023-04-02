// Definindo as cartas com seus respectivos pares
const cards = [
    { id: 1, img: 'img/elephant.png' },
    { id: 2, img: 'img/fox.png' },
    { id: 3, img: 'img/hippo.png' },
    { id: 4, img: 'img/koala.png' },
    { id: 5, img: 'img/lion.png' },
    { id: 6, img: 'img/monkey.png' },
    { id: 7, img: 'img/panda.png' },
    { id: 8, img: 'img/turtle.png' },
    { id: 9, img: 'img/elephant.png' },
    { id: 10, img: 'img/fox.png' },
    { id: 11, img: 'img/hippo.png' },
    { id: 12, img: 'img/koala.png' },
    { id: 13, img: 'img/lion.png' },
    { id: 14, img: 'img/monkey.png' },
    { id: 15, img: 'img/panda.png' },
    { id: 16, img: 'img/turtle.png' },
];

// Embaralhando as cartas
cards.sort(() => 0.5 - Math.random());

// Selecionando elementos do DOM
const gridContainer = document.querySelector('.grid-container');
const resultContainer = document.querySelector('.result-container');
const resetButton = document.querySelector('button');

// Definindo variáveis
let selectedCards = [];
let matchedCards = [];
let moves = 0;
let time = 60;
let timer = null;

// Função para iniciar o jogo
function startGame() {
    // Criando as cartas no DOM
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', card.id);
        cardElement.innerHTML = `<img src="${card.img}" alt="Carta de animal">`;
        cardElement.addEventListener('click', flipCard);
        gridContainer.appendChild(cardElement);
    });

    // Iniciando o contador de tempo
    timer = setInterval(() => {
        time--;
        if (time <= 0) {
            endGame(false);
        } else {
            updateTimer();
        }
    }, 1000);
}

// Função para virar a carta selecionada
function flipCard() {
    if (selectedCards.length === 2) return;
    if (this === selectedCards[0]) return;
    this.classList.add('selected');
    selectedCards.push(this);
    if (selectedCards.length === 2) {
        const firstCard = selectedCards[0];
        const secondCard = selectedCards[1];
        const firstCardId = firstCard.getAttribute('data-id');
        const secondCardId = secondCard.getAttribute('data-id');
        moves++;
        updateMoves();
        if (firstCardId === secondCardId) {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedCards.push(firstCard, secondCard);
            selectedCards = [];
            if (matchedCards.length === cards.length) {
                endGame(true);
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('selected');
                secondCard.classList.remove('selected');
                selectedCards = [];
            }, 1000);
        }
    }

    // Função para atualizar o contador de movimentos
    function updateMoves() {
        const movesText = document.querySelector('.moves');
        movesText.textContent = `Movimentos: ${moves}`;
    }

    // Função para atualizar o contador de tempo
    function updateTimer() {
        const timerText = document.querySelector('.timer');
        timerText.textContent = `Tempo: ${time}s`;
    }
}
// Função para finalizar o jogo
function endGame(isWin) {
    clearInterval(timer);
    if (isWin) {
        resultContainer.textContent = 'Você venceu com ' + moves + ' movimentos em ' + (60 - time) + ' segundos!';
    } else {
        resultContainer.textContent = 'Tempo esgotado! Tente novamente.';
    }

}

// Adicionando evento de clique no botão de reset
resetButton.addEventListener('click', () => {
    gridContainer.innerHTML = '';
    selectedCards = [];
    matchedCards = [];
    moves = 0;
    time = 60;
    updateMoves();
    updateTimer();
    endGame(false);
    cards.sort(() => 0.5 - Math.random());
    startGame();
});

// Iniciando o jogo ao carregar a página
startGame();