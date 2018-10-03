/// <reference path="fourslash.ts" />

// @noLib: true

// @Filename: /a.ts
////export class Cls {}
////export function f(c: Cls) {}

// @Filename: /b.ts
////import { f } from "./a";
// Here we will recommend a new import of 'Cls'
////f(new C/*b0*/);
////f(new /*b1*/);

// @Filename: /c.ts
////import * as alpha from "./a";
// Here we will recommend 'alpha' because it contains 'Cls'.
////alpha.f(new al/*c0*/);
////alpha.f(new /*c1*/);

goTo.eachMarker(["b0", "b1"], (_, idx) => {
    verify.completionListContains(
        { name: "Cls", source: "/a" },
        idx === 0 ? "constructor Cls(): Cls" : "class Cls",
        "",
        "class",
        undefined,
        /*hasAction*/ true, {
        includeExternalModuleExports: true,
        isRecommended: true,
        sourceDisplay: "./a",
    });
});

goTo.eachMarker(["c0", "c1"], (_, idx) => {
    verify.completionListContains("alpha", "import alpha", "", "alias", undefined, undefined, { isRecommended: true })
});

