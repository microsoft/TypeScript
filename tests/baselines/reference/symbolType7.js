//// [tests/cases/conformance/es6/Symbols/symbolType7.ts] ////

//// [symbolType7.ts]
var s = Symbol.for("shift");
s << s;
s << 0;
s >> s;
s >> 0;
s >>> s;
s >>> 0;

//// [symbolType7.js]
var s = Symbol.for("shift");
s << s;
s << 0;
s >> s;
s >> 0;
s >>> s;
s >>> 0;
