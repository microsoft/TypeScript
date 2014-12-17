//// [restElementWithInitializer1.ts]
var a: number[];
var [...x = a] = a;  // Error, rest element cannot have initializer


//// [restElementWithInitializer1.js]
var a;
var x = a.slice(0); // Error, rest element cannot have initializer
