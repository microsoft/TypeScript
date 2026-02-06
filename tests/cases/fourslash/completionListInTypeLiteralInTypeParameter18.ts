/// <reference path="fourslash.ts" />

////class Foo<T extends { x: 'one' | 'two' }> {}
////function foo<T extends { x: 'one' | 'two' }>() {}
////declare function tag<T extends { x: 'one' | 'two' }>(x: TemplateStringsArray): void;
////declare function decorator<T extends { x: 'one' | 'two' }>(...args: unknown[]): never
////
////type A = Foo<{ x: '/*0*/' }>;
////new Foo<{ x: '/*1*/' }>();
////foo<{ x: '/*2*/' }>();
////foo<{ x: '/*3*/' }>;
////Foo<{ x: '/*4*/' }>;
////tag<{ x: '/*5*/' }>``;
////class { @decorator<{ x: '/*6*/' }>; method() {} }

verify.completions(
    { marker: "0", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "1", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "2", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "3", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "4", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "5", unsorted: ["one", "two"], isNewIdentifierLocation: false },
    { marker: "6", unsorted: ["one", "two"], isNewIdentifierLocation: false },
);
