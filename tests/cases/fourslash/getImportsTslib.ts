///<reference path="fourslash.ts"/>

// @importHelpers: true
// @target: es2015
// @lib: es2015
// @module: commonjs
// @Filename: /node_modules/tslib/index.d.ts
//// export function __awaiter(...args: any): any;
// @Filename: /first.ts
//// export function foo() {
////     return 2
//// }
// @Filename: /index.ts
//// export async function importer() {
////     const mod = await import("./first");
//// }

verify.noErrors()
verify.getImports('/index.ts', ['/first.ts'])
