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
    isSunk = false;
}
class Board {
    ships = [];
    cells = [];
    allShipsSunk() {
        return this.ships.every(function (val) { return val.isSunk; });
    }
}
