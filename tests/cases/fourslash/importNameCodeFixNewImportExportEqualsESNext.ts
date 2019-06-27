/// <reference path="fourslash.ts" />

// @Module: esnext

// @Filename: /foo.d.ts
////declare module "foo" {
////  const _default: number;
////  export = _default;
////}

// @Filename: /index.ts
////foo/**/

goTo.marker('');
verify.getAndApplyCodeFix(2304, 0);
verify.currentFileContentIs(
`import * as foo from "foo";

foo`);
