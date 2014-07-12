//@module: amd
// @declaration: true
export module a {
    export module b {
        export interface I {
            foo();
        }
    }
}

export import b = a.b;
export var x: b.I;
x.foo();
