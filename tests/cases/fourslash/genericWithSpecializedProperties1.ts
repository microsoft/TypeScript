/// <reference path='fourslash.ts'/>

////interface Foo<T> {
////    x: Foo<string>;
////    y: Foo<number>;
////}

////var f: Foo<number>;
////var /*1*/xx = f.x;
////var /*2*/yy = f.y;

////var f2: Foo<string>;
////var /*3*/x2 = f2.x;
////var /*4*/y2 = f2.y;

verify.quickInfos({
    1: "var xx: Foo<string>",
    2: "var yy: Foo<number>",
    3: "var x2: Foo<string>",
    4: "var y2: Foo<number>"
});
