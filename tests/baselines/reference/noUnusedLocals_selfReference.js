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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
exports.__esModule = true;
function f() { f; }
var C = (function () {
    function C() {
    }
    C.prototype.m = function () { C; };
    __names(C.prototype, ["m"]);
    return C;
}());
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 0] = "B";
})(E || (E = {}));
// Does not detect mutual recursion.
function g() { D; }
var D = (function () {
    function D() {
    }
    D.prototype.m = function () { g; };
    __names(D.prototype, ["m"]);
    return D;
}());
// Does not work on private methods.
var P = (function () {
    function P() {
    }
    P.prototype.m = function () { this.m; };
    __names(P.prototype, ["m"]);
    return P;
}());
P;
