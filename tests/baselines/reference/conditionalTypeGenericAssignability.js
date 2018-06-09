//// [conditionalTypeGenericAssignability.ts]
function f1<T extends { foo: unknown; 0: unknown }>(_a: T, b: Extract<keyof T, string>) {
    b = "foo"; // succeeds
    b = 0; // errors
}

function f2<T extends { foo: unknown; 0: unknown }>(_a: T, b: Exclude<keyof T, string>) {
    b = "foo"; // errors
    b = 0; // succeeds
}


//// [conditionalTypeGenericAssignability.js]
"use strict";
function f1(_a, b) {
    b = "foo"; // succeeds
    b = 0; // errors
}
function f2(_a, b) {
    b = "foo"; // errors
    b = 0; // succeeds
}
