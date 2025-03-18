//// [tests/cases/conformance/es6/Symbols/symbolProperty6.ts] ////

//// [symbolProperty6.ts]
class C {
    [Symbol.iterator] = 0;
    [Symbol.unscopables]: number;
    [Symbol.toPrimitive]() { }
    get [Symbol.toStringTag]() {
        return 0;
    }
}

//// [symbolProperty6.js]
class C {
    [Symbol.iterator] = 0;
    [Symbol.unscopables];
    [Symbol.toPrimitive]() { }
    get [Symbol.toStringTag]() {
        return 0;
    }
}
