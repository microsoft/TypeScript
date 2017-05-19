//// [parserGenericConstraint1.ts]
class C<T extends number> {
}

//// [parserGenericConstraint1.js]
var C = (function () {
    function C() {
    }
    return C;
}());
