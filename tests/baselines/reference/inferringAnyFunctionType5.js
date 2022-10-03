//// [inferringAnyFunctionType5.ts]
function f<T extends { q: (p1: number) => number }>(p: T): T {
    return p;
}

var v = f({ q: x => x });

//// [inferringAnyFunctionType5.js]
function f(p) {
    return p;
}
var v = f({ q: function (x) { return x; } });
