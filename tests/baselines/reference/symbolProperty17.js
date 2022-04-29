//// [symbolProperty17.ts]
interface I {
    [Symbol.iterator]: number;
    [s: symbol]: string;
    "__@iterator": string;
}

var i: I;
var it = i[Symbol.iterator];

//// [symbolProperty17.js]
var i;
var it = i[Symbol.iterator];
