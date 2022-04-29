/// <reference path='fourslash.ts'/>

////interface Foo<T, U> {
////    x: Foo<T, U>;
////    y: Foo<U, U>;
////}

////var f: Foo<number, string>;
////var /*1*/xx = f.x;
////var /*2*/yy = f.y;

////var f2: Foo<string, number>;
////var /*3*/x2 = f2.x;
////var /*4*/y2 = f2.y;

verify.quickInfos({
    1: "var xx: Foo<number, string>",
    2: "var yy: Foo<string, string>",
    3: "var x2: Foo<string, number>",
    4: "var y2: Foo<number, number>"
});
