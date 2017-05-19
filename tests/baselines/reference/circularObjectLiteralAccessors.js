//// [circularObjectLiteralAccessors.ts]
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

//// [circularObjectLiteralAccessors.js]
// Repro from #6000
var a = {
    b: {
        get foo() {
            return a.foo;
        },
        set foo(value) {
            a.foo = value;
        }
    },
    foo: ''
};
