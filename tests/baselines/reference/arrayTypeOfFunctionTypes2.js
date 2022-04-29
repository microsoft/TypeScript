//// [arrayTypeOfFunctionTypes2.ts]
// valid uses of arrays of function types

var x: new () => string[];
var r = x[1];
var r2 = new r();
var r2b = r();

var x2: { new(): string }[];
var r3 = x[1];
var r4 = new r3();
var r4b = new r3();

var x3: Array<new () => string>;
var r5 = x2[1];
var r6 = new r5();
var r6b = r5();

//// [arrayTypeOfFunctionTypes2.js]
// valid uses of arrays of function types
var x;
var r = x[1];
var r2 = new r();
var r2b = r();
var x2;
var r3 = x[1];
var r4 = new r3();
var r4b = new r3();
var x3;
var r5 = x2[1];
var r6 = new r5();
var r6b = r5();
