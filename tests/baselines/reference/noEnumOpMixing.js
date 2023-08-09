//// [tests/cases/compiler/noEnumOpMixing.ts] ////

//// [noEnumOpMixing.ts]
enum A { x, y, z }
enum B { d, e, f }

// Should error
let m = A.x | B.d;
// Should OK
let n = A.x | A.y;
// Should OK
declare let a1: A, a2: A;
let o = a1 | a2;
// Should error
declare let b1: B;
let p = a1 | b1;


//// [noEnumOpMixing.js]
var A;
(function (A) {
    A[A["x"] = 0] = "x";
    A[A["y"] = 1] = "y";
    A[A["z"] = 2] = "z";
})(A || (A = {}));
var B;
(function (B) {
    B[B["d"] = 0] = "d";
    B[B["e"] = 1] = "e";
    B[B["f"] = 2] = "f";
})(B || (B = {}));
// Should error
var m = A.x | B.d;
// Should OK
var n = A.x | A.y;
var o = a1 | a2;
var p = a1 | b1;
