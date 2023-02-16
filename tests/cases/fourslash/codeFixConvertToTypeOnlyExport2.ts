/// <reference path="fourslash.ts" />

// @isolatedModules: true

// @Filename: /a.ts
////export type A = {};
////export const B = {};
////export type C = {};

// @Filename: /b.ts
////export { A, B, C } from './a';

goTo.file("/b.ts");
verify.codeFix({
  index: 0,
  description: ts.Diagnostics.Convert_to_type_only_export.message,
  errorCode: ts.Diagnostics.Re_exporting_a_type_when_0_is_enabled_requires_using_export_type.code,
  newFileContent:
`export { B } from './a';
export type { A, C } from './a';
`
});
