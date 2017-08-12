//// [ClassDeclaration11.ts]
class C {
   constructor();
   foo() { }
}

//// [ClassDeclaration11.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function () { };
    return C;
}());
