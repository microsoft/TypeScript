//// [tests/cases/conformance/parser/ecmascript5/Generics/parserGenericConstraint1.ts] ////

//// [parserGenericConstraint1.ts]
class C<T extends number> {
}

//// [parserGenericConstraint1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
