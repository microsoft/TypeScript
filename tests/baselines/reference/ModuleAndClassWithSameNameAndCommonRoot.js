//// [tests/cases/conformance/internalModules/DeclarationMerging/ModuleAndClassWithSameNameAndCommonRoot.ts] ////

//// [module.ts]
module X.Y {
    export module Point {
        export var Origin = new Point(0, 0);
    }
}

//// [classPoint.ts]
module X.Y {
    // duplicate identifier
    export class Point {
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
        x: number;
        y: number;
    }
}

//// [simple.ts]
module A {
    export var Instance = new A();
}

// duplicate identifier
class A {
    id: string;
}


//// [module.js]
var X;
(function (X) {
    var Y;
    (function (Y) {
        var Point;
        (function (Point) {
            Point.Origin = new Point(0, 0);
        })(Point = Y.Point || (Y.Point = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
//// [classPoint.js]
var X;
(function (X) {
    var Y;
    (function (Y) {
        // duplicate identifier
        var Point = /** @class */ (function () {
            function Point(x, y) {
                this.x = x;
                this.y = y;
            }
            return Point;
        }());
        Y.Point = Point;
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
//// [simple.js]
var A;
(function (A) {
    A.Instance = new A();
})(A || (A = {}));
// duplicate identifier
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
