// @noimplicitany: true
var [a], {b}, c, d; // error

var [a1 = undefined], {b1 = null}, c1 = undefined, d1 = null; // error

var [a2]: [any], {b2}: { b2: any }, c2: any, d2: any;

var {b3}: { b3 }, c3: { b3 }; // error in type instead

var [a4] = [undefined], {b4} = { b4: null }, c4 = undefined, d4 = null; // error

var [a5 = undefined] = []; // error