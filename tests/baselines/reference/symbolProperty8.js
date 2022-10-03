//// [symbolProperty8.ts]
interface I {
    [Symbol.unscopables]: number;
    [Symbol.toPrimitive]();
}

//// [symbolProperty8.js]
