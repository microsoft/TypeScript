//// [parserGenericConstraint3.ts]
class C<T extends List<T>> {
}

//// [parserGenericConstraint3.js]
var C = (function () {
    function C() {
    }
    return C;
}());
