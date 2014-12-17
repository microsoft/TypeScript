//// [restElementWithInitializer2.ts]
var a: number[];
var x: number[];
[...x = a] = a;  // Error, rest element cannot have initializer


//// [restElementWithInitializer2.js]
var a;
var x;
x = a = a.slice(0); // Error, rest element cannot have initializer
