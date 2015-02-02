//@target: ES6
interface I {
    [Symbol.iterator]: number;
    [s: Symbol]: string;
    "__@iterator": string;
}

var i: I;
var it = i[Symbol.iterator];