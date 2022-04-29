//// [arithmeticOnInvalidTypes2.ts]
var obj = function f<T>(a: T, b: T) {
    var z1 = a + b;
    var z2 = a - b;
    var z3 = a * b;
    var z4 = a / b;
    return a;
};

//// [arithmeticOnInvalidTypes2.js]
var obj = function f(a, b) {
    var z1 = a + b;
    var z2 = a - b;
    var z3 = a * b;
    var z4 = a / b;
    return a;
};
