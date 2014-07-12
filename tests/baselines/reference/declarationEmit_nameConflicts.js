//// [tests/cases/compiler/declarationEmit_nameConflicts.ts] ////

//// [declarationEmit_nameConflicts_1.ts]
function f() { }
export = f;

//// [declarationEmit_nameConflicts_0.ts]
import im = require('declarationEmit_nameConflicts_1');
export module M {
    export function f() { }
    export class C { }
    export module N {
        export function g() { };
        export interface I { }
    }

    export import a = M.f;
    export import b = M.C;
    export import c = N;
    export import d = im;
}

export module M.P {
    export function f() { }
    export class C { }
    export module N {
        export function g() { };
        export interface I { }
    }
    export import im = M.P.f;
    // Bug 887180: Invalid .d.ts when an aliased entity is referenced, and a different entity is closer in scope
    export var a = M.a; // emitted incorrectly as typeof f
    export var b = M.b; // ok
    export var c = M.c; // ok
    export var g = M.c.g; // ok
    export var d = M.d; // emitted incorrectly as typeof im
}

export module M.Q {
    export function f() { }
    export class C { }
    export module N {
        export function g() { };
        export interface I { }
    }
    export interface b extends M.b { } // ok
    export interface I extends M.c.I { } // ok
    export module c {
        export interface I extends M.c.I { } // ok
    }
}

//// [declarationEmit_nameConflicts_1.js]
function f() {
}
module.exports = f;
//// [declarationEmit_nameConflicts_0.js]
(function (M) {
    function f() {
    }
    M.f = f;
    var C = (function () {
        function C() {
        }
        return C;
    })();
    M.C = C;
    (function (N) {
        function g() {
        }
        N.g = g;
        ;
    })(M.N || (M.N = {}));
    var N = M.N;
    M.a = M.f;
    M.b = M.C;
    M.c = N;
})(exports.M || (exports.M = {}));
var M = exports.M;
(function (M) {
    (function (P) {
        function f() {
        }
        P.f = f;
        var C = (function () {
            function C() {
            }
            return C;
        })();
        P.C = C;
        (function (N) {
            function g() {
            }
            N.g = g;
            ;
        })(P.N || (P.N = {}));
        var N = P.N;
        P.im = M.P.f;
        P.a = M.a;
        P.b = M.b;
        P.c = M.c;
        P.g = M.c.g;
        P.d = M.d;
    })(M.P || (M.P = {}));
    var P = M.P;
})(exports.M || (exports.M = {}));
var M = exports.M;
(function (M) {
    (function (Q) {
        function f() {
        }
        Q.f = f;
        var C = (function () {
            function C() {
            }
            return C;
        })();
        Q.C = C;
        (function (N) {
            function g() {
            }
            N.g = g;
            ;
        })(Q.N || (Q.N = {}));
        var N = Q.N;
    })(M.Q || (M.Q = {}));
    var Q = M.Q;
})(exports.M || (exports.M = {}));
var M = exports.M;
