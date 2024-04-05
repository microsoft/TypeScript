//// [tests/cases/conformance/parser/ecmascript5/Generics/parserGenericConstraint6.ts] ////

//// [parserGenericConstraint6.ts]
class C<T extends List<List<T> >> {
}

//// [parserGenericConstraint6.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
