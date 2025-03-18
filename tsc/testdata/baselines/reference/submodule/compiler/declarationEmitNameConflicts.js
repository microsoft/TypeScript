//// [tests/cases/compiler/declarationEmitNameConflicts.ts] ////

//// [declarationEmit_nameConflicts_1.ts]
module f { export class c { } }
export = f;

//// [declarationEmit_nameConflicts_0.ts]
import im = require('./declarationEmit_nameConflicts_1');
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
"use strict";
var f;
(function (f) {
    class c {
    }
    f.c = c;
})(f || (f = {}));
module.exports = f;
//// [declarationEmit_nameConflicts_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M = void 0;
const im = require("./declarationEmit_nameConflicts_1");
var M;
(function (M) {
    function f() { }
    M.f = f;
    class C {
    }
    M.C = C;
    let N;
    (function (N) {
        function g() { }
        N.g = g;
        ;
    })(N = M.N || (M.N = {}));
    M.a = M.f;
    M.b = M.C;
    M.c = N;
    M.d = im;
})(M || (exports.M = M = {}));
(function (M) {
    let P;
    (function (P) {
        function f() { }
        P.f = f;
        class C {
        }
        P.C = C;
        let N;
        (function (N) {
            function g() { }
            N.g = g;
            ;
        })(N = P.N || (P.N = {}));
        P.im = M.P.f;
        P.a = M.a;
        P.b = M.b;
        P.c = M.c;
        P.g = M.c.g;
        P.d = M.d;
    })(P = M.P || (M.P = {}));
})(M || (exports.M = M = {}));
(function (M) {
    let Q;
    (function (Q) {
        function f() { }
        Q.f = f;
        class C {
        }
        Q.C = C;
        let N;
        (function (N) {
            function g() { }
            N.g = g;
            ;
        })(N = Q.N || (Q.N = {}));
    })(Q = M.Q || (M.Q = {}));
})(M || (exports.M = M = {}));
