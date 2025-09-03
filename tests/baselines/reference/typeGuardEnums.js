//// [tests/cases/conformance/expressions/typeGuards/typeGuardEnums.ts] ////

//// [typeGuardEnums.ts]
enum E {}
enum V {}

let x: number|string|E|V;

if (typeof x === "number") {
    x; // number|E|V
}
else {
    x; // string
}

if (typeof x !== "number") {
    x; // string
}
else {
    x; // number|E|V
}


//// [typeGuardEnums.js]
var E;
(function (E) {
})(E || (E = {}));
var V;
(function (V) {
})(V || (V = {}));
let x;
if (typeof x === "number") {
    x; // number|E|V
}
else {
    x; // string
}
if (typeof x !== "number") {
    x; // string
}
else {
    x; // number|E|V
}
