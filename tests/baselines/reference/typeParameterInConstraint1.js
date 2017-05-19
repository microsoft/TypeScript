//// [typeParameterInConstraint1.ts]
class C<T, U extends T> {
}

//// [typeParameterInConstraint1.js]
var C = (function () {
    function C() {
    }
    return C;
}());
