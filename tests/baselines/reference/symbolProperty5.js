//// [symbolProperty5.ts]
var x = {
    [Symbol.iterator]: 0,
    [Symbol.isRegExp]() { },
    get [Symbol.toStringTag]() {
        return 0;
    }
}

//// [symbolProperty5.js]
var x = {
    [Symbol.iterator]: 0,
    [Symbol.isRegExp]() {
    },
    get [Symbol.toStringTag]() {
        return 0;
    }
};
