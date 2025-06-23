/// <reference path='fourslash.ts'/>

//// {
////     interface Foo/*1*/ {
////         a: "a" | "c";
////     }
//// }
//// {
////     interface Bar {
////         b: "b" | "d";
////     }
////     interface Foo/*2*/ extends Bar {
////         a: "a" | "c";
////     }
//// }
//// {
////     type BarParam = "b" | "d";
////     interface Bar {
////         bar(b: BarParam): string;
////     }
////     type FooType = "a" | "c";
////     interface FooParam {
////         param: FooType;
////     }
////     interface Foo/*3*/ extends Bar {
////         a: FooType;
////         foo: (a: FooParam) => number;
////     }
//// }
//// {
////     interface Bar/*4*/<B> {
////         bar(b: B): string;
////     }
////     interface FooParam {
////         param: "a" | "c";
////     }
////     interface Foo/*5*/ extends Bar<FooParam> {
////         a: "a" | "c";
////         foo: (a: FooParam) => number;
////     }
//// }
//// {
////     interface Foo {
////         a: "a";
////     }
////     interface Foo/*6*/ {
////         b: "b";
////     }
//// }
//// interface Foo/*7*/ {
////     a: "a";
//// }
//// namespace Foo/*8*/ {
////     export const bar: string;
//// }

verify.baselineQuickInfo({
    "1": [0, 1],
    "2": [0, 1],
    "3": [0, 1, 2],
    "4": [0, 1],
    "5": [0, 1, 2],
    "6": [0, 1],
    "7": [0, 1],
    "8": [0, 1],
});