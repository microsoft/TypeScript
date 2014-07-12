//// [grammarAmbiguities.js]
function f(n) {
    return null;
}
function g(x) {
    return null;
}

var A, B;

f(g(7));
f(g < A, B > 7); // Should error
f(g < A, B > +(7)); // Should error
