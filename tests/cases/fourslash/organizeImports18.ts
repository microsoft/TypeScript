/// <reference path="fourslash.ts" />

// @filename: /A.ts
////export interface A {}
////export function bFuncA(a: A) {}

// @filename: /B.ts
////export interface B {}
////export function bFuncB(b: B) {}

// @filename: /C.ts
////export interface C {}
////export function bFuncC(c: C) {}

// @filename: /test.ts
////export { C } from "./C";
////export { B } from "./B";
////export { A } from "./A";
////
////export { bFuncC } from "./C";
////export { bFuncB } from "./B";
////export { bFuncA } from "./A";

goTo.file("/test.ts");
verify.organizeImports(
`export { A } from "./A";
export { B } from "./B";
export { C } from "./C";

export { bFuncA } from "./A";
export { bFuncB } from "./B";
export { bFuncC } from "./C";
`);
