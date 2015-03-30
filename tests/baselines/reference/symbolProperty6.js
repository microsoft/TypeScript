//// [symbolProperty6.ts]
class C {
    [Symbol.iterator] = 0;
    [Symbol.unscopables]: number;
    [Symbol.isRegExp]() { }
    get [Symbol.toStringTag]() {
        return 0;
    }
}

//// [symbolProperty6.js]
class C {
    constructor() {
        this[Symbol.iterator] = 0;
    }
    [Symbol.isRegExp]() { }
    get [Symbol.toStringTag]() {
        return 0;
    }
}
