//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName11.ts] ////

//// [parserES5ComputedPropertyName11.ts]
class C {
   [e]();
}

//// [parserES5ComputedPropertyName11.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
