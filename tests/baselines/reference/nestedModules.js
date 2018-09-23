//// [nestedModules.ts]
module A.B.C {
    export interface Point {
        x: number;
        y: number;
    }
}

module A {
    export module B {
        var Point: C.Point = { x: 0, y: 0 }; // bug 832088: could not find module 'C'
    }
}

module M2.X {
    export interface Point {
        x: number; y: number;
    }
}

module M2 {
    export module X {
        export var Point: number;
    }
}

var m = M2.X;
var point: number;
var point = m.Point;

var p: { x: number; y: number; }
var p: M2.X.Point;


//// [nestedModules.js]
var A = A || (A = {});
(function (A) {
    var B = A.B || (A.B = {});
    (function (B) {
        var Point = { x: 0, y: 0 }; // bug 832088: could not find module 'C'
    })(B);
})(A);
var M2 = M2 || (M2 = {});
(function (M2) {
    var X = M2.X || (M2.X = {});
    (function (X) {
    })(X);
})(M2);
var m = M2.X;
var point;
var point = m.Point;
var p;
var p;
