//// [classWithOverloadImplementationOfWrongName.ts]
class C {
    foo(): string;
    foo(x): number;
    bar(x): any { }
}

//// [classWithOverloadImplementationOfWrongName.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.bar = function (x) { };
    return C;
}());
