//// [assertInWrapSomeTypeParameter.ts]
class C<T extends C<T>> {
    foo<U extends C<C<T>>(x: U) {
        return null;
    }
}

//// [assertInWrapSomeTypeParameter.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
        return null;
    };
    return C;
}());
