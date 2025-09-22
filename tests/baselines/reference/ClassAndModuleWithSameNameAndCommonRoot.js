//// [tests/cases/conformance/internalModules/DeclarationMerging/ClassAndModuleWithSameNameAndCommonRoot.ts] ////

//// [class.ts]
namespace X.Y {
    export class Point {
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
        x: number;
        y: number;
    }
}

//// [module.ts]
namespace X.Y {
    export namespace Point {
        export var Origin = new Point(0, 0);
    }
}

//// [test.ts]
//var cl: { x: number; y: number; }
var cl = new X.Y.Point(1,1);
var cl = X.Y.Point.Origin; // error not expected here same as bug 83996 ?


//// [simple.ts]
class A {
    id: string;
}

namespace A {
    export var Instance = new A();
}

// ensure merging works as expected
var a = A.Instance;
var a = new A();
var a: { id: string };


//// [class.js]
var X;
(function (X) {
    var Y;
    (function (Y) {
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
//// [test.js]
//var cl: { x: number; y: number; }
var cl = new X.Y.Point(1, 1);
var cl = X.Y.Point.Origin; // error not expected here same as bug 83996 ?
//// [simple.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
(function (A) {
    A.Instance = new A();
})(A || (A = {}));
// ensure merging works as expected
var a = A.Instance;
var a = new A();
var a;
