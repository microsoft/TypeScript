/// <reference path="fourslash.ts"/>

// Tests that we don't always add an indirect user, which causes problems if the module is already available globally.

// @esModuleInterop: true

// @Filename: /a.d.ts
////export as namespace abc;
/////*1*/export const /*2*/x: number;

// @Filename: /b.ts
////import a from "./a";
////a./*3*/x;

verify.baselineFindAllReferences('1', '2', '3');
