//// [noUnusedLocals_selfReference.ts]
export {}; // Make this a module scope, so these are local variables.

function f() {
    f;
    function g() {
        g;
    }
}
class C {
    m() { C; }
}
enum E { A = 0, B = E.A }

class P { private m() { this.m; } }
P;

// Does not detect mutual recursion.
function g() { D; }
class D { m() { g; } }


//// [noUnusedLocals_selfReference.js]
"use strict";
exports.__esModule = true;
function f() {
    f;
    function g() {
        g;
    }
}
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
var P = /** @class */ (function () {
    function P() {
    }
    P.prototype.m = function () { this.m; };
    return P;
}());
P;
// Does not detect mutual recursion.
function g() { D; }
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.m = function () { g; };
    return D;
}());
