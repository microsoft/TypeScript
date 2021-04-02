// @declaration: true
// @noImplicitOverride: true
class B {
    public baz: number = 1;
    constructor(public foo: string, public bar: number) {

    }
}

class D extends B {
    public bar: number = 1
    constructor(public foo: string, public baz: number) {
        super(foo, 42)
    }
}
