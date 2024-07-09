function f<T>(array: T[], ...args) { }
function g(array: number[], ...args) { }
function h<T>(nonarray: T, ...args) { }
function i<T>(array: T[], opt?: any[]) { }
var a = [1, 2, 3, 4, 5];

f(a); // OK
g(a); // OK
h(a); // OK
i(a); // OK
