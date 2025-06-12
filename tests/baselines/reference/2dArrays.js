//// [tests/cases/compiler/2dArrays.ts] ////

//// [2dArrays.ts]
class Cell {
}

class Ship {
    isSunk: boolean;
}

class Board {
    ships: Ship[];
    cells: Cell[];

    private allShipsSunk() {
        return this.ships.every(function (val) { return val.isSunk; });
    }    
}

//// [2dArrays.js]
class Cell {
}
class Ship {
}
class Board {
    allShipsSunk() {
        return this.ships.every(function (val) { return val.isSunk; });
    }
}
