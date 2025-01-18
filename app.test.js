import { Ship } from './src/ship.js';
import { Gameboard } from './src/game.js';

test('ships sink properly', () => {
    const ship = new Ship('Destroyer', 3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test('gameboard places ships properly', () => {
    const board = new Gameboard();
    expect(board.placeShip(-1, 0, true)).toBe(false);
    expect(board.placeShip(0, 1, true)).toBe(true);
    expect(board.placeShip(9, 0, false)).toBe(false);
    expect(board.placeShip(9, 0, true)).toBe(true);
    expect(board.placeShip(2, 2, true)).toBe(true);
    expect(board.placeShip(3, 2, true)).toBe(true);
    expect(board.placeShip(4, 2, false)).toBe(true);
    expect(board.placeShip(5, 2, false)).toBe(false);
});

test('gameboard receives damage properly', () => {
    const board = new Gameboard();
    board.placeShip(0, 1, true);
    board.placeShip(9, 0, true);
    board.placeShip(2, 2, true);
    board.placeShip(3, 2, true);
    board.placeShip(4, 2, false);

    expect(board.receiveAttack(0, 2)).toBe(true);
    expect(board.receiveAttack(9, 3)).toBe(true);
    expect(board.receiveAttack(2, 1)).toBe(false);
    expect(board.receiveAttack(-1, 0)).toBe(false);
    expect(board.receiveAttack(0, 14)).toBe(false);
    expect(board.receiveAttack(4, 3)).toBe(false);
    expect(board.receiveAttack(5, 2)).toBe(true);
    expect(board.misses).toStrictEqual([
        [2, 1],
        [4, 3],
    ]);
});
