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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
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
    __names(Board.prototype, ["allShipsSunk"]);
    return Board;
}());
