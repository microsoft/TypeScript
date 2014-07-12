// @declaration: true
module a {
    export function foo(x: number) {
        return x;
    }
}

module c {
    import b = a.foo;
    export var bVal = b(10);
    export var bVal2 = b;
}
