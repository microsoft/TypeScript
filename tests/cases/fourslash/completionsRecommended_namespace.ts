/// <reference path="fourslash.ts" />

// @noLib: true

// @Filename: /a.ts
////export namespace Name {
////    export class C {}
////}
////export function f(c: Name.C) {}
////f(new N/*a0*/);
////f(new /*a1*/);

// @Filename: /b.ts
////import { f } from "./a";
// Here we will recommend a new import of 'Name'
////f(new N/*b0*/);
////f(new /*b1*/);

// @Filename: /c.ts
////import * as alpha from "./a";
// Here we will recommend 'a' because it contains 'Name' which contains 'C'.
////alpha.f(new a/*c0*/);
////alpha.f(new /*c1*/);

goTo.eachMarker(["a0", "a1"], () => {
    verify.completionListContains("Name", "namespace Name", "", "module", undefined, undefined, { isRecommended: true });
});

goTo.eachMarker(["b0", "b1"], () => {
    verify.completionListContains({ name: "Name", source: "/a" }, "namespace Name", "", "module", undefined, /*hasAction*/ true, {
        includeExternalModuleExports: true,
        isRecommended: true,
        sourceDisplay: "./a",
    });
});

goTo.eachMarker(["c0", "c1"], () => {
    verify.completionListContains("alpha", "import alpha", "", "alias", undefined, undefined, { isRecommended: true });
});
