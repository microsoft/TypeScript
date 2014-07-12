//// [defaultArgsInFunctionExpressions.js]
var f = function (a) {
    if (typeof a === "undefined") { a = 3; }
    return a;
};
var n = f(4);
n = f();
var s = f('');
s = f();

// Type check the default argument with the type annotation
var f2 = function (a) {
    if (typeof a === "undefined") { a = 3; }
    return a;
};
s = f2('');
s = f2();
n = f2();

// Contextually type the default arg with the type annotation
var f3 = function (a) {
    if (typeof a === "undefined") { a = function (s) {
        return s;
    }; }
};

// Type check using the function's contextual type
var f4 = function (a) {
    if (typeof a === "undefined") { a = ""; }
};

// Contextually type the default arg using the function's contextual type
var f5 = function (a) {
    if (typeof a === "undefined") { a = function (s) {
        return s;
    }; }
};

var U;
(function (U) {
    U.x;
})(U || (U = {}));

var f6 = function (t) {
    if (typeof t === "undefined") { t = T; }
};
var f7 = function (t) {
    if (typeof t === "undefined") { t = U; }
    return t;
};

f7().x;
