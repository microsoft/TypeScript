//// [typeGuardsOnPropertyAccess2.ts]
var x: string|number;
x.length; // error
var y = x.length; // error
x.len; // error
if (x.len) { } // error
var r1 = x.len && x; // error
var r2 = x.len || x; // error
var r3 = x.length && x.len; // error
var r4 = x.length && x.len && x.length; // error
var r5 = x.len ? x.len : x.len; // error

//// [typeGuardsOnPropertyAccess2.js]
var x;
x.length; // error
var y = x.length; // error
x.len; // error
if (x.len) {
} // error
var r1 = x.len && x; // error
var r2 = x.len || x; // error
var r3 = x.length && x.len; // error
var r4 = x.length && x.len && x.length; // error
var r5 = x.len ? x.len : x.len; // error
