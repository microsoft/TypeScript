// @declaration: true
module a {
    export interface I {
    }
}

module c {
    import b = a.I;
    export var x: b;
}
