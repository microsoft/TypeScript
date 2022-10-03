/// <reference path='fourslash.ts' />
////interface Restricted {
////    n: number;
////}
////function wrapper(wrapped: { (): void; }) { }
////class Foo {
////    n: number;
////    prop1: th/*0*/is;
////    public explicitThis(this: this) {
////        wrapper(
////            function explicitVoid(this: void) {
////                console.log(th/*1*/is);
////            }
////        )
////        console.log(th/*2*/is);
////    }
////    public explicitInterface(th/*3*/is: Restricted) {
////        console.log(th/*4*/is);
////    }
////    public explicitClass(th/*5*/is: Foo) {
////        console.log(th/*6*/is);
////    }
////}

verify.quickInfos({
    0: "this",
    1: "this: void",
    2: "this: this",
    3: "(parameter) this: Restricted",
    4: "this: Restricted",
    5: "(parameter) this: Foo",
    6: "this: Foo"
});
