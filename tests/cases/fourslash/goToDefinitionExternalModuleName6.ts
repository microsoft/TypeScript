/// <reference path='fourslash.ts'/>

// @Filename: b.ts
////import * from [|'e/*1*/'|];

// @Filename: a.ts
////declare module /*2*/"e" {
////    class Foo { }
////}

verify.baselineGoToDefinition("1");
