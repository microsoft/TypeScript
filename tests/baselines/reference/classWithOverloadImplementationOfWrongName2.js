//// [classWithOverloadImplementationOfWrongName2.ts]
class C {
    foo(): string;
    bar(x): any { }
    foo(x): number;
}

//// [classWithOverloadImplementationOfWrongName2.js]
var C = (function () {
    function C() {
    }
    C.prototype.bar = function (x) { };
    return C;
}());
