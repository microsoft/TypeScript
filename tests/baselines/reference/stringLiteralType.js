//// [tests/cases/conformance/types/primitives/stringLiteral/stringLiteralType.ts] ////

//// [stringLiteralType.ts]
var x: 'hi';

function f(x: 'hi');
function f(x: string);
function f(x: any) {
}

//// [stringLiteralType.js]
var x;
function f(x) {
}
