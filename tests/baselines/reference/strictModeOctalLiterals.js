//// [tests/cases/conformance/expressions/literals/strictModeOctalLiterals.ts] ////

//// [strictModeOctalLiterals.ts]
export enum E {
    A = 12 + 01
}
const orbitol: 01 = 01


//// [strictModeOctalLiterals.js]
export var E;
(function (E) {
    E[E["A"] = 13] = "A";
})(E || (E = {}));
const orbitol = 1;
