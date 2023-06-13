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
function f(array) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
}
function g(array) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
}
function h(nonarray) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
}
function i(array, opt) { }
var a = [1, 2, 3, 4, 5];
f(a); // OK
g(a); // OK
h(a); // OK
i(a); // OK
