// @declaration: true
// @module: commonjs
export module C { export interface I { } }
export import v = C;
export module M {
    export module C { export interface I { } }
    export var w: v.I; // Gets emitted as C.I, which is the wrong interface
}