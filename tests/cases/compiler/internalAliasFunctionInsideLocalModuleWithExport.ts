//@module: commonjs
// @declaration: true
export namespace a {
    export function foo(x: number) {
        return x;
    }
}

export namespace c {
    export import b = a.foo;
    export var bVal = b(10);
    export var bVal2 = b;
}
