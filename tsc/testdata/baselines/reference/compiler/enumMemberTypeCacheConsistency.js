//// [tests/cases/compiler/enumMemberTypeCacheConsistency.ts] ////

//// [enumMemberTypeCacheConsistency.ts]
enum E {
    A = 0,
    B = E.A.valueOf(),
    C = 1,
}

const member: Extract<E, 1> = E.C;

//// [enumMemberTypeCacheConsistency.js]
"use strict";
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = E.A.valueOf()] = "B";
    E[E["C"] = 1] = "C";
})(E || (E = {}));
const member = E.C;


//// [enumMemberTypeCacheConsistency.d.ts]
declare enum E {
    A = 0,
    B,
    C = 1
}
declare const member: Extract<E, 1>;
