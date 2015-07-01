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
    constructor() {
        this[Symbol.iterator] = 0;
    }
    [Symbol.toPrimitive]() { }
    get [Symbol.toStringTag]() {
        return 0;
    }
}
