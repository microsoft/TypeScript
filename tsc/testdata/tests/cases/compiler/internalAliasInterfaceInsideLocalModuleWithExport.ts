// @target: es2015
//@module: commonjs
// @declaration: true
export namespace a {
    export interface I {
    }
}

export namespace c {
    export import b = a.I;
    export var x: b;
}
