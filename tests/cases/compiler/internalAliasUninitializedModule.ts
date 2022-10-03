// @declaration: true
module a {
    export module b {
        export interface I {
            foo();
        }
    }
}

module c {
    import b = a.b;
    export var x: b.I;
    x.foo();
}