//// [parserGenericConstraint7.ts]
class C<T extends List<List<T>>> {
}

//// [parserGenericConstraint7.js]
var C = (function () {
    function C() {
    }
    return C;
}());
