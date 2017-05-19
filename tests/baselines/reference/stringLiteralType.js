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
