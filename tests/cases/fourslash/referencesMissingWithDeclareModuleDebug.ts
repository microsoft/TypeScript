/// <reference path='fourslash.ts'/>

// @Filename: bugReportApi.d.ts
////declare module '@bug/api/miscFunctions' {
////  export function /*1*/myFunction(testParam: string): Promise<void>;
////}
////
////declare module '@bug/api/index' {
////  export * from "@bug/api/miscFunctions";
////}
////
////declare namespace bug.v0 {const api: typeof import('@bug/api/index')}

// @Filename: test.ts
////bug.v0.api./*2*/myFunction('test')

// First, let's see what we get when searching from the definition  
verify.baselineFindAllReferences('1')
verify.baselineFindAllReferences('2')