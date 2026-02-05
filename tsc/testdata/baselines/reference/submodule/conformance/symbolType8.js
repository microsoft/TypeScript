//// [tests/cases/conformance/es6/Symbols/symbolType8.ts] ////

//// [symbolType8.ts]
var s = Symbol.for("compare");
s < s;
s < 0;
s > s;
s > 0;
s <= s;
s <= 0;
s >= s;
s >= 0;

0 >= (s || 0);
(s || 0) >= s;

//// [symbolType8.js]
"use strict";
var s = Symbol.for("compare");
s < s;
s < 0;
s > s;
s > 0;
s <= s;
s <= 0;
s >= s;
s >= 0;
0 >= (s || 0);
(s || 0) >= s;
