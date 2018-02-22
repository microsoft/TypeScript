// @esModuleInterop: true

// @Filename: /abc.d.ts
////declare module "a" {
////    export const [|x|]: number;
////}

// @Filename: /b.ts
////import * as a from "a";
////a.[|x|];

verify.rangesReferenceEachOther();