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

        // Rest destructuring drops properties provided by getters.
        // "bar" should not be present in any of these.
        rest1.bar;
        rest2.bar;
        rest3.bar;
        rest4.bar;
    }
}
