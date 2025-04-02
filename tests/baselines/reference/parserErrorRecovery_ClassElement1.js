//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ClassElements/parserErrorRecovery_ClassElement1.ts] ////

//// [parserErrorRecovery_ClassElement1.ts]
class C {

// Classes can't be nested.  So we should bail out of parsing here and recover
// this as a source unit element.
class D {
}

//// [parserErrorRecovery_ClassElement1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
// Classes can't be nested.  So we should bail out of parsing here and recover
// this as a source unit element.
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
