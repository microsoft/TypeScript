/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /b.d.ts
////declare namespace N {
////    export const foo: number;
////}
////declare module "n" {
////    export = N;
////}

// @Filename: /c.d.ts
////declare namespace N {}

// @Filename: /a.ts
////fo/**/

goTo.marker("");
verify.completionListContains({ name: "foo", source: "n" }, "const N.foo: number", "", "const", undefined, /*hasAction*/ true, {
    includeExternalModuleExports: true,
    sourceDisplay: "n",
});
