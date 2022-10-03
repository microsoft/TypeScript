//// [equalityWithEnumTypes.ts]
// Literal enum type
enum E1 {
    a = 1,
    b = 2,
}

// Numeric enum type
enum E2 {
    a = 1 << 0,
    b = 1 << 1
}

function f1(v: E1) {
    if (v !== 0) {  // Error
        v;
    }
    if (v !== 1) {
        v;
    }
    if (v !== 2) {
        v;
    }
    if (v !== 3) {  // Error
        v;
    }
}

function f2(v: E2) {
    if (v !== 0) {
        v;
    }
    if (v !== 1) {
        v;
    }
    if (v !== 2) {
        v;
    }
    if (v !== 3) {
        v;
    }
}


//// [equalityWithEnumTypes.js]
"use strict";
// Literal enum type
var E1;
(function (E1) {
    E1[E1["a"] = 1] = "a";
    E1[E1["b"] = 2] = "b";
})(E1 || (E1 = {}));
// Numeric enum type
var E2;
(function (E2) {
    E2[E2["a"] = 1] = "a";
    E2[E2["b"] = 2] = "b";
})(E2 || (E2 = {}));
function f1(v) {
    if (v !== 0) { // Error
        v;
    }
    if (v !== 1) {
        v;
    }
    if (v !== 2) {
        v;
    }
    if (v !== 3) { // Error
        v;
    }
}
function f2(v) {
    if (v !== 0) {
        v;
    }
    if (v !== 1) {
        v;
    }
    if (v !== 2) {
        v;
    }
    if (v !== 3) {
        v;
    }
}
