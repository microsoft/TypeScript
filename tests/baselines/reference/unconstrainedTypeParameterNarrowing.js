//// [unconstrainedTypeParameterNarrowing.ts]
function f1<T>(x: T) {
    if (typeof x === "object" && x) {
        g(x);
    }
}

function f2<T extends unknown>(x: T) {
    if (typeof x === "object" && x) {
        g(x);
    }
}

function g(x: object) {}

//// [unconstrainedTypeParameterNarrowing.js]
"use strict";
function f1(x) {
    if (typeof x === "object" && x) {
        g(x);
    }
}
function f2(x) {
    if (typeof x === "object" && x) {
        g(x);
    }
}
function g(x) { }
