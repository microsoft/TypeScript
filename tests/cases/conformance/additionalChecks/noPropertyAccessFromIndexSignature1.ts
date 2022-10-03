// @noPropertyAccessFromIndexSignature: true

interface A {
    foo: string
}

interface B {
    [k: string]: string
}

interface C {
    foo: string
    [k: string]: string
}

declare const a: A;
declare const b: B;
declare const c: C;
declare const d: C | undefined;

// access property
a.foo;
a["foo"]

// access index signature
b.foo;
b["foo"];

// access property
c.foo;
c["foo"]

// access index signature
c.bar;
c["bar"];

// optional access property
d?.foo;
d?.["foo"]

// optional access index signature
d?.bar;
d?.["bar"];
