//@module: commonjs
// @declaration: true
export namespace a {
    export namespace b {
        export interface I {
            foo();
        }
    }
}

import b = a.b;
export var x: b.I;
x.foo();
