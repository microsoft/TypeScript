//// [symbolProperty8.ts]
interface I {
    [Symbol.unscopables]: number;
    [Symbol.isRegExp]();
}

//// [symbolProperty8.js]
