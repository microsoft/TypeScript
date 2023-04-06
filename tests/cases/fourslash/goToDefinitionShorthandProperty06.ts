/// <reference path="./fourslash.ts"/>

////interface Foo {
////    /*2*/foo(): void
////}
////const foo = 1;
////let x: Foo = {
////    [|f/*1*/oo|]()
////}

verify.baselineGoToDefinition("1");
