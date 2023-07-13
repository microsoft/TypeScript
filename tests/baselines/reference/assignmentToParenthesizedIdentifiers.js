//// [tests/cases/conformance/expressions/valuesAndReferences/assignmentToParenthesizedIdentifiers.ts] ////

//// [assignmentToParenthesizedIdentifiers.ts]
var x: number;
x = 3; // OK
(x) = 3; // OK
x = ''; // Error
(x) = ''; // Error

module M {
    export var y: number;
}
M.y = 3; // OK
(M).y = 3; // OK
(M.y) = 3; // OK
M.y = ''; // Error
(M).y = ''; // Error
(M.y) = ''; // Error

M = { y: 3 }; // Error
(M) = { y: 3 }; // Error

module M2 {
    export module M3 {
        export var x: number;
    }

    M3 = { x: 3 }; // Error
}
M2.M3 = { x: 3 }; // OK
(M2).M3 = { x: 3 }; // OK
(M2.M3) = { x: 3 }; // OK

M2.M3 = { x: '' }; // Error
(M2).M3 = { x: '' }; // Error
(M2.M3) = { x: '' }; // Error


function fn() { }
fn = () => 3; // Bug 823548: Should be error (fn is not a reference)
(fn) = () => 3; // Should be error

function fn2(x: number, y: { t: number }) {
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

enum E {
    A
}
E = undefined; // Error
(E) = undefined; // Error

class C {

}

C = undefined; // Error
(C) = undefined; // Error


//// [assignmentToParenthesizedIdentifiers.js]
var x;
x = 3; // OK
(x) = 3; // OK
x = ''; // Error
(x) = ''; // Error
var M;
(function (M) {
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
    var M3;
    (function (M3) {
    })(M3 = M2.M3 || (M2.M3 = {}));
    M3 = { x: 3 }; // Error
})(M2 || (M2 = {}));
M2.M3 = { x: 3 }; // OK
(M2).M3 = { x: 3 }; // OK
(M2.M3) = { x: 3 }; // OK
M2.M3 = { x: '' }; // Error
(M2).M3 = { x: '' }; // Error
(M2.M3) = { x: '' }; // Error
function fn() { }
fn = function () { return 3; }; // Bug 823548: Should be error (fn is not a reference)
(fn) = function () { return 3; }; // Should be error
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
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
C = undefined; // Error
(C) = undefined; // Error
