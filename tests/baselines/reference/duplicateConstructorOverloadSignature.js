//// [duplicateConstructorOverloadSignature.ts]
class C {
    constructor(x: number);
    constructor(x: number);
    constructor(x: any) { }
}

//// [duplicateConstructorOverloadSignature.js]
var C = (function () {
    function C(x) {
    }
    return C;
}());
