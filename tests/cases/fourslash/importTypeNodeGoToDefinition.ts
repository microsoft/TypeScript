/// <reference path="fourslash.ts" />

// @Filename: /ns.ts
/////*refFile*/export namespace /*refFoo*/Foo {
////    export namespace /*refBar*/Bar {
////        export class /*refBaz*/Baz {}
////    }
////}

// @Filename: /usage.ts
////type A = typeof import([|/*1*/"./ns"|]).[|/*2*/Foo|].[|/*3*/Bar|];
////type B = import([|/*4*/"./ns"|]).[|/*5*/Foo|].[|/*6*/Bar|].[|/*7*/Baz|];

verify.baselineGoToDefinition(
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
);
