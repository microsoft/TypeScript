//// [assignments.ts]
// In this file:
//  Assign to a module
//  Assign to a class
//  Assign to an enum
//  Assign to a function
//  Assign to a variable
//  Assign to a parameter
//  Assign to an interface

module M { }
M = null; // Error

class C { }
C = null; // Error

enum E { A }
E = null; // Error
E.A = null; // OK per spec, Error per implementation (509581)

function fn() { }
fn = null; // Should be error

var v;
v = null; // OK

function fn2(p) {
    p = null; // OK
}

interface I { }
I = null; // Error

//// [assignments.js]
M = null;
var C = (function () {
    function C() {
    }
    return C;
})();
C = null;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
E = null;
0 /* A */ = null;
function fn() {
}
fn = null;
var v;
v = null;
function fn2(p) {
    p = null;
}
I = null;
