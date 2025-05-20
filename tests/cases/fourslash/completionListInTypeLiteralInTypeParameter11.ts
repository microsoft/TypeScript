/// <reference path="fourslash.ts" />

////interface Foo {
////    one: string;
////    two: number;
////}
////interface Bar {
////    three: boolean;
////    four: symbol;
////}
////
////class A<T extends Foo> {}
////new A<{/*0*/}>();
////
////class B<T extends Foo, U extends Bar> {}
////new B<{/*1*/}, {/*2*/}>();
////
////declare const C: {
////   new <T extends Foo>(): unknown
////   new <T extends Bar>(): unknown
////}
////new C<{/*3*/}>()
////
////new (class <T extends Foo> {})<{/*4*/}>();

verify.completions(
    { marker: "0", unsorted: ["one", "two"], isNewIdentifierLocation: true },
    { marker: "1", unsorted: ["one", "two"], isNewIdentifierLocation: true },
    { marker: "2", unsorted: ["three", "four"], isNewIdentifierLocation: true },
    { marker: "3", unsorted: ["one", "two", "three", "four"], isNewIdentifierLocation: true },
    { marker: "4", unsorted: ["one", "two"], isNewIdentifierLocation: true },
);
