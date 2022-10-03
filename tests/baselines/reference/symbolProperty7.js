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
var _a;
class C {
    constructor() {
        this[_a] = 0;
    }
    [(_a = Symbol(), Symbol(), Symbol())]() { }
    get [Symbol()]() {
        return 0;
    }
}
