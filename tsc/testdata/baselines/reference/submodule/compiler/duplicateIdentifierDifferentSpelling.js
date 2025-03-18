//// [tests/cases/compiler/duplicateIdentifierDifferentSpelling.ts] ////

//// [duplicateIdentifierDifferentSpelling.ts]
class A {
  0b11 = '';
  3 = '';
}

var X = { 0b11: '', 3: '' };


//// [duplicateIdentifierDifferentSpelling.js]
class A {
    0b11 = '';
    3 = '';
}
var X = { 0b11: '', 3: '' };
