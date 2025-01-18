import './style.css';
import { Player } from './player.js';
import { fillGridSecret, fillGridShow } from './dom-manip.js';

let player = new Player();
let aiPlayer = new Player();

player.board.placeShip(1, 1, true);
player.board.placeShip(4, 3, false);
player.board.placeShip(6, 6, true);
player.board.placeShip(7, 4, false);
player.board.placeShip(3, 8, true);

aiPlayer.board.placeShip(2, 2, false);
aiPlayer.board.placeShip(5, 5, true);
aiPlayer.board.placeShip(7, 7, false);
aiPlayer.board.placeShip(9, 1, true);
aiPlayer.board.placeShip(1, 9, false);

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
