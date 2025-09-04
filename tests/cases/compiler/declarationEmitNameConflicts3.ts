// @declaration: true
// @module: commonjs
namespace M {
    export interface D { }
    export namespace D {
        export function f() { }
    }
    export namespace C {
        export function f() { }
    }
    export namespace E {
        export function f() { }
    }
}

namespace M.P {
    export class C {
        static f() { }
    }
    export class E extends C { }
    export enum D {
        f
    }
    export var v: M.D; // ok
    export var w = M.D.f; // error, should be typeof M.D.f
    export var x = M.C.f; // error, should be typeof M.C.f
    export var x = M.E.f; // error, should be typeof M.E.f
}