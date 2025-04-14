//// [tests/cases/compiler/restParamModifier.ts] ////

//// [restParamModifier.ts]
class C {
    constructor(...public rest: string[]) {}
}

//// [restParamModifier.js]
var C = /** @class */ (function () {
    function C(rest) {
    }
    return C;
}());
