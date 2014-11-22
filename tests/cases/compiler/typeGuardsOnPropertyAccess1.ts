var x: string|number;
var r = x.length && x.charAt; // no error

var y: Array<string>|Array<number>|Date = [''];
var r2 = y.length ? y[0] : ""; // no error, string|number

if (y.length) { var r3 = y; } // no error, string[]|number[]

var r4 = x.length || x; // no error, number
var r5 = y.length || y.getDate(); // no error, 'any'?