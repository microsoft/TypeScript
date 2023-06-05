/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////declare module /*2*/[|"external/*1*/"|] {
////    class Foo { }
////}

verify.baselineGoToDefinition("1");
