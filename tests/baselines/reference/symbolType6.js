//// [tests/cases/conformance/es6/Symbols/symbolType6.ts] ////

//// [symbolType6.ts]
var s = Symbol.for("add");
var a: any;
s + s;
s - s;
s + "";
s + a;
s + 0;
"" + s;
a + s;
0 + s;
s - 0;
0 - s;

(s || "") + "";
"" + (s || "");

//// [symbolType6.js]
var s = Symbol.for("add");
var a;
s + s;
s - s;
s + "";
s + a;
s + 0;
"" + s;
a + s;
0 + s;
s - 0;
0 - s;
(s || "") + "";
"" + (s || "");
