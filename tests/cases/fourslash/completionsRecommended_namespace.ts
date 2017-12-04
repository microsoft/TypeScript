/// <reference path="fourslash.ts" />

// @noLib: true

// @Filename: /a.ts
////export namespace N {
////    export class C {}
////}
////export function f(c: N.C) {}
////f(new /*a*/);

// @Filename: /b.ts
////import { f } from "./a";
// Here we will recommend a new import of 'N'
////f(new /*b*/);

// @Filename: /c.ts
////import * as a from "./a";
// Here we will recommend 'a' because it contains 'N' which contains 'C'.
////a.f(new /*c*/);

goTo.marker("a");
verify.completionListContains("N", "namespace N", "", "module", undefined, undefined, { isRecommended: true });

goTo.marker("b");
verify.completionListContains({ name: "N", source: "/a" }, "namespace N", "", "module", undefined, /*hasAction*/ true, {
    includeExternalModuleExports: true,
    isRecommended: true,
    sourceDisplay: "./a",
});

goTo.marker("c");
verify.completionListContains("a", "import a", "", "alias", undefined, undefined, { isRecommended: true });
