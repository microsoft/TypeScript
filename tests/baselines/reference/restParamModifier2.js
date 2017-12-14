//// [restParamModifier2.ts]
class C {
    constructor(public ...rest: string[]) {}
}

//// [restParamModifier2.js]
var C = /** @class */ (function () {
    function C() {
        this.rest = rest;
    }
    return C;
}());
