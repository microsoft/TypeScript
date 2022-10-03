//// [duplicateConstructorOverloadSignature.ts]
class C {
    constructor(x: number);
    constructor(x: number);
    constructor(x: any) { }
}

//// [duplicateConstructorOverloadSignature.js]
var C = /** @class */ (function () {
    function C(x) {
    }
    return C;
}());
