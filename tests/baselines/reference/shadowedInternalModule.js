//// [shadowedInternalModule.ts]
// all errors imported modules conflict with local variables

module A {
    export var Point = { x: 0, y: 0 }
    export interface Point {
        x: number;
        y: number;
    }
} 

module B {
    var A = { x: 0, y: 0 };
    import Point = A;
}

module X {
    export module Y {
        export interface Point{
            x: number;
            y: number
        }
    }

    export class Y {
        name: string;
    }
}

module Z {
    import Y = X.Y;

    var Y = 12;
}

//// [shadowedInternalModule.js]
// all errors imported modules conflict with local variables
var A = A || (A = {});
(function (A) {
    A.Point = { x: 0, y: 0 };
})(A);
var B = B || (B = {});
(function (B) {
    var A = { x: 0, y: 0 };
})(B);
var X = X || (X = {});
(function (X) {
    var Y = /** @class */ (function () {
        function Y() {
        }
        return Y;
    }());
    X.Y = Y;
})(X);
var Z = Z || (Z = {});
(function (Z) {
    var Y = 12;
})(Z);
