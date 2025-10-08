/// <reference path="fourslash.ts" />

// @module: commonjs

// https://github.com/microsoft/TypeScript/issues/62541

// @filename: imports.d.ts
//// import * as $0 from "./bar";
////
//// declare global {
////   const foo: typeof import("./foo")["foo"];
////   const bar: typeof import("./bar")["bar"];
//// }
////
//// export {};

// @filename: foo.ts
//// export const /*1*/foo = 1;

// @filename: bar.ts
//// export const /*2*/bar = 1;

verify.baselineFindAllReferences("1", "2");
