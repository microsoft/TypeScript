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
var Cell = (function () {
    function Cell() {
    }
    return Cell;
}());
var Ship = (function () {
    function Ship() {
    }
    return Ship;
}());
var Board = (function () {
    function Board() {
    }
    Board.prototype.allShipsSunk = function () {
        return this.ships.every(function (val) { return val.isSunk; });
    };
    return Board;
}());
