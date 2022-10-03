//@module: amd
// @declaration: true
export module a {
    export interface I {
    }
}

export module c {
    export import b = a.I;
    export var x: b;
}
