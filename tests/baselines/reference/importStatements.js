//// [tests/cases/conformance/internalModules/codeGeneration/importStatements.ts] ////

//// [importStatements.ts]
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
    var p = {x:0, y:0 };
}

// code gen expected
namespace D {
    import a = A;

    var p = new a.Point(1, 1);
}

namespace E {
    import a = A;
    export function xDist(x: a.Point) {
        return (a.Origin.x - x.x);
    }
}

//// [importStatements.js]
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
// code gen expected
var D;
(function (D) {
    var a = A;
    var p = new a.Point(1, 1);
})(D || (D = {}));
var E;
(function (E) {
    var a = A;
    function xDist(x) {
        return (a.Origin.x - x.x);
    }
    E.xDist = xDist;
})(E || (E = {}));
