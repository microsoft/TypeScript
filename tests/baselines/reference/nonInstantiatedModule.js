//// [tests/cases/conformance/internalModules/moduleDeclarations/nonInstantiatedModule.ts] ////

//// [nonInstantiatedModule.ts]
module M {
    export interface Point { x: number; y: number }
    export var a = 1;
}

// primary expression
var m : typeof M;
var m = M;

var a1: number;
var a1 = M.a;

var a2: number;
var a2 = m.a;

module M2 {
    export module Point {
        export function Origin(): Point {
            return { x: 0, y: 0 };
        }
    }

    export interface Point {
        x: number;
        y: number;
    }
}

var p: { x: number; y: number; };
var p: M2.Point;

var p2: { Origin() : { x: number; y: number; } };
var p2: typeof M2.Point;

module M3 {
    export module Utils {
        export interface Point {
            x: number; y: number;
        }
    }

    export class Utils {
        name: string;
    }
}

//// [nonInstantiatedModule.js]
var M;
(function (M) {
    M.a = 1;
})(M || (M = {}));
// primary expression
var m;
var m = M;
var a1;
var a1 = M.a;
var a2;
var a2 = m.a;
var M2;
(function (M2) {
    var Point;
    (function (Point) {
        function Origin() {
            return { x: 0, y: 0 };
        }
        Point.Origin = Origin;
    })(Point = M2.Point || (M2.Point = {}));
})(M2 || (M2 = {}));
var p;
var p;
var p2;
var p2;
var M3;
(function (M3) {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        return Utils;
    }());
    M3.Utils = Utils;
})(M3 || (M3 = {}));
