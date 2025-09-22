//// [tests/cases/compiler/declarationEmitNameConflicts.ts] ////

//// [declarationEmit_nameConflicts_1.ts]
namespace f { export class c { } }
export = f;

//// [declarationEmit_nameConflicts_0.ts]
import im = require('./declarationEmit_nameConflicts_1');
export namespace M {
    export function f() { }
    export class C { }
    export namespace N {
        export function g() { };
        export interface I { }
    }

    export import a = M.f;
    export import b = M.C;
    export import c = N;
    export import d = im;
}

export namespace M.P {
    export function f() { }
    export class C { }
    export namespace N {
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

export namespace M.Q {
    export function f() { }
    export class C { }
    export namespace N {
        export function g() { };
        export interface I { }
    }
    export interface b extends M.b { } // ok
    export interface I extends M.c.I { } // ok
    export namespace c {
        export interface I extends M.c.I { } // ok
    }
}

//// [declarationEmit_nameConflicts_1.js]
"use strict";
var f;
(function (f) {
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
    f.c = c;
})(f || (f = {}));
module.exports = f;
//// [declarationEmit_nameConflicts_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M = void 0;
var im = require("./declarationEmit_nameConflicts_1");
var M;
(function (M) {
    function f() { }
    M.f = f;
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    M.C = C;
    var N;
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
    var P;
    (function (P) {
        function f() { }
        P.f = f;
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        P.C = C;
        var N;
        (function (N) {
            function g() { }
            N.g = g;
            ;
        })(N = P.N || (P.N = {}));
        P.im = M.P.f;
        P.a = M.a; // emitted incorrectly as typeof f
        P.b = M.b; // ok
        P.c = M.c; // ok
        P.g = M.c.g; // ok
        P.d = M.d; // emitted incorrectly as typeof im
    })(P = M.P || (M.P = {}));
})(M || (exports.M = M = {}));
(function (M) {
    var Q;
    (function (Q) {
        function f() { }
        Q.f = f;
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        Q.C = C;
        var N;
        (function (N) {
            function g() { }
            N.g = g;
            ;
        })(N = Q.N || (Q.N = {}));
    })(Q = M.Q || (M.Q = {}));
})(M || (exports.M = M = {}));


//// [declarationEmit_nameConflicts_1.d.ts]
declare namespace f {
    class c {
    }
}
export = f;
//// [declarationEmit_nameConflicts_0.d.ts]
import im = require('./declarationEmit_nameConflicts_1');
export declare namespace M {
    function f(): void;
    class C {
    }
    namespace N {
        function g(): void;
        interface I {
        }
    }
    export import a = M.f;
    export import b = M.C;
    export import c = N;
    export import d = im;
}
export declare namespace M.P {
    function f(): void;
    class C {
    }
    namespace N {
        function g(): void;
        interface I {
        }
    }
    export import im = M.P.f;
    var a: typeof M.f;
    var b: typeof M.C;
    var c: typeof M.N;
    var g: typeof M.N.g;
    var d: typeof M.d;
}
export declare namespace M.Q {
    function f(): void;
    class C {
    }
    namespace N {
        function g(): void;
        interface I {
        }
    }
    interface b extends M.b {
    }
    interface I extends M.c.I {
    }
    namespace c {
        interface I extends M.c.I {
        }
    }
}
