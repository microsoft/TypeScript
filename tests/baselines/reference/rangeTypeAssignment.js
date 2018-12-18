//// [rangeTypeAssignment.ts]
let a1: (> 0) = 1;
let a2: number = a1;
let a3: (> -1) = a1;
let a4: (>= 0) = a1;
let a5: (> 0) = a1;

let b1: number = 0;
let b2: (< 0) = b1;
let b3: (> 0) = b1;

enum C {
    foo,
    bar
}

let c1: C = C.foo;
let c2: (>= 0) = C.foo;

let c3: C = c2;


//// [rangeTypeAssignment.js]
var a1 = 1;
var a2 = a1;
var a3 = a1;
var a4 = a1;
var a5 = a1;
var b1 = 0;
var b2 = b1;
var b3 = b1;
var C;
(function (C) {
    C[C["foo"] = 0] = "foo";
    C[C["bar"] = 1] = "bar";
})(C || (C = {}));
var c1 = C.foo;
var c2 = C.foo;
var c3 = c2;
