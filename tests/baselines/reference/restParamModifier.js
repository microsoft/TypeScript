//// [restParamModifier.ts]
class C {
    constructor(...public rest: string[]) {}
}

//// [restParamModifier.js]
var C = (function () {
    function C(public, string) {
        if (string === void 0) { string = []; }
    }
    return C;
}());
