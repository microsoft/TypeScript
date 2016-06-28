//// [parserErrorRecovery_ClassElement1.ts]
class C {

// Classes can't be nested.  So we should bail out of parsing here and recover
// this as a source unit element.
class D {
}

//// [parserErrorRecovery_ClassElement1.js]
var C = (function () {
    function C() {
    }
    return C;
}());
// Classes can't be nested.  So we should bail out of parsing here and recover
// this as a source unit element.
var D = (function () {
    function D() {
    }
    return D;
}());
