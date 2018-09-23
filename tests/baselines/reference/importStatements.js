//// [importStatements.ts]
module A {
    export class Point {
        constructor(public x: number, public y: number) { }
    }

    export var Origin = new Point(0, 0);
}

// no code gen expected
module B {
    import a = A; //Error generates 'var <Alias> = <EntityName>;'
}

// no code gen expected
module C {
    import a = A; //Error generates 'var <Alias> = <EntityName>;'
    var m: typeof a;
    var p: a.Point;
    var p = {x:0, y:0 };
}

// code gen expected
module D {
    import a = A;

    var p = new a.Point(1, 1);
}

module E {
    import a = A;
    export function xDist(x: a.Point) {
        return (a.Origin.x - x.x);
    }
}

//// [importStatements.js]
var A = A || (A = {});
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
})(A);
// no code gen expected
var C = C || (C = {});
(function (C) {
    var m;
    var p;
    var p = { x: 0, y: 0 };
})(C);
// code gen expected
var D = D || (D = {});
(function (D) {
    var a = A;
    var p = new a.Point(1, 1);
})(D);
var E = E || (E = {});
(function (E) {
    var a = A;
    function xDist(x) {
        return (a.Origin.x - x.x);
    }
    E.xDist = xDist;
})(E);
