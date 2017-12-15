/// <reference path="fourslash.ts" />

// @noLib: true

// @Filename: /a.ts
////export class C {}
////export function f(c: C) {}

// @Filename: /b.ts
////import { f } from "./a";
// Here we will recommend a new import of 'C'
////f(new /*b*/);

// @Filename: /c.ts
////import * as a from "./a";
// Here we will recommend 'a' because it contains 'C'.
////a.f(new /*c*/);

goTo.marker("b");
verify.completionListContains({ name: "C", source: "/a" }, "class C", "", "class", undefined, /*hasAction*/ true, {
    includeExternalModuleExports: true,
    isRecommended: true,
    sourceDisplay: "./a",
});

goTo.marker("c");
verify.completionListContains("a", "import a", "", "alias", undefined, undefined, { isRecommended: true });
