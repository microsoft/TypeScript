//// [tests/cases/compiler/duplicateConstructorOverloadSignature2.ts] ////

//// [duplicateConstructorOverloadSignature2.ts]
class C<T> {
    constructor(x: T);
    constructor(x: T);
    constructor(x: any) { }
}

//// [duplicateConstructorOverloadSignature2.js]
"use strict";
var C = /** @class */ (function () {
    function C(x) {
    }
    return C;
}());
