//// [parserParameterList16.ts]
class C {
   foo(a = 4);
   foo(a, b) { }
}

//// [parserParameterList16.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (a, b) { };
    return C;
}());
