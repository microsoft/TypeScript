/// <reference path="fourslash.ts" />

////declare module '@bug/api/index' {
////  export * from "@bug/api/miscFunctions";
////}
////declare module '@bug/api/miscFunctions' {
////  export function /*1*/myFunction(testParam: string): Promise<any>;
////}
////
////declare namespace bug.v0 {const api: typeof import('@bug/api/index')}

////declare module '@bug/api/index' {
////  export * from "@bug/api/miscFunctions";
////}
////declare module '@bug/api/miscFunctions' {
////  export function /*2*/myFunction(testParam: string): Promise<any>;
////}
////
////declare namespace bug.v0 {const api: typeof import('@bug/api/index')}

////bug.v0.api./*3*/myFunction('test')

verify.baselineFindAllReferences('1', '2', '3');