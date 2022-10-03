//// [symbolProperty1.ts]
var s: symbol;
var x = {
    [s]: 0,
    [s]() { },
    get [s]() {
        return 0;
    }
}

//// [symbolProperty1.js]
var s;
var x = {
    [s]: 0,
    [s]() { },
    get [s]() {
        return 0;
    }
};
