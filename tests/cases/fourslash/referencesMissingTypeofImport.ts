/// <reference path='fourslash.ts'/>

// Test case to isolate if the issue is with typeof import() or namespace access

// @Filename: api.d.ts
////declare module '@bug/api/miscFunctions' {
////  export function /*1*/myFunction(testParam: string): Promise<void>;
////}
////
////declare module '@bug/api/index' {
////  export * from "@bug/api/miscFunctions";
////}

// @Filename: test.ts
////type ApiType = typeof import('@bug/api/index');
////declare const api: ApiType;
////api./*2*/myFunction('test');

verify.baselineFindAllReferences('1', '2')