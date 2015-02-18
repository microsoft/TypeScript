//// [symbolProperty4.ts]
var x = {
    [Symbol()]: 0,
    [Symbol()]() { },
    get [Symbol()]() {
        return 0;
    }
}

//// [symbolProperty4.js]
var x = {
    [Symbol()]: 0,
    [Symbol()]() { },
    get [Symbol()]() {
        return 0;
    }
};
