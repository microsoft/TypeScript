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
    for (var _a = 1; _a < arguments.length; _a++) {
        args[_a - 1] = arguments[_a];
    }
}
function h(nonarray) {
    var args = [];
    for (var _b = 1; _b < arguments.length; _b++) {
        args[_b - 1] = arguments[_b];
    }
}
function i(array, opt) { }
var a = [1, 2, 3, 4, 5];
f(a); // OK
g(a); // OK
h(a); // OK
i(a); // OK
