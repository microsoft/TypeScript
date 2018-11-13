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

verify.completions(
    {
        marker: ["a0", "a1"],
        includes: { name: "Name", text: "namespace Name", kind: "module", kindModifiers: "export", isRecommended: true },
    },
    {
        marker: ["b0", "b1"],
        includes: {
            name: "Name",
            source: "/a",
            sourceDisplay: "./a",
            text: "namespace Name",
            kind: "module",
            kindModifiers: "export",
            hasAction: true,
            isRecommended: true,
        },
        preferences: { includeCompletionsForModuleExports: true },
    },
    { marker: ["c0", "c1"], includes: { name: "alpha", text: "import alpha", kind: "alias", isRecommended: true } },
);
