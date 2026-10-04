//// [tests/cases/compiler/narrowingTypeofFunction.ts] ////

//// [narrowingTypeofFunction.ts]
type Meta = { foo: string }
interface F { (): string }

function f1(a: (F & Meta) | string) {
    if (typeof a === "function") {
        a;
    }
    else {
        a;
    }
}

function f2<T>(x: (T & F) | T & string) {
    if (typeof x === "function") {
        x;
    }
    else {
        x;
    }
}

function f3(x: { _foo: number } & number) {
    if (typeof x === "function") {
        x;
    }
}

//// [narrowingTypeofFunction.js]
"use strict";
function f1(a) {
    if (typeof a === "function") {
        a;
    }
    else {
        a;
    }
}
function f2(x) {
    if (typeof x === "function") {
        x;
    }
    else {
        x;
    }
}
function f3(x) {
    if (typeof x === "function") {
        x;
    }
}
