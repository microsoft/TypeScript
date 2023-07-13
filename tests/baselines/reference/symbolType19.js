//// [tests/cases/conformance/es6/Symbols/symbolType19.ts] ////

//// [symbolType19.ts]
enum E { }
var x: symbol | E;

x;
if (typeof x === "number") {
    x;
}
else {
    x;
}

//// [symbolType19.js]
var E;
(function (E) {
})(E || (E = {}));
var x;
x;
if (typeof x === "number") {
    x;
}
else {
    x;
}
