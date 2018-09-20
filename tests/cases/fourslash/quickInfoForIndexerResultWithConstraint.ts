/// <reference path='fourslash.ts'/>

////function foo<T>(x: T) {
////        return x;
////}

////function other2<T extends Date>(arg: T) {
////    var b: { [x: string]: T };
////    var /*1*/r2 = foo(b); // just shows T
////}

verify.quickInfoAt("1", "(local var) r2: {\n    [x: string]: T;\n}");
