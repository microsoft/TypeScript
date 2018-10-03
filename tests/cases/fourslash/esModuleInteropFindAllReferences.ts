/// <reference path="fourslash.ts"/>

// @esModuleInterop: true

// @Filename: /abc.d.ts
////declare module "a" {
////    export const [|x|]: number;
////}

// @Filename: /b.ts
////import a from "a";
////a.[|x|];

verify.rangesReferenceEachOther();