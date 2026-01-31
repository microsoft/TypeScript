//// [tests/cases/conformance/es6/binaryAndOctalIntegerLiteral/invalidBinaryIntegerLiteralAndOctalIntegerLiteral.ts] ////

//// [invalidBinaryIntegerLiteralAndOctalIntegerLiteral.ts]
// Error
var binary = 0b21010;
var binary1 = 0B21010;
var octal = 0o81010;
var octal = 0O91010;

//// [invalidBinaryIntegerLiteralAndOctalIntegerLiteral.js]
// Error
var binary = 0b;
21010;
var binary1 = 0B;
21010;
var octal = 0o;
81010;
var octal = 0O;
91010;
