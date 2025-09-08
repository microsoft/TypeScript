//@module: amd
// @declaration: true
export namespace a {
    export interface I {
    }
}

export namespace c {
    export import b = a.I;
    export var x: b;
}
