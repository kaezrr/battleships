import './style.css';
import { AIPlayer, Player } from './player.js';
import {
    opponentSays,
    playerSays,
    gameSays,
    fillGridSecret,
    fillGridShow,
    humanSays,
} from './dom-manip.js';

let player = new Player();
let aiPlayer = new AIPlayer();

fillGridShow(player.getBoard(), false);
fillGridSecret(aiPlayer.getBoard(), true);

const playerMain = document.querySelector('.player');
const opponentMain = document.querySelector('.opponent');

let turn = false;
function mainGame(e) {
    if (!turn) return;
    const target = e.target;
    const className = target.className;
    if (!(className.startsWith('ship') || className === 'empty')) return;
    const res = aiPlayer.board.receiveAttack(target.dataset.y, target.dataset.x);
    target.className = res.hit ? 'hit' : 'miss';
    if (res.sunk) opponentSays(`You sunk my ${res.sunk} 🤬!`);

    if (res.hit) humanSays('You hit!');
    else if (!res.hit) humanSays('You missed!');
    gameSays("OPPONENT'S TURN");
    turn = false;

    setTimeout(() => {
        const say = aiPlayer.playTurn(player.board);
        opponentSays(say);
        fillGridShow(player.getBoard(), false);
    }, 2000);

    setTimeout(() => {
        if (player.board.allSunk()) {
            gameSays('YOU LOST!!');
            return;
        }
        if (aiPlayer.board.allSunk()) {
            gameSays('YOU WON!!');
            return;
        }
        gameSays('YOUR TURN');
        turn = true;
    }, 3000);
}

const button = document.querySelector('#start');
button.dataset.type = 'start';

function placeShips(e) {
    if (!e.target.classList.contains('empty')) return;
    let targetData = e.target.dataset;
    player.board.placeShip(
        +targetData.y,
        +targetData.x,
        button.textContent === 'HORIZONTAL'
    );
    fillGridShow(player.getBoard(), false);
    let currShip = player.board.getUnplacedShip();
    if (currShip === null) {
        startGame();
        return;
    }
    humanSays(`Place your ${currShip.ship.name}, length: ${currShip.ship.length}`);
}

opponentMain.addEventListener('click', mainGame);
button.addEventListener('click', (_) => {
    switch (button.dataset.type) {
        case 'start':
            gameSays('PLACE YOUR SHIPS');
            button.dataset.type = 'place';
            button.textContent = 'HORIZONTAL';
            let currShip = player.board.getUnplacedShip();
            humanSays(
                `Place your ${currShip.ship.name}, length: ${currShip.ship.length}`
            );
            playerMain.addEventListener('click', placeShips);
            break;
        case 'place':
            button.textContent =
                button.textContent === 'HORIZONTAL' ? 'VERTICAL' : 'HORIZONTAL';
            break;
        case 'reset':
            player = new Player();
            aiPlayer = new AIPlayer();
            fillGridShow(player.getBoard(), false);
            fillGridSecret(aiPlayer.getBoard(), true);
            playerMain.removeEventListener('click', placeShips);
            turn = false;
            gameSays('CLICK TO PLAY');
            humanSays('');
            opponentSays('');
            button.dataset.type = 'start';
            button.textContent = 'START';
            break;
    }
});

function startGame() {
    gameSays('YOUR TURN');
    turn = true;
    humanSays('');
    button.dataset.type = 'reset';
    button.textContent = 'GIVE UP';
    playerMain.removeEventListener('click', placeShips);
}
