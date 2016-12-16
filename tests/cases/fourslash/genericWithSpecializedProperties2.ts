/// <reference path='fourslash.ts'/>

////interface Foo<T> {
////    y: Foo<number>;
////    x: Foo<string>;
////}
////var f: Foo<string>;
////var /*1*/x = f.x; 
////var /*2*/y = f.y; 

////var f2: Foo<number>;
////var /*3*/x2 = f2.x; 
////var /*4*/y2 = f2.y; 

verify.quickInfos({
    1: "var x: Foo<string>",
    2: "var y: Foo<number>",
    3: "var x2: Foo<string>",
    4: "var y2: Foo<number>"
});
