/// <reference path="fourslash.ts" />

////class Foo<T extends 'one' | 'two'> {}
////function foo<T extends 'one' | 'two'>() {}
////declare function tag<T extends 'one' | 'two'>(x: TemplateStringsArray): void;
////declare function decorator<T extends 'one' | 'two'>(...args: unknown[]): never
////
////type A = Foo<'/*0*/'>;
////new Foo<'/*1*/'>();
////foo<'/*2*/'>();
////foo<'/*3*/'>;
////Foo<'/*4*/'>;
////tag<'/*5*/'>``;
////class { @decorator<'/*6*/'>; method() {} }

verify.completions(
    { marker: "0", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "1", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "2", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "3", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "4", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "5", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "6", unsorted: ["one", "two"], isNewIdentifierLocation: false },
);
