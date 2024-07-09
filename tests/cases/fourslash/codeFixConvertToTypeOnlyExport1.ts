/// <reference path="fourslash.ts" />

// @isolatedModules: true

// @Filename: /a.ts
////export type A = {};
////export type B = {};

// @Filename: /b.ts
/////* Comment */
////export { A, B } from './a';

goTo.file("/b.ts");
verify.codeFix({
  index: 0,
  description: ts.Diagnostics.Convert_to_type_only_export.message,
  errorCode: ts.Diagnostics.Re_exporting_a_type_when_0_is_enabled_requires_using_export_type.code,
  newFileContent:
`/* Comment */
export type { A, B } from './a';`
});
