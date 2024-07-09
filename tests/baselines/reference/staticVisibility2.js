//// [tests/cases/compiler/staticVisibility2.ts] ////

//// [staticVisibility2.ts]
class Square {
    static sideLength;
    constructor(sideLength: number) {
        this.sideLength = sideLength;
    }
}

//// [staticVisibility2.js]
var Square = /** @class */ (function () {
    function Square(sideLength) {
        this.sideLength = sideLength;
    }
    return Square;
}());
