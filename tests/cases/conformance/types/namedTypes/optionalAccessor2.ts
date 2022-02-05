// @target: es2015

class C {
    get x?() { return '' }
    set x?(value: string) {}
}

const foo: C = { };
