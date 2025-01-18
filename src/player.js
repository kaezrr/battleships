import { Gameboard } from './game.js';

export class Player {
    board = new Gameboard();
    getBoard() {
        return this.board.board;
    }
}

export class AIPlayer {
    board = new Gameboard();
    available = [];

    constructor() {
        this.init();
    }

    async init() {
        for (let i = 0; i < 10; ++i) {
            for (let j = 0; j < 10; ++j) {
                this.available.push([i, j]);
            }
        }
        while (this.board.getUnplacedShip() !== null) {
            this.board.placeShip(...this.getRandParameters());
        }
    }

    getBoard() {
        return this.board.board;
    }

    getRandInt(max, min = 0) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandParameters() {
        const len = this.board.getUnplacedShip().ship.length;
        const align = this.getRandInt(1) === 1;

        return [
            align ? this.getRandInt(9) : this.getRandInt(9 - len),
            align ? this.getRandInt(9 - len) : this.getRandInt(9),
            align,
        ];
    }

    playTurn(board) {
        const attackPos = this.getRandInt(this.available.length - 1);
        const res = board.receiveAttack(...this.available[attackPos]);
        this.available.splice(attackPos, 1);

        if (res.sunk) return `I sunk your ${res.sunk} 😂`;
        if (res.hit) return 'Haha, I hit you 😜';
        return 'I missed 😥';
    }
}
