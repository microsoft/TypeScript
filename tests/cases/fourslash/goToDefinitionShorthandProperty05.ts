/// <reference path="./fourslash.ts"/>

////interface Foo {
////    /*3*/foo(): void
////}
////const /*2*/foo = 1;
////let x: Foo = {
////    [|f/*1*/oo|]
////}

verify.goToDefinition("1", ["2", "3"]);
