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
var A;
(function (A) {
    A.Point = { x: 0, y: 0 };
})(A || (A = {}));
var B;
(function (B) {
    var A = { x: 0, y: 0 };
})(B || (B = {}));
var X;
(function (X) {
    var Y = /** @class */ (function () {
        function Y() {
        }
        return Y;
    }());
    X.Y = Y;
})(X || (X = {}));
var Z;
(function (Z) {
    var Y = 12;
})(Z || (Z = {}));
