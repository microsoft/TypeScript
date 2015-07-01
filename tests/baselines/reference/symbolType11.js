//// [symbolType11.ts]
var s = Symbol.for("logical");
s && s;
s && [];
0 && s;
s || s;
s || 1;
({}) || s;

//// [symbolType11.js]
var s = Symbol.for("logical");
s && s;
s && [];
0 && s;
s || s;
s || 1;
({}) || s;
