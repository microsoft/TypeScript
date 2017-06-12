//// [inOperatorWithGeneric.ts]
class C<T> {
    foo(x:T) {
        for (var p in x) {
        }
    }
}

//// [inOperatorWithGeneric.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (x) {
        for (var p in x) {
        }
    };
    return C;
}());
