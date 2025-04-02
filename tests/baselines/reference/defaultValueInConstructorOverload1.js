//// [tests/cases/compiler/defaultValueInConstructorOverload1.ts] ////

//// [defaultValueInConstructorOverload1.ts]
class C {
    constructor(x = '');
    constructor(x = '') {
    }
}

//// [defaultValueInConstructorOverload1.js]
var C = /** @class */ (function () {
    function C(x) {
        if (x === void 0) { x = ''; }
    }
    return C;
}());
