import './style.css';
import { AIPlayer, Player } from './player.js';
import { fillGridSecret, fillGridShow } from './dom-manip.js';

let player = new Player();
let aiPlayer = new AIPlayer();
aiPlayer.init().then();

player.board.placeShip(1, 1, true);
player.board.placeShip(4, 3, false);
player.board.placeShip(6, 6, true);
player.board.placeShip(7, 4, false);
player.board.placeShip(3, 8, true);

fillGridShow(aiPlayer.getBoard(), false);
fillGridSecret(aiPlayer.getBoard(), true);

const playerMain = document.querySelector('.player');
const opponentMain = document.querySelector('.opponent');

opponentMain.addEventListener('click', (e) => {
    const target = e.target;
    const className = target.className;
    if (!(className.startsWith('ship') || className === 'empty')) return;
    const res = aiPlayer.board.receiveAttack(target.dataset.y, target.dataset.x);
    target.className = res ? 'hit' : 'miss';
});
