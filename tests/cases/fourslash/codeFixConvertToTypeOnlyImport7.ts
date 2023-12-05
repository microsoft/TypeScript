/// <reference path="fourslash.ts" />

// @module: esnext
// @verbatimModuleSyntax: true

// @Filename: /b.ts
////export interface I {}
////export const foo = {};

// @Filename: /c.ts
//// export interface C {}

// @Filename: /d.ts
//// export interface D {}
//// export function d() {}

// @Filename: /a.ts
//// import { I, type foo } from "./b";
//// import { C } from "./c";
//// import { D, d } from "./d";
//// export declare const x: typeof foo;
//// d();

goTo.file("/a.ts");
verify.codeFixAll({
  fixId: "convertToTypeOnlyImport",
  fixAllDescription: ts.Diagnostics.Fix_all_with_type_only_imports.message,
  newFileContent:
`import type { I, foo } from "./b";
import type { C } from "./c";
import { type D, d } from "./d";
export declare const x: typeof foo;
d();`,
});
