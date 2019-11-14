/// <reference path="fourslash.ts" />

// @isolatedModules: true

// @Filename: /a.ts
////export type A = {};

// @Filename: /b.ts
////export { /**/A } from './a';

goTo.file('/b.ts');
verify.codeFix({
  errorCode: ts.Diagnostics.Re_exporting_a_type_when_the_isolatedModules_flag_is_provided_requires_using_an_explicit_type_only_export.code,
  description: ts.Diagnostics.Convert_to_type_only_export.message,
  newFileContent: `export type { A } from './a';`
});
