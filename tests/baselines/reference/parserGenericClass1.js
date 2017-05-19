//// [parserGenericClass1.ts]
class C<T> {
}

//// [parserGenericClass1.js]
var C = (function () {
    function C() {
    }
    return C;
}());
