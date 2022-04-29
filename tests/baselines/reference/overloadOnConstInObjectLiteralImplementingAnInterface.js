//// [overloadOnConstInObjectLiteralImplementingAnInterface.ts]
interface I {
    x1(a: number, callback: (x: 'hi') => number);
}

var i2: I = { x1: (a: number, cb: (x: 'hi') => number) => { } }; // error

//// [overloadOnConstInObjectLiteralImplementingAnInterface.js]
var i2 = { x1: function (a, cb) { } }; // error
