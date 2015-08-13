//// [inferringAnyFunctionType1.ts]
function f<T extends { "0": (p1: number) => number }>(p: T): T {
    return p;
}

var v = f([x => x]);

//// [inferringAnyFunctionType1.js]
function f(p) {
    return p;
}
var v = f([function (x) { return x; }]);
