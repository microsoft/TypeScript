//// [assignmentToParenthesizedIdentifiers.js]
var x;
x = 3; // OK
(x) = 3; // OK
x = ''; // Error
(x) = ''; // Error

var M;
(function (M) {
    M.y;
})(M || (M = {}));
M.y = 3; // OK
(M).y = 3; // OK
(M.y) = 3; // OK
M.y = ''; // Error
(M).y = ''; // Error
(M.y) = ''; // Error

M = { y: 3 }; // Error
(M) = { y: 3 }; // Error

var M2;
(function (M2) {
    (function (M3) {
        M3.x;
    })(M2.M3 || (M2.M3 = {}));
    var M3 = M2.M3;

    M3 = { x: 3 }; // Error
})(M2 || (M2 = {}));
M2.M3 = { x: 3 }; // OK
(M2).M3 = { x: 3 }; // OK
(M2.M3) = { x: 3 }; // OK

M2.M3 = { x: '' }; // Error
(M2).M3 = { x: '' }; // Error
(M2.M3) = { x: '' }; // Error

function fn() {
}
fn = function () {
    return 3;
}; // Bug 823548: Should be error (fn is not a reference)
(fn) = function () {
    return 3;
}; // Should be error

function fn2(x, y) {
    x = 3;
    (x) = 3; // OK
    x = ''; // Error
    (x) = ''; // Error

    (y).t = 3; // OK
    (y.t) = 3; // OK
    (y).t = ''; // Error
    (y.t) = ''; // Error

    y['t'] = 3; // OK
    (y)['t'] = 3; // OK
    (y['t']) = 3; // OK
    y['t'] = ''; // Error
    (y)['t'] = ''; // Error
    (y['t']) = ''; // Error
}

var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
E = undefined; // Error
(E) = undefined; // Error

var C = (function () {
    function C() {
    }
    return C;
})();

C = undefined; // Error
(C) = undefined; // Error
