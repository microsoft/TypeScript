// @module: system
export namespace A.B.C {
    export function foo() {}
}

export function bar() {
    return A.B.C.foo();
}