//// [tests/cases/compiler/narrowingTypeofObject.ts] ////

//// [narrowingTypeofObject.ts]
interface F { (): string }

function test(x: number & { _foo: string }) {
    if (typeof x === 'object') {
        x; 
    }
}

function f1(x: F & { foo: number }) {
    if (typeof x !== "object") {
        x;
    }
}

//// [narrowingTypeofObject.js]
"use strict";
function test(x) {
    if (typeof x === 'object') {
        x;
    }
}
function f1(x) {
    if (typeof x !== "object") {
        x;
    }
}
