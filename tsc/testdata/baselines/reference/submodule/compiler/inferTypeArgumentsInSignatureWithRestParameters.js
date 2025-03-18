//// [tests/cases/compiler/inferTypeArgumentsInSignatureWithRestParameters.ts] ////

//// [inferTypeArgumentsInSignatureWithRestParameters.ts]
function f<T>(array: T[], ...args) { }
function g(array: number[], ...args) { }
function h<T>(nonarray: T, ...args) { }
function i<T>(array: T[], opt?: any[]) { }
var a = [1, 2, 3, 4, 5];

f(a); // OK
g(a); // OK
h(a); // OK
i(a); // OK


//// [inferTypeArgumentsInSignatureWithRestParameters.js]
function f(array, ...args) { }
function g(array, ...args) { }
function h(nonarray, ...args) { }
function i(array, opt) { }
var a = [1, 2, 3, 4, 5];
f(a);
g(a);
h(a);
i(a);
