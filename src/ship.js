export class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.numHits = 0;
    }
    hit() {
        if (this.isSunk()) return;
        this.numHits++;
    }
    isSunk() {
        return this.numHits === this.length;
    }
}
