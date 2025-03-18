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
    let Y;
    (function (Y) {
        let Point;
        (function (Point) {
            Point.Origin = new Point(0, 0);
        })(Point = Y.Point || (Y.Point = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
//// [classPoint.js]
var X;
(function (X) {
    let Y;
    (function (Y) {
        class Point {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
            x;
            y;
        }
        Y.Point = Point;
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
//// [simple.js]
var A;
(function (A) {
    A.Instance = new A();
})(A || (A = {}));
class A {
    id;
}
