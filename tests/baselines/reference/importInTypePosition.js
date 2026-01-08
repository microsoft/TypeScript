//// [tests/cases/compiler/importInTypePosition.ts] ////

//// [importInTypePosition.ts]
namespace A {
    export class Point {
        constructor(public x: number, public y: number) { }
    }
    export var Origin = new Point(0, 0);
}

// no code gen expected
namespace B {

    import a = A; //Error generates 'var <Alias> = <EntityName>;'
}
// no code gen expected
namespace C {

    import a = A; //Error generates 'var <Alias> = <EntityName>;'
    var m: typeof a;
    var p: a.Point;
    var p = { x: 0, y: 0 };
}


//// [importInTypePosition.js]
var A;
(function (A) {
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    A.Point = Point;
    A.Origin = new Point(0, 0);
})(A || (A = {}));
// no code gen expected
var C;
(function (C) {
    var m;
    var p;
    var p = { x: 0, y: 0 };
})(C || (C = {}));
