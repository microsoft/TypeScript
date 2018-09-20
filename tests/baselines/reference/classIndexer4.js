//// [classIndexer4.ts]
class C123 {
    [s: string]: number;
    constructor() {
    }
}

interface D123 extends C123 {
    x: number;
    y: string;
}

//// [classIndexer4.js]
var C123 = /** @class */ (function () {
    function C123() {
    }
    return C123;
}());
