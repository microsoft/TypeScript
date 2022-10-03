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

verify.goToDefinition([
    ["1", "refFile"],
    ["2", "refFoo"],
    ["3", "refBar"],
    ["4", "refFile"],
    ["5", "refFoo"],
    ["6", "refBar"],
    ["7", "refBaz"],
]);
