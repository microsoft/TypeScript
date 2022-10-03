//// [literalTypesWidenInParameterPosition.ts]
class D {
    readonly noWiden = 1
    constructor(readonly widen = 2) {
        this.noWiden = 5; // error
        this.widen = 6; // ok
    }
}
new D(7); // ok


//// [literalTypesWidenInParameterPosition.js]
var D = /** @class */ (function () {
    function D(widen) {
        if (widen === void 0) { widen = 2; }
        this.widen = widen;
        this.noWiden = 1;
        this.noWiden = 5; // error
        this.widen = 6; // ok
    }
    return D;
}());
new D(7); // ok
