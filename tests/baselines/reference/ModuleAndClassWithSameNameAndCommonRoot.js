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
    (function (Y) {
        (function (Point) {
            Point.Origin = new Point(0, 0);
        })(Y.Point || (Y.Point = {}));
        var Point = Y.Point;
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(X || (X = {}));
//// [classPoint.js]
var X;
(function (X) {
    (function (Y) {
        var Point = (function () {
            function Point(x, y) {
                this.x = x;
                this.y = y;
            }
            return Point;
        })();
        Y.Point = Point;
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(X || (X = {}));
//// [simple.js]
var A;
(function (A) {
    A.Instance = new A();
})(A || (A = {}));
var A = (function () {
    function A() {
    }
    return A;
})();
