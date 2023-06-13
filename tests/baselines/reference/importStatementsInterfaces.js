//// [tests/cases/conformance/internalModules/codeGeneration/importStatementsInterfaces.ts] ////

//// [importStatementsInterfaces.ts]
module A {
    export interface Point {
        x: number;
        y: number;
    }

    export module inA {
        export interface Point3D extends Point {
            z: number;
        }
    }
}

// no code gen expected
module B {
    import a = A;
}

// no code gen expected
module C {
    import a = A;
    import b = a.inA;
    var m: typeof a;
    var p: b.Point3D;
    var p = {x:0, y:0, z: 0 };
}

// no code gen expected
module D {
    import a = A;

    var p : a.Point;
}

// no code gen expected
module E {
    import a = A.inA;
    export function xDist(x: a.Point3D) {
        return 0 - x.x;
    }
}

//// [importStatementsInterfaces.js]
// no code gen expected
var C;
(function (C) {
    var m;
    var p;
    var p = { x: 0, y: 0, z: 0 };
})(C || (C = {}));
// no code gen expected
var D;
(function (D) {
    var p;
})(D || (D = {}));
// no code gen expected
var E;
(function (E) {
    function xDist(x) {
        return 0 - x.x;
    }
    E.xDist = xDist;
})(E || (E = {}));
