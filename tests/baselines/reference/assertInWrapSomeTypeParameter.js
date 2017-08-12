//// [assertInWrapSomeTypeParameter.ts]
class C<T extends C<T>> {
    foo<U extends C<C<T>>(x: U) {
        return null;
    }
}

//// [assertInWrapSomeTypeParameter.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (x) {
        return null;
    };
    return C;
}());
