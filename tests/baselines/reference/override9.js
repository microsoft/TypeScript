//// [tests/cases/conformance/override/override9.ts] ////

//// [override9.ts]
interface B {
    foo (): void
    bar (): void
}

interface D extends B {
    foo (): void;
    override bar(): void;
    baz(): void;
    override bazz(): void;
}


//// [override9.js]


//// [override9.d.ts]
interface B {
    foo(): void;
    bar(): void;
}
interface D extends B {
    foo(): void;
    bar(): void;
    baz(): void;
    bazz(): void;
}
