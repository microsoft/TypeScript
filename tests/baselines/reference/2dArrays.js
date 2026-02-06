//// [tests/cases/compiler/2dArrays.ts] ////

//// [2dArrays.ts]
class Cell {
}

class Ship {
    isSunk: boolean = false;
}

class Board {
    ships: Ship[] = [];
    cells: Cell[] = [];

    private allShipsSunk() {
        return this.ships.every(function (val) { return val.isSunk; });
    }    
}

//// [2dArrays.js]
"use strict";
class Cell {
}
class Ship {
    constructor() {
        this.isSunk = false;
    }
}
class Board {
    constructor() {
        this.ships = [];
        this.cells = [];
    }
    allShipsSunk() {
        return this.ships.every(function (val) { return val.isSunk; });
    }
}
