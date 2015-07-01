//// [symbolType9.ts]
var s = Symbol.for("equal");
s == s;
s == true;
s != s;
0 != s;
s === s;
s === 1;
s !== s;
false !== s;

//// [symbolType9.js]
var s = Symbol.for("equal");
s == s;
s == true;
s != s;
0 != s;
s === s;
s === 1;
s !== s;
false !== s;
