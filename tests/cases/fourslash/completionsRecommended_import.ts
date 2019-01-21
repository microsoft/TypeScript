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

const preferences: FourSlashInterface.UserPreferences = { includeCompletionsForModuleExports: true };
const classEntry = (isConstructor: boolean): FourSlashInterface.ExpectedCompletionEntry => ({
    name: "Cls",
    source: "/a",
    sourceDisplay: "./a",
    kind: "class",
    kindModifiers: "export",
    text: isConstructor ? "constructor Cls(): Cls" : "class Cls",
    hasAction: true,
    isRecommended: true,
});
verify.completions(
    { marker: "b0", includes: classEntry(true), preferences },
    { marker: "b1", includes: classEntry(false), preferences },
    {
        marker: ["c0", "c1"],
        includes: {
            name: "alpha",
            text: "import alpha",
            kind: "alias",
            isRecommended: true,
        },
        preferences,
    },
);
