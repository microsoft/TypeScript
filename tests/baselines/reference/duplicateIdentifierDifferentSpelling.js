//// [tests/cases/compiler/duplicateIdentifierDifferentSpelling.ts] ////

//// [duplicateIdentifierDifferentSpelling.ts]
class A {
  0b11 = '';
  3 = '';
}

var X = { 0b11: '', 3: '' };


//// [duplicateIdentifierDifferentSpelling.js]
var A = /** @class */ (function () {
    function A() {
        this[3] = '';
        this[3] = '';
    }
    return A;
}());
var X = { 3: '', 3: '' };
