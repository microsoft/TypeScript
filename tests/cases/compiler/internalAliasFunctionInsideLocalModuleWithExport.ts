//@module: commonjs
// @declaration: true
export module a {
    export function foo(x: number) {
        return x;
    }
}

export module c {
    export import b = a.foo;
    export var bVal = b(10);
    export var bVal2 = b;
}
