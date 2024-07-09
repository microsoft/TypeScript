//// [tests/cases/conformance/additionalChecks/noPropertyAccessFromIndexSignature1.ts] ////

//// [noPropertyAccessFromIndexSignature1.ts]
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


//// [noPropertyAccessFromIndexSignature1.js]
// access property
a.foo;
a["foo"];
// access index signature
b.foo;
b["foo"];
// access property
c.foo;
c["foo"];
// access index signature
c.bar;
c["bar"];
// optional access property
d === null || d === void 0 ? void 0 : d.foo;
d === null || d === void 0 ? void 0 : d["foo"];
// optional access index signature
d === null || d === void 0 ? void 0 : d.bar;
d === null || d === void 0 ? void 0 : d["bar"];
