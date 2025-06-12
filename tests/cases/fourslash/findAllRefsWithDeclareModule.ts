/// <reference path="fourslash.ts" />

////declare module '@bug/api/index' {
////  export * from "@bug/api/miscFunctions";
////}
////declare module '@bug/api/miscFunctions' {
////  export function /*1*/myFunction(testParam: string): Promise<any>;
////}
////
////declare namespace bug.v0 {const api: typeof import('@bug/api/index')}
////
//////// test.ts
////bug.v0.api./*2*/myFunction('test')

verify.baselineFindAllReferences('1', '2');