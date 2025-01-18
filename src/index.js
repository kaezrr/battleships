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

let turn = true;

opponentMain.addEventListener('click', (e) => {
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
});
