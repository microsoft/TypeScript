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
var Cell = /** @class */ (function () {
    function Cell() {
    }
    return Cell;
}());
var Ship = /** @class */ (function () {
    function Ship() {
        this.isSunk = false;
    }
    return Ship;
}());
var Board = /** @class */ (function () {
    function Board() {
        this.ships = [];
        this.cells = [];
    }
    Board.prototype.allShipsSunk = function () {
        return this.ships.every(function (val) { return val.isSunk; });
    };
    return Board;
}());
