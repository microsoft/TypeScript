//@target: ES6
interface I {
    [Symbol.iterator]: number;
    [s: symbol]: string;
    "__@iterator": string;
}

var i: I;
var it = i[Symbol.iterator];