let playerText = document.getElementById('playerText');
let restart = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
const O = "O";
const X = "X";
let player = X;
let spaces = Array(9).fill(null);
const startgame = () => {
    boxes.forEach(box => box.addEventListener('click', boxclicked));
};

function boxclicked(e) {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = player;
        e.target.innerText = player;
        if (playerHasWon() !== false) {
            playerText.innerText = `${player} has won!`;
            let winning_blocks = playerHasWon();
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            // Disable further clicks after a win
            boxes.forEach(box => box.removeEventListener('click', boxclicked));
        }
        player = player == X ? O : X;
    }
}

const wincombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

restart.addEventListener('click', restartf);

function restartf() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
        // Re-enable click events after restart
        box.addEventListener('click', boxclicked);
    });
    playerText.innerText = 'Tic Tac Toe'; // Update playerText
    player = X; // Reset player to X for the new game
}

function playerHasWon() {
    for (const condition of wincombo) {
        let [a, b, c] = condition;
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

startgame();
