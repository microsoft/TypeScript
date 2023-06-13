//// [tests/cases/conformance/es6/Symbols/symbolType5.ts] ////

//// [symbolType5.ts]
var s = Symbol.for("multiply");
s * s;
s / s;
s % s;

s * 0;
0 / s;

//// [symbolType5.js]
var s = Symbol.for("multiply");
s * s;
s / s;
s % s;
s * 0;
0 / s;
