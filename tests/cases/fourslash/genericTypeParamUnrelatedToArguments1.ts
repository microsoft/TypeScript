/// <reference path='fourslash.ts'/>

////interface Foo<T> {
////    new (x: number): Foo<T>;
////}
////declare var f/*1*/1: Foo<number>;
////var f/*2*/2: Foo<number>;
////var f/*3*/3 = new Foo(3);
////var f/*4*/4: Foo<number> = new Foo(3);
////var f/*5*/5 = new Foo<number>(3);
////var f/*6*/6: Foo<number> = new Foo<number>(3);

verify.quickInfos({
    1: "var f1: Foo<number>",
    2: "var f2: Foo<number>",
    3: "var f3: any",
    4: "var f4: Foo<number>",
    5: "var f5: any",
    6: "var f6: Foo<number>"
});
