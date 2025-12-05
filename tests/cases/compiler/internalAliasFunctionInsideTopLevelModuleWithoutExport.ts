//@module: commonjs
// @declaration: true
export namespace a {
    export function foo(x: number) {
        return x;
    }
}

import b = a.foo;
export var bVal = b(10);
export var bVal2 = b;
