//@module: commonjs
// @declaration: true
export namespace a {
    export interface I {
    }
}

export import b = a.I;
export var x: b;
