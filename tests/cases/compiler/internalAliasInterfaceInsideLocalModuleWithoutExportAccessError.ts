//@module: commonjs
export namespace a {
    export interface I {
    }
}

export namespace c {
    import b = a.I;
    export var x: b;
}

var x: c.b;