//// [classWithOverloadImplementationOfWrongName.ts]
class C {
    foo(): string;
    foo(x): number;
    bar(x): any { }
}

//// [classWithOverloadImplementationOfWrongName.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.bar = function (x) { };
    return C;
}());
