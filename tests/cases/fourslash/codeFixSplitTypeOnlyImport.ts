/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export type B = {};
////export type C = {};
////export default interface A {}

// @Filename: /b.ts
////export type E = {};
////export type F = {};
////export default class D {}

// @Filename: /c.ts
////import type A, { B, C } from './a';
////import type D, * as types from './b';

goTo.file("/c.ts");

verify.codeFix({
  errorCode: ts.Diagnostics.A_type_only_import_can_specify_a_default_import_or_named_bindings_but_not_both.code,
  description: ts.Diagnostics.Split_into_two_separate_import_declarations.message,
  applyChanges: false,
  index: 0,
  newFileContent:
`import type A from './a';
import type { B, C } from './a';
import type D, * as types from './b';`
});

verify.codeFixAll({
  fixId: "splitTypeOnlyImport",
  fixAllDescription: ts.Diagnostics.Split_all_invalid_type_only_imports.message,
  newFileContent:
`import type A from './a';
import type { B, C } from './a';
import type D from './b';
import type * as types from './b';
`
});
