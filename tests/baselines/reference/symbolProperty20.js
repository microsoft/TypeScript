//// [symbolProperty20.ts]
interface I {
    [Symbol.iterator]: (s: string) => string;
    [Symbol.toStringTag](s: number): number;
}

var i: I = {
    [Symbol.iterator]: s => s,
    [Symbol.toStringTag](n) { return n; }
}

//// [symbolProperty20.js]
var i = {
    [Symbol.iterator]: s => s,
    [Symbol.toStringTag](n) { return n; }
};
