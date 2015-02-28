/// <reference path='fourslash.ts'/>

// @Filename: ambients.ts
////declare module "a" {}
////declare module "b" {}

// @Filename: moduleC.ts
////export var x = 0;

// @Filename: global.ts
////var global = 0;

// @Filename: current.ts
////import * from "/*1*/";
////import d from "/*2*/";
////import {a as A} from "/*3*/";
////import * as NS from "/*4*/";
////import "/*5*/";
////import x = require("/*6*/");
////export * from "/*7*/";
////export {a as A} from "/*8*/";

test.markers().forEach(m => {
    goTo.position(m.position, m.fileName);
    verify.memberListContains("a");
    verify.memberListContains("b");
    verify.memberListContains("./moduleC");
    verify.memberListCount(3);
});
