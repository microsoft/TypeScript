/// <reference path='fourslash.ts'/>

// Test case for issue #61766: Reference missing with typeof import() property access

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

// This test isolates the issue to typeof import() without namespace access
// Currently the usage (marker 2) is not found as a reference to the definition (marker 1)

verify.baselineFindAllReferences('1', '2')