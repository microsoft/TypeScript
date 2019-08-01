/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: /foo.d.ts
////declare module "foo" {
////  const _default: number;
////  export = _default;
////}

// @Filename: /index.js
////foo/**/

goTo.marker('');
verify.getAndApplyCodeFix(2304, 0);
verify.currentFileContentIs(
`import foo from "foo";

foo`);
