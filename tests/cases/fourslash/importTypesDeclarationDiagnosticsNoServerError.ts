/// <reference path="fourslash.ts" />

// @declaration: true
// @Filename: node_modules/foo/index.d.ts
////export function f(): I;
////export interface I {
////  x: number;
////}
// @Filename: a.ts
////import { f } from "foo";
////export const x = f();

goTo.file(1);
verify.getSemanticDiagnostics([]);
