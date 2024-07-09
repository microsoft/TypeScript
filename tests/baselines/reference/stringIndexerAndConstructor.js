//// [tests/cases/compiler/stringIndexerAndConstructor.ts] ////

//// [stringIndexerAndConstructor.ts]
class C {
    [s: string]: number;
    constructor() { }
    static v() { }
}

interface I {
    [s: string]: number;
    (): boolean;
    new (): boolean;
    "": string;
    d: string;
}

//// [stringIndexerAndConstructor.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.v = function () { };
    return C;
}());
