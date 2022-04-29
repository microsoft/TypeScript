//// [parserGenericConstraint3.ts]
class C<T extends List<T>> {
}

//// [parserGenericConstraint3.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
