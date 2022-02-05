// @target: es2015
// @strict: true

class C {
    get x?() { return '' }
    set x?(value: string) {}
}

const foo: C = { };
