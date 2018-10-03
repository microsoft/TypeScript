/// <reference path="fourslash.ts"/>

// Tests that we don't always add an indirect user, which causes problems if the module is already available globally.

// @esModuleInterop: true

// @Filename: /a.d.ts
////export as namespace abc;
////export const [|x|]: number;

// @Filename: /b.ts
////import a from "./a";
////a.[|x|];

verify.rangesReferenceEachOther();
