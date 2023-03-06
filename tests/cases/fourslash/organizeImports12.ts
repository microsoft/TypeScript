/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: /test.js
////declare export default class A {}
////declare export { a, b };
////declare export * from "foo";

verify.organizeImports(
`declare export default class A {}
declare export * from "foo";
declare export { a, b };
`);
