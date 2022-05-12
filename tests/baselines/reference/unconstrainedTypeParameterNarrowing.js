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

// #48468 but with an explicit constraint so as to not trigger the `{}` and unconstrained type parameter bug
function deepEquals<T extends unknown>(a: T, b: T) {
    if (typeof a !== "object" || typeof b !== "object" || !a || !b) {
        return false;
    }
    if (Array.isArray(a) || Array.isArray(b)) {
        return false;
    }
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }
    return true;
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
// #48468 but with an explicit constraint so as to not trigger the `{}` and unconstrained type parameter bug
function deepEquals(a, b) {
    if (typeof a !== "object" || typeof b !== "object" || !a || !b) {
        return false;
    }
    if (Array.isArray(a) || Array.isArray(b)) {
        return false;
    }
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }
    return true;
}
function g(x) { }
