//// [tests/cases/conformance/internalModules/moduleDeclarations/nestedModules.ts] ////

//// [nestedModules.ts]
namespace A.B.C {
    export interface Point {
        x: number;
        y: number;
    }
}

namespace A {
    export namespace B {
        var Point: C.Point = { x: 0, y: 0 }; // bug 832088: could not find module 'C'
    }
}

namespace M2.X {
    export interface Point {
        x: number; y: number;
    }
}

namespace M2 {
    export namespace X {
        export var Point: number;
    }
}

var m = M2.X;
var point: number;
var point = m.Point;

var p: { x: number; y: number; }
var p: M2.X.Point;


//// [nestedModules.js]
var A;
(function (A) {
    var B;
    (function (B) {
        var Point = { x: 0, y: 0 }; // bug 832088: could not find module 'C'
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var M2;
(function (M2) {
    var X;
    (function (X) {
    })(X = M2.X || (M2.X = {}));
})(M2 || (M2 = {}));
var m = M2.X;
var point;
var point = m.Point;
var p;
var p;
