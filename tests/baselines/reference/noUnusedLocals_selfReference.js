//// [noUnusedLocals_selfReference.ts]
export {}; // Make this a module scope, so these are local variables.

function f() { f; }
class C {
    m() { C; }
}
enum E { A = 0, B = E.A }

// Does not detect mutual recursion.
function g() { D; }
class D { m() { g; } }

// Does not work on private methods.
class P { private m() { this.m; } }
P;


//// [noUnusedLocals_selfReference.js]
"use strict";
exports.__esModule = true;
function f() { f; }
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function () { C; };
    return C;
}());
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 0] = "B";
})(E || (E = {}));
// Does not detect mutual recursion.
function g() { D; }
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.m = function () { g; };
    return D;
}());
// Does not work on private methods.
var P = /** @class */ (function () {
    function P() {
    }
    P.prototype.m = function () { this.m; };
    return P;
}());
P;
