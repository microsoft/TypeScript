//// [tests/cases/conformance/parser/ecmascript5/Generics/parserGenericClass1.ts] ////

//// [parserGenericClass1.ts]
class C<T> {
}

//// [parserGenericClass1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
