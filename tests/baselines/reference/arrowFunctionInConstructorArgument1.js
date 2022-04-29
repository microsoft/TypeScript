//// [arrowFunctionInConstructorArgument1.ts]
class C {
    constructor(x: () => void) { }
}
var c = new C(() => { return asdf; } ) // should error


//// [arrowFunctionInConstructorArgument1.js]
var C = /** @class */ (function () {
    function C(x) {
    }
    return C;
}());
var c = new C(function () { return asdf; }); // should error
