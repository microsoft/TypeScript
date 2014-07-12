// @declaration: true
// @Filename: declarationEmit_nameConflicts_1.ts
function f() { }
export = f;

// @Filename: declarationEmit_nameConflicts_0.ts
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
    // Bug 887180
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