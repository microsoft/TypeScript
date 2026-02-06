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
////(<T extends Foo>() => {})<{/*0*/}>;
////
////(class <T extends Foo>{})<{/*1*/}>;
////
////declare const a: {
////    new <T extends Foo>(): {};
////    <T extends Bar>(): {};
////}
////a<{/*2*/}>;
////
////declare const b: {
////    new <T extends { one: true }>(): {};
////    <T extends { one: false }>(): {};
////}
////b<{/*3*/}>;

verify.completions(
    { marker: "0", unsorted: ["one", "two"], isNewIdentifierLocation: true },
    { marker: "1", unsorted: ["one", "two"], isNewIdentifierLocation: true },
    { marker: "2", unsorted: ["one", "two", "three", "four"], isNewIdentifierLocation: true },
    { marker: "3", unsorted: [], isNewIdentifierLocation: true },
);
