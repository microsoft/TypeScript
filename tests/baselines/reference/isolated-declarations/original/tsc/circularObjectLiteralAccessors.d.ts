//// [tests/cases/compiler/circularObjectLiteralAccessors.ts] ////

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

/// [Declarations] ////



//// [circularObjectLiteralAccessors.d.ts]
declare const a: {
    b: {
        foo: string;
    };
    foo: string;
};
