/// <reference path='fourslash.ts'/>

// @Filename: ambients.ts
////declare module "a" {}
////declare module "b" {}

// @Filename: moduleC.ts
////export var x = 0;

// @Filename: global.ts
////var global = 0;

// @Filename: current.ts
////declare module "d" {
////    import * from "/*1*/";
////}

goTo.marker("1");
verify.memberListContains("a");
verify.memberListContains("b");
verify.memberListCount(2);

