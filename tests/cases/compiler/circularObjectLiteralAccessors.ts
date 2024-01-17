// @target: es5

// Repro from #6000

const a = {
    b: {
        get foo(): string {
            return a.foo;
        },
        set foo(value: string) {
            a.foo = value;
        }
    },
    foo: ''
};