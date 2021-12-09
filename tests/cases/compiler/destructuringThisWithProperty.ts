class A {
    constructor(public foo: string) {}

    get bar(): number {
        return 1;
    }

    func() {
        const {           ...rest1 } = this;
        const {           ...rest2 } = this as A;
        const { foo: _f1, ...rest3 } = this;
        const { foo: _f2, ...rest4 } = this as A;

        rest1.bar;
        rest2.bar;
        rest3.bar;
        rest4.bar;

        rest1.func;
        rest2.func;
        rest3.func;
        rest4.func;
    }
}

function destructure<T extends A>(x: T) {
    const {           ...rest1 } = x;
    const {           ...rest2 } = x as A;
    const { foo: _f1, ...rest3 } = x;
    const { foo: _f2, ...rest4 } = x as A;

    rest1.bar;
    rest2.bar;
    rest3.bar;
    rest4.bar;

    rest1.func;
    rest2.func;
    rest3.func;
    rest4.func;
}
