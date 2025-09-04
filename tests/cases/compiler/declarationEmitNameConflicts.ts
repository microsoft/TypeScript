// @declaration: true
// @module: commonjs
// @Filename: declarationEmit_nameConflicts_1.ts
namespace f { export class c { } }
export = f;

// @Filename: declarationEmit_nameConflicts_0.ts
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