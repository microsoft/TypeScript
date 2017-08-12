//// [parserParameterList16.ts]
class C {
   foo(a = 4);
   foo(a, b) { }
}

//// [parserParameterList16.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (a, b) { };
    return C;
}());
