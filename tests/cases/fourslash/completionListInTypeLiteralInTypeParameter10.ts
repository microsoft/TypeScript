/// <reference path="fourslash.ts" />

////interface Foo {
////    one: string;
////    two: number;
////}
////interface Bar {
////    three: boolean;
////    four: {
////        five: unknown;
////    };
////}
////
////function a<T extends Foo>() {}
////a<{/*0*/}>();
////
////var b = () => <T extends Foo>() => {};
////b()<{/*1*/}>();
////
////declare function c<T extends Foo>(): void
////declare function c<T extends Bar>(): void
////c<{/*2*/}>();
////
////function d<T extends Foo, U extends Bar>() {}
////d<{/*3*/}, {/*4*/}>();
////d<Foo, { four: {/*5*/} }>();
////
////(<T extends Foo>() => {})<{/*6*/}>();

verify.completions(
    { marker: "0", unsorted: ["one", "two"], isNewIdentifierLocation: true },
    { marker: "1", unsorted: ["one", "two"], isNewIdentifierLocation: true },
    { marker: "2", unsorted: ["one", "two", "three", "four"], isNewIdentifierLocation: true },
    { marker: "3", unsorted: ["one", "two"], isNewIdentifierLocation: true },
    { marker: "4", unsorted: ["three", "four"], isNewIdentifierLocation: true },
    { marker: "5", unsorted: ["five"], isNewIdentifierLocation: true },
    { marker: "6", unsorted: ["one", "two"], isNewIdentifierLocation: true },
);
