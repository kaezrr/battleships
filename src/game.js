import { Ship } from './ship';

export class Gameboard {
    ships = [
        { ship: new Ship('Carrier', 5), placed: false, id: 1 },
        { ship: new Ship('Battleship', 4), placed: false, id: 2 },
        { ship: new Ship('Destroyer', 3), placed: false, id: 3 },
        { ship: new Ship('Submarine', 3), placed: false, id: 4 },
        { ship: new Ship('Patrol Boat', 2), placed: false, id: 5 },
    ];

    board = Array.from(Array(10), () => new Array(10).fill(0));
    misses = [];

    placeShip(y, x, axis) {
        const unit = this.getUnplacedShip();
        if (unit === null) return false;
        if (!this.isValid(y, x, axis, unit.ship.length)) return false;
        unit.placed = true;
        const start = axis ? x : y;
        for (let i = start; i < start + unit.ship.length; ++i) {
            if (axis) {
                this.board[y][i] = unit.id;
            } else {
                this.board[i][x] = unit.id;
            }
        }
        return true;
    }

    receiveAttack(y, x) {
        if (x < 0 || y < 0 || x >= 10 || y >= 10) return false;
        if (this.board[y][x] === 0) {
            this.misses.push([y, x]);
            this.board[y][x] = 6;
            return false;
        }
        this.ships[this.board[y][x] - 1].ship.hit();
        this.board[y][x] = 7;
        return true;
    }

    allSunk() {
        this.ships.every((e) => e.ship.isSunk() === true);
    }

    getUnplacedShip() {
        for (let sh of this.ships) {
            if (sh.placed) continue;
            return sh;
        }
        return null;
    }

    isValid(y, x, axis, length) {
        if (x < 0 || y < 0 || x >= 10 || y >= 10) return false;
        const start = axis ? x : y;
        if (start + length > 10) return false;
        for (let i = start; i < start + length; ++i) {
            if (axis) {
                if (this.board[y][i] === 0) continue;
            } else {
                if (this.board[i][x] === 0) continue;
            }
            return false;
        }
        return true;
    }
}
