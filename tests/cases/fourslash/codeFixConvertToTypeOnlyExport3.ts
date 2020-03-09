/// <reference path="fourslash.ts" />

// @isolatedModules: true

// @Filename: /a.ts
////export type T1 = {};
////export const V1 = {};
////export type T2 = {};

// @Filename: /b.ts
////export type T3 = {};
////export const V2 = {};
////export type T4 = {};

// @Filename: /c.ts
////export { T1, V1, T2 } from './a';
////export { T3, V2, T4 } from './b';

goTo.file("/c.ts");
verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Convert_all_re_exported_types_to_type_only_exports.message,
  fixId: "convertToTypeOnlyExport",
  newFileContent:
`export { V1 } from './a';
export type { T1, T2 } from './a';
export { V2 } from './b';
export type { T3, T4 } from './b';
`
});
