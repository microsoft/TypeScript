//@target: ES6
interface I {
    [Symbol.iterator]: (s: string) => string;
    [Symbol.toStringTag](s: number): number;
}

var i: I = {
    [Symbol.iterator]: s => s,
    [Symbol.toStringTag](n) { return n; }
}