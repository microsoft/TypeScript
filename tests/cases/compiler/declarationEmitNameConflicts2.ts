// @declaration: true
namespace X.Y.base {
    export function f() { }
    export class C { }
    export namespace M {
        export var v;
    }
    export enum E { }
}

namespace X.Y.base.Z {
    export var f = X.Y.base.f; // Should be base.f
    export var C = X.Y.base.C; // Should be base.C
    export var M = X.Y.base.M; // Should be base.M
    export var E = X.Y.base.E; // Should be base.E
}