//// [tests/cases/conformance/es6/Symbols/symbolType10.ts] ////

//// [symbolType10.ts]
var s = Symbol.for("bitwise");
s & s;
s | s;
s ^ s;

s & 0;
0 | s;

//// [symbolType10.js]
var s = Symbol.for("bitwise");
s & s;
s | s;
s ^ s;
s & 0;
0 | s;
