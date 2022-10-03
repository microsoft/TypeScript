//@module: commonjs
// @declaration: true
export module a {
    export interface I {
    }
}

export import b = a.I;
export var x: b;
