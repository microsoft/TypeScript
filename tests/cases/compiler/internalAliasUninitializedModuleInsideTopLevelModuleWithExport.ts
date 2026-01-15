//@module: amd
// @declaration: true
export namespace a {
    export namespace b {
        export interface I {
            foo();
        }
    }
}

export import b = a.b;
export var x: b.I;
x.foo();
