//// [privateNamesNotAllowedAsParameters.ts]
// @target es6

class A {
    setFoo(#foo: string) {}
}


//// [privateNamesNotAllowedAsParameters.js]
// @target es6
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.setFoo = function () { };
    return A;
}());
{ }
