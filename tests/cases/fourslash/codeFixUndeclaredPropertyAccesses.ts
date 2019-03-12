/// <reference path='fourslash.ts' />

//// interface I { x: number; }
//// let i: I;
//// i.y;
//// i.foo();
//// enum E { a,b }
//// let e: typeof E;
//// e.a;
//// e.c;
//// let obj = { a: 1, b: "asdf"};
//// obj.c;
//// type T<U> = I | U;
//// let t: T<number>;
//// t.x;

verify.codeFixAvailable([
    "Declare property 'y'",
    "Add index signature for property 'y'",
    "Declare method 'foo'",
    "Declare property 'foo'",
    "Add index signature for property 'foo'",
    "Add missing enum member 'c'",
].map(description => ({ description })));
