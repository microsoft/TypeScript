/// <reference path='fourslash.ts'/>

// Test case for issue #61766: Reference missing with declare module re-exports through typeof import()

// @Filename: bugReportApi.d.ts
////declare module '@bug/api/miscFunctions' {
////  export function /*1*/myFunction(testParam: string): Promise<void>;
////}
////
////declare module '@bug/api/index' {
////  export * from "@bug/api/miscFunctions";
////}
////
////declare namespace bug.v0 {
////  const api: typeof import('@bug/api/index');
////}

// @Filename: test.ts
////bug.v0.api./*2*/myFunction('test');

// This test demonstrates the issue: find-all-references should find both the definition and the usage,
// but currently only finds the definition due to broken symbol resolution through typeof import() chains

// Expected behavior:
// - When searching from definition (marker 1): should find both definition and usage
// - When searching from usage (marker 2): should find both definition and usage
//
// Current behavior: 
// - When searching from definition (marker 1): only finds definition
// - When searching from usage (marker 2): only finds definition (missing the usage itself)

verify.baselineFindAllReferences('1', '2');