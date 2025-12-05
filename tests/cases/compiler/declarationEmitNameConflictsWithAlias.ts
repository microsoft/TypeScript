// @declaration: true
// @module: commonjs
export namespace C { export interface I { } }
export import v = C;
export namespace M {
    export namespace C { export interface I { } }
    export var w: v.I; // Gets emitted as C.I, which is the wrong interface
}