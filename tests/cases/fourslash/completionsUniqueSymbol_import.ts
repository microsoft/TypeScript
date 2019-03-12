/// <reference path="fourslash.ts" />

// @noLib: true

// @Filename: /globals.d.ts
////declare const Symbol: () => symbol;

// @Filename: /a.ts
////const privateSym = Symbol();
////export const publicSym = Symbol();
////export interface I {
////    [privateSym]: number;
////    [publicSym]: number;
////    [defaultPublicSym]: number;
////    n: number;
////}
////export const i: I;

// @Filename: /user.ts
////import { i } from "./a";
////i[|./**/|];

verify.completions({
    marker: "",
    exact: [
        "n",
        { name: "publicSym", source: "/a", insertText: "[publicSym]", replacementSpan: test.ranges()[0], hasAction: true },
    ],
    preferences: {
        includeInsertTextCompletions: true,
        includeCompletionsForModuleExports: true,
    },
});

verify.applyCodeActionFromCompletion("", {
    name: "publicSym",
    source: "/a",
    description: `Add 'publicSym' to existing import declaration from "./a"`,
    newFileContent:
`import { i, publicSym } from "./a";
i.;`
});
