//// [parserSymbolProperty6.ts]
class C {
    [Symbol.toStringTag]: string = "";
}

//// [parserSymbolProperty6.js]
var _a;
class C {
    constructor() {
        this[_a] = "";
    }
}
_a = Symbol.toStringTag;
