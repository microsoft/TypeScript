/// <reference path='fourslash.ts' />

// @Filename: module1.ts
////module /*definition*/M {
////    export var p;
////}
////var m: typeof M;

// @Filename: module3.ts
/////*reference1*/M;
/////*reference2*/m;

verify.goToType({
    reference1: "definition",
    reference2: "definition"
});
