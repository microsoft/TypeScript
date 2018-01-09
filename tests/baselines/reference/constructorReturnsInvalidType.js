//// [constructorReturnsInvalidType.ts]
class X {
    constructor() {
        return 1;
    }
    foo() { }
}
 
var x = new X();


//// [constructorReturnsInvalidType.js]
var X = /** @class */ (function () {
    function X() {
        return 1;
    }
    X.prototype.foo = function () { };
    return X;
}());
var x = new X();
