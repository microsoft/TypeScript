/// <reference path="fourslash.ts" />

////class Foo<T extends { x: 'one' | 2 }> {}
////function foo<T extends { x: 'one' | 2 }>() {}
////
////type A = Foo<{ x: /*0*/ }>;
////new Foo<{ x: /*1*/ }>();
////foo<{ x: /*2*/ }>();
////foo<{ x: /*3*/ }>;
////Foo<{ x: /*4*/ }>;

verify.completions(
    { marker: "0", includes: ['"one"', '2'], isNewIdentifierLocation: false },
    { marker: "1", includes: ['"one"', '2'], isNewIdentifierLocation: false },
    { marker: "2", includes: ['"one"', '2'], isNewIdentifierLocation: false },
    { marker: "3", includes: ['"one"', '2'], isNewIdentifierLocation: false },
    { marker: "4", includes: ['"one"', '2'], isNewIdentifierLocation: false },
);
