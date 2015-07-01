//// [symbolProperty7.ts]
class C {
    [Symbol()] = 0;
    [Symbol()]: number;
    [Symbol()]() { }
    get [Symbol()]() {
        return 0;
    }
}

//// [symbolProperty7.js]
class C {
    constructor() {
        this[Symbol()] = 0;
    }
    [Symbol()]() { }
    get [Symbol()]() {
        return 0;
    }
}
