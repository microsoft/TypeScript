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
////export type T5 = {};

// @Filename: /c.ts
////export type T6 = {};
////export type T7 = {};

// @Filename: /d.ts
/////* Test comment */
////export { T1, V1, T2 } from './a';
////export { T3, V2, T4, T5 } from './b';
////// TODO: fix messy formatting
////export {
////  T6 // need to export this
////   , T7, /* and this */ } from    "./c";


goTo.file("/d.ts");
verify.codeFixAll({
  fixAllDescription: ts.Diagnostics.Convert_all_re_exported_types_to_type_only_exports.message,
  fixId: "convertToTypeOnlyExport",
  newFileContent:
`/* Test comment */
export { V1 } from './a';
export type { T1, T2 } from './a';
export { V2 } from './b';
export type { T3, T4, T5 } from './b';
// TODO: fix messy formatting
export type {
  T6 // need to export this
   , T7, /* and this */ } from    "./c";`
});
