//// [tests/cases/conformance/es6/Symbols/symbolProperty8.ts] ////

//// [symbolProperty8.ts]
interface I {
    [Symbol.unscopables]: number;
    [Symbol.toPrimitive]();
}

//// [symbolProperty8.js]
