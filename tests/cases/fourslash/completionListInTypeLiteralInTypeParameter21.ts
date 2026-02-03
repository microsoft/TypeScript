/// <reference path="fourslash.ts" />

////class Foo<T extends ('one' | 2)[]> {}
////function foo<T extends ('one' | 2)[]>() {}
////
////type A = Foo<[/*0*/]>;
////new Foo<[/*1*/]>();
////foo<[/*2*/]>();
////foo<[/*3*/]>;
////Foo<[/*4*/]>;

verify.completions(
    { marker: "0", includes: ['"one"', '2'], isNewIdentifierLocation: true },
    { marker: "1", includes: ['"one"', '2'], isNewIdentifierLocation: true },
    { marker: "2", includes: ['"one"', '2'], isNewIdentifierLocation: true },
    { marker: "3", includes: ['"one"', '2'], isNewIdentifierLocation: true },
    { marker: "4", includes: ['"one"', '2'], isNewIdentifierLocation: true }
);
