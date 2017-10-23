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
var _a = Symbol(), _b = Symbol();
class C {
    constructor() {
        this[_a] = 0;
    }
    [Symbol()]() { }
    get [Symbol()]() {
        return 0;
    }
}
